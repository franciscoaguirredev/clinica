import { All, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { handleError } from 'src/common/utils/response.util';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<any> {
    try {
      const { userId, doctorId, date, reason } = createAppointmentDto;

      const responseExist = await this.existUser(userId, doctorId);

      if (!responseExist) {
        throw new NotFoundException(`user or doctor does not exist`);
      }

      const dateAppointment = new Date(date);
      const currentlyDate = new Date();
      if (dateAppointment < currentlyDate) {
        throw new NotFoundException(
          `Date of medical appointment less than current date`,
        );
      }

      const availability = await this.validateAvailabilityDateAppointment(
        date,
        doctorId,
      );

      if (availability) {
        throw new NotFoundException(`Appointment not available, busy doctor`);
      }

      const user = await this.userRepository.findOne({ where: { id: userId } });

      const doctor = await this.userRepository.findOne({
        where: { id: doctorId },
      });

      if (!user || !doctor) {
        throw new NotFoundException('User or Doctor not found');
      }

      const appointment = this.appointmentRepository.create({
        reason,
        date: dateAppointment,
        user,
        doctor,
      });

      return await this.appointmentRepository.save(appointment);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleError(error, 'Failed to create appointment');
    }
  }

  async findOneById(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['user', 'doctor'],
    });
    if (!appointment) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }
    return appointment;
  }

  async findAll() {
    const findAllAppointments = await this.appointmentRepository.find({
      relations: {
        user: true,
        doctor: true,
      },
    });
    return findAllAppointments;
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.findOneById(id);
    Object.assign(appointment, updateAppointmentDto);
    return await this.appointmentRepository.save(appointment);
  }

  async remove(id: number): Promise<void> {
    const appointment = await this.findOneById(id);
    await this.appointmentRepository.remove(appointment);
  }

  private async validateAvailabilityDateAppointment(
    dateAppointment: string,
    doctorId,
  ) {
    const AllAppointments = await this.findAll();

    return AllAppointments.some(
      (appointment):boolean =>
        appointment.doctor.id == doctorId &&
        appointment.date.toISOString() == dateAppointment,
    );
  }

  async existUser(userId: number, doctorId: number): Promise<boolean> {
    let id = userId;
    const user = await this.userRepository.findOne({ where: { id } });
    id = doctorId;
    const doctor = await this.userRepository.findOne({ relations: ['role'], where: {id}});
    console.log(doctor);
    
    if (!user || !doctor || doctor.id !== 2) {
      return false;
    }
    return true;
  }
} //Fin class Service

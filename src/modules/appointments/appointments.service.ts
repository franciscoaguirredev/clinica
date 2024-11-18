import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { handleError } from 'src/common/utils/response.util';
import { User } from '../users/entities/user.entity';
import { dateToGMT } from 'src/common/utils/dateToGMT.util';
import { error } from 'console';
import { IAppointmentResponse } from 'src/common/interfaces/appointment.response';


@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<IAppointmentResponse> {
    
    try {
      const { userId, doctorId, date, reason } = createAppointmentDto;

      const responseExist = await this.existUser(userId, doctorId);

      if (!responseExist) {
        throw new NotFoundException(`user or doctor does not found`);
      }

      const dateAppointment = new Date(date);
      const currentlyDate = new Date();
      if (dateAppointment < currentlyDate) {
        throw new NotFoundException(
          `Date of medical appointment less than current date`,
        );
      }

      const availability = await this.validateAvailabilityDateAppointment(
        dateAppointment,
        doctorId,
        userId
      );

      if (availability.length > 0 ) {
        throw new NotFoundException(availability);
      }

      const user = await this.userRepository.findOne({ where: { id: userId } });

      const doctor = await this.userRepository.findOne({
        where: { id: doctorId },
      });

      const appointment = this.appointmentRepository.create({
        reason,
        date: dateAppointment,
        user,
        doctor,
      });
      await this.appointmentRepository.save(appointment);
      return {id: appointment.id,reason, date: dateToGMT(dateAppointment), userId:user, doctorId: doctor}
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleError(error, 'Failed to create appointment');
    }
  }

  private async existUser(userId: number, doctorId: number): Promise<boolean> {
    
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const doctor = await this.userRepository.findOne({
      relations: { role: true },
      where: { id: doctorId },
    });

    if (!user || !doctor || doctor.role.id !== 2) {
      return false;
    }
    return true;
  }

  private async validateAvailabilityDateAppointment(
    dateAppointment: Date,
    doctorId: number,
    userId:number
  ): Promise<string> {
    const AllAppointments = await this.appointmentRepository.find({
      relations: {
        user: true,
        doctor: true,
      },
    });

    for (const appointment of AllAppointments){
      const dateRequest = dateAppointment.toISOString()
      const dateofDB = appointment.date.toISOString()
      if (
        appointment.doctor.id == doctorId &&
        dateRequest == dateofDB
      ) {
        return "The DOCTOR already has an appointment with another USER at the same time.";
      }

      if (
        appointment.user.id == userId &&
        dateRequest == dateofDB
      ) {
        return "The USER already has an appointment with another DOCTOR at the same time.";
      }
      
    };
    return "";
  }

  async findOneById(id: number): Promise<IAppointmentResponse> {
    try {
      const findAppointment = await this.appointmentRepository.findOne({
        where: { id },
        relations: ['user', 'doctor'],
      });
      if (!findAppointment) {
        throw new NotFoundException(`Cita con ID ${id} no encontrada`);
      }

      const appointment = {
        id: findAppointment.id,
        reason: findAppointment.reason,
        date: dateToGMT(findAppointment.date),
        userId: findAppointment.user,
        doctorId: findAppointment.doctor
      }

      return appointment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleError(error, 'Failed to find appointment');
    }
  }

  async findAll() {
    const findAllAppointments = await this.appointmentRepository.find({
      relations: {
        user: true,
        doctor: true,
      },
    });
    let AllAppointments = []
    findAllAppointments.forEach((appointment) => {
      const formattedDate = dateToGMT(appointment.date)
    
      AllAppointments.push({
        id: appointment.id,
        reason: appointment.reason,
        date: formattedDate,
        user: appointment.user,
        doctor: appointment.doctor,
      });
    });
    
    return AllAppointments;
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<IAppointmentResponse> {
    try {

      const responseExist = await this.existUser(updateAppointmentDto.userId, updateAppointmentDto.doctorId);

      if (!responseExist) {
        throw new NotFoundException(`user or doctor does not found`);
      }

      const AppointmentDate = new Date(updateAppointmentDto.date)
      const availability = await this.validateAvailabilityDateAppointment(
        AppointmentDate, updateAppointmentDto.doctorId, updateAppointmentDto.userId
      )

      if (availability.length > 0 ) {
        throw new NotFoundException(availability);
      }

      const user = await this.userRepository.findOne({where:{id:updateAppointmentDto.userId}})
      const doctor = await this.userRepository.findOne({where:{id:updateAppointmentDto.doctorId}})
      
      const appointment = await this.appointmentRepository.findOne({where:{id:id}});
      
      appointment.reason = updateAppointmentDto.reason
      appointment.date = AppointmentDate
      appointment.user = user
      appointment.doctor = doctor
      
      await this.appointmentRepository.save(appointment)   
      const date = dateToGMT(AppointmentDate)
      return {
        id: appointment.id,
        reason: appointment.reason,
        date: date,
        userId: user,
        doctorId: doctor
      }

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleError(error, 'Failed to update appointment');
    }
  }

  async remove(id: number):Promise<any> {
    try {
      const appointment = await this.appointmentRepository.findOne({ where: { id } });
  
      if (!appointment) {
        throw new NotFoundException(`Appointment with ID ${id} not found`);
      }
  
      return await this.appointmentRepository.remove(appointment)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-lanza la excepción si ya es del tipo esperado
      }
      handleError(error, 'Failed to remove appointment');
    }
  }


  async checkAvailabilityDoctor(doctorId: number, date: Date) {
    const newDate = new Date(date);
    const availability = [];
  

    const timeInit = new Date(newDate.setHours(7, 0, 0, 0));
    const hourFinal = new Date(newDate.setHours(18, 0, 0, 0)); 
  
    const userId = 0;
  
    while (timeInit < hourFinal) {
  
      const response = await this.validateAvailabilityDateAppointment(
        new Date(timeInit), 
        doctorId,
        userId,
      );
  
      if (response.length > 0) {
        availability.push("Busy Doctor");
      } else {
        const localTime = timeInit.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        availability.push(localTime);
      }
  
      timeInit.setHours(timeInit.getHours() + 1);
    }
  
    return {
      Date: newDate.toISOString().split("T")[0],
      From: "07:00",
      To: "18:00",
      availability: availability,
    };
  }
  

} //Fin class Service

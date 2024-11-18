import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { User } from 'src/modules/users/entities/user.entity';


export default class CreateAppointment implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const appointmentRepository = dataSource.getRepository(Appointment);
    const userRepository = dataSource.getRepository(User);

    const appointmentData = [
      {
        reason: 'Consulta General',
        date: '2024-12-01T09:00:00.000Z',
        commits: [],
        userId: 3,
        doctorId: 4,
      },
      {
        reason: 'Consulta General',
        date: '2024-12-01T09:00:00.000Z',
        commits: [],
        userId: 2,
        doctorId: 5,
      },
      {
        reason: 'Ortopedia',
        date: '2024-12-01T09:00:00.000Z',
        commits: [],
        userId: 1,
        doctorId: 6,
      },
      {
        reason: 'Ortopedia',
        date: '2024-12-15T09:00:00.000Z',
        commits: [],
        userId: 3,
        doctorId: 6
      },
      {
        reason: 'Ortopedia',
        date: '2024-12-30T09:00:00.000Z',
        commits: [],
        userId: 1,
        doctorId: 6,
      },
      {
        reason: 'Consulta General - Revisión Examenes',
        date: '2024-12-30T09:00:00.000Z',
        commits: [],
        userId: 3,
        doctorId: 4,
      },
    ];

    for (const appointment of appointmentData) {
      const { userId, doctorId, date, reason, commits } = appointment;

      let user = await userRepository.findOne({ where: { id: userId } });

      let doctor = await userRepository.findOne({
        where: { id: doctorId },
      });

      if (!user || !doctor) {
        console.log('No se agregó usuario a la base de datos');
        continue
      }

      const parseToDateAppointmentDate = new Date(date);

      const appointmentExist = await appointmentRepository.find({
        where: {
          date: parseToDateAppointmentDate,
          doctor: doctor,
        },
      });

      if (appointmentExist.length == 0) {
        const newAppointment = appointmentRepository.create({
          reason,
          date,
          commits,
          user,
          doctor,
        });
        await appointmentRepository.save(newAppointment);
      }
    }
    console.log('Seed Appointments loaded');
  }
}

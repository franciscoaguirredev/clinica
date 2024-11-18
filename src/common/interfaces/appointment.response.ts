import { User } from 'src/modules/users/entities/user.entity';

export interface IAppointmentResponse {
  id: number;
  reason: string;
  date: string ;
  userId: User;
  doctorId: User;
}

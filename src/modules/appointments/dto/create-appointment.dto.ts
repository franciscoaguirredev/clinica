import { IsNotEmpty, IsDate, IsString, IsDefined } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  reason: string;

  @IsNotEmpty()
  @IsDate()
  @IsDefined()
  date: Date;

  @IsNotEmpty()
  @IsDefined()
  userId: number;

  @IsNotEmpty()
  @IsDefined()
  doctorId: number;
}

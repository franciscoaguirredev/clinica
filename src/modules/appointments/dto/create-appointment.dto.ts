import { IsNotEmpty, IsDate, IsString } from 'class-validator';

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsString()
    reason: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    doctorId: number;
}

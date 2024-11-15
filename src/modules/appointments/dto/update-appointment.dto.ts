import { IsOptional, IsDate, IsString } from 'class-validator';

export class UpdateAppointmentDto {
    @IsOptional()
    @IsString()
    reason?: string;

    @IsOptional()
    @IsDate()
    date?: Date;

    @IsOptional()
    userId?: number; // Actualización opcional del usuario

    @IsOptional()
    doctorId?: number; // Actualización opcional del médico
}

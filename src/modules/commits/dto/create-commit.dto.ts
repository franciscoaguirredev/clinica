import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommitDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  appointmentId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

import { IsOptional, IsInt, IsString, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number) // Primero, transforma a Number
  @IsInt()
  @Transform(({ value }) => value || 1) // Luego, transforma el valor a 1 si es undefined
  page?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Transform(({ value }) => value || 10) // Establece un valor predeterminado para size
  size?: number;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @Type(() => Date)
  date?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  doctorId?: number;
}

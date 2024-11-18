import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IRoleId } from 'src/common/interfaces/roleId.interface';
import { Role } from 'src/modules/roles/entities/role.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(6)
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must include at least one uppercase letter, one lowercase letter, and one number or special character.',
  })
  password: string;

  @IsNotEmpty()
  @IsInt()
  role: IRoleId;
}

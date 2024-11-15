import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class UpdateuserDto {

    @IsOptional()
    @MinLength(6)
    @MaxLength(255)
    name?:string
    
    @IsOptional()
    @IsEmail()
    @MinLength(6)
    @MaxLength(255)
    email?:string

    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(255)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must include at least one uppercase letter, one lowercase letter, and one number or special character.'
    })
    password?:string

}

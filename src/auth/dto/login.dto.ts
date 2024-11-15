import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginUserDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;    
}
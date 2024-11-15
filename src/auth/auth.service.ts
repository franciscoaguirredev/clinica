import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { loginUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/modules/users/entities/user.entity';
import { usersService } from 'src/modules/users/users.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { handleError, handleResponse } from 'src/common/utils/response.util';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository:Repository<User>,
        private readonly jwtService:JwtService,
        private readonly userService: usersService
    ){}

    async register(createuser :CreateUserDto){
        try {
          const findUser = await this.userRepository.findOne({where: {email:createuser.email}})
          if(findUser){
            return "Email alredy exists"
          }

          const user = await this.userService.create(createuser)

          delete user.password

          const payload = {
            name:createuser.name,
            email: createuser.email,
            id: user.id
          }

          const token = this.getJwtToken(payload)
            const data = {...user,token}
          return handleResponse(data, 'user created successfully', HttpStatus.CREATED)
        
        } catch (error) {
          handleError(error, 'Failed to create user');
        }
    };

    async login(loginUserDto:loginUserDto){
        const {password, email} = loginUserDto

        const user = await this.userRepository.findOne({where:{email}, select: {email:true, password:true,}})
         console.log(user)
        if(!user || !bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Credentials are not valid')

        delete user.password
        const payload = {
            email:user.email,
            id: user.id
          }    

        return {
            ...user,
            token:this.getJwtToken(payload)
        }
    }

    private getJwtToken(payload:JwtPayload){
        const token = this.jwtService.sign(payload);
        return token
    }

}
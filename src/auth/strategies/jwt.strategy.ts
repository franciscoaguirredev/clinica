import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/modules/users/entities/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(User) private readonly userRepository:Repository<User>,
        configService:ConfigService
    ){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload:JwtPayload):Promise<User>{

        const {email} = payload

        const user = await this.userRepository.findOneBy({email});

        if(!user) throw new UnauthorizedException('Token no valid')

        return user
    }

}
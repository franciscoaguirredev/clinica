// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { JwtPayload } from "../interfaces/jwt-payload.interface";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { ConfigService } from "@nestjs/config";
// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { user } from "src/users/entities/user.entity";


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy){

//     constructor(
//         @InjectRepository(user) private readonly userRepository:Repository<user>,
//         configService:ConfigService
//     ){
//         super({
//             secretOrKey: configService.get('JWT_SECRET'),
//             jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
//         });
//     }

//     async validate(payload:JwtPayload):Promise<user>{

//         const {email} = payload

//         const user = await this.userRepository.findOneBy({email});

//         if(!user) throw new UnauthorizedException('Token no valid')

//         return user
//     }

// }
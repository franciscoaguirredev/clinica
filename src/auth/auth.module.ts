import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from 'src/modules/users/entities/user.entity';
import { usersService } from 'src/modules/users/users.service';


@Module({
  imports:[ConfigModule ,TypeOrmModule.forFeature([User]), 
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>{      
        return {
          secret:configService.get('JWT_SECRET'),
          signOptions:{
          expiresIn:'2h'
        }
      }
    }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, usersService, JwtStrategy],
  exports:[TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
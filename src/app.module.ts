import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { User } from './modules/users/entities/user.entity';
import { Role } from './modules/roles/entities/role.entity';
import { Appointment } from './modules/appointments/entities/appointment.entity';
import { Commit } from './modules/commits/entities/commit.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    User,
    Role, 
    Appointment,
    Commit
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

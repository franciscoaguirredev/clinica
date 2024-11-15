import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './modules/roles/roles.module';
import { usersModule } from './modules/users/users.module';
import { CommitsModule } from './modules/commits/commits.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RolesModule,
    usersModule,
    CommitsModule,
    AppointmentsModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

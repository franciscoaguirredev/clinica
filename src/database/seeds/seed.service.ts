import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import CreateRoles from './roles.seed';
import CreateUsers from './users.seed';
import CreateAppointment from './appointments.seed';
import CreateCommits from './commits.seed';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async seed(){
    const roleSeeder = new CreateRoles()
    await roleSeeder.run(this.dataSource)
    const userSeeder = new CreateUsers()
    await userSeeder.run(this.dataSource)
    const appointmentSeeder = new CreateAppointment()
    await appointmentSeeder.run(this.dataSource)
    const commitSeeder = new CreateCommits()
    await commitSeeder.run(this.dataSource)
  }

}
import { Module } from '@nestjs/common';
// import { usersService } from './users.service';
// import { usersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // controllers: [usersController],
  // providers: [usersService],
})
export class usersModule {}

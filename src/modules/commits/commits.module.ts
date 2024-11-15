import { Module } from '@nestjs/common';
import { CommitsService } from './commits.service';
import { CommitsController } from './commits.controller';
import { Commit } from './entities/commit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Commit])],
  controllers: [CommitsController],
  providers: [CommitsService],
})
export class CommitsModule {}

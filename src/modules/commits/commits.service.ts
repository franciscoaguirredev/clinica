import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommitDto } from './dto/create-commit.dto';
import { UpdateCommitDto } from './dto/update-commit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commit } from './entities/commit.entity';
import { Repository } from 'typeorm';
import { Appointment } from '../appointments/entities/appointment.entity';
import { User } from '../users/entities/user.entity';
import { handleError } from 'src/common/utils/response.util';

@Injectable()
export class CommitsService {
  constructor(
    @InjectRepository(Commit)
    private readonly commitRepository: Repository<Commit>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createCommit(createCommitDto: CreateCommitDto): Promise<Commit> {
    try {
      const { content, appointmentId, userId } = createCommitDto;

      const appointment = await this.appointmentRepository.findOne({ where: { id: appointmentId } });
      if (!appointment) {
        throw new NotFoundException(`Appointment with ID ${appointmentId} not found`);
      }
  
      const user = await this.userRepository.findOne({relations:{role:true}, where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
  
      if(user.role.id == 1){
        throw new NotFoundException(`the user does not have permission to comment`);
      }
  
      const newCommit = this.commitRepository.create({
        content,
        appointment,
        user,
      });
  
      return await this.commitRepository.save(newCommit);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleError(error, 'Failed to save commit');
    }
  }

  findAll() {
    return `This action returns all commits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commit`;
  }

  update(id: number, updateCommitDto: UpdateCommitDto) {
    return `This action updates a #${id} commit`;
  }

  remove(id: number) {
    return `This action removes a #${id} commit`;
  }
}

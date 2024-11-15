// import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
// import { CreateuserDto } from './dto/create-user.dto';
// import { UpdateuserDto } from './dto/update-user.dto';
// import { user } from './entities/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';
// import { handleError, handleResponse } from 'src/common/utils/response.util';

// @Injectable()
// export class usersService {
//   constructor(
//     @InjectRepository(user)
//     private readonly userRepository: Repository<user>,
//   ) {}

//   async create(createuser: CreateuserDto): Promise<user> {
//     try {
//       const {password, ...userData} = createuser
//       const user = await this.userRepository.create({
//         ...userData,
//         password: bcrypt.hashSync(password, 10)
//       })
//       return await this.userRepository.save(user);
//     } catch (error) {
//       handleError(error, 'Failed to create user')
//     }

//   }

//   async findAll(): Promise<any> {
//     try {
//       const data = await this.userRepository.find();
//       return handleResponse(data, 'users found successfully', HttpStatus.OK)
//     } catch (error) {
//       handleError(error, 'Failed to find users')
//     }
//   }

//   async findOne(id: number): Promise<any> {
//     try {
//       const user = await this.userRepository.findOne({ where: { id } });
//       if (!user) {
//         throw new NotFoundException(`user with ID ${id} not found`);
//       }
//       return handleResponse(user, 'user found successfully', HttpStatus.OK)
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       handleError(error, 'Failed to find user')
//     }
//   }

//   async update(id: number, updateuserDto: UpdateuserDto): Promise<any> {
//     try {
//       const user = await this.userRepository.findOne({ where: { id } });
//       if (!user) {
//         throw new NotFoundException(`user with ID ${id} not found`);
//       }
//       Object.assign(user, updateuserDto);
//       const updateduser = await this.userRepository.save(user);
//       return handleResponse(updateduser, 'user updated successfully', HttpStatus.OK)
//     } catch (error) {
//             if (error instanceof NotFoundException) {
//         throw error;
//       }
//       handleError(error, 'Failed to update user')
//     }
//   }

//   async remove(id: number): Promise<any> {
//     const user = await this.userRepository.findOne({ where: { id } });
//     await this.userRepository.remove(user);
//     return handleResponse(null, 'user deleted successfully', HttpStatus.OK);
//   }
// }

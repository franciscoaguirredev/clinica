// import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
// // import { usersService } from './users.service';
// import { CreateuserDto } from './dto/create-user.dto';
// import { UpdateuserDto } from './dto/update-user.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// @ApiTags('users')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
// @Controller('users')
// export class usersController {
//   constructor(private readonly usersService: usersService) {}

//   @Get()
//   findAll() {
//     return this.usersService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.usersService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateuserDto: UpdateuserDto) {
//     return this.usersService.update(+id, updateuserDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.usersService.remove(+id);
//   }
// }

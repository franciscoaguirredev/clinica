import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PaginationDto } from './dto/pagination-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  async findAll(@Query() paginatioDto:PaginationDto) {
    return await this.appointmentsService.getAppointmentsPagination(paginatioDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.appointmentsService.findOneById(id);
  }

  @Post('checkAvailability')
  checkAvailability(@Body() checkAvailabilityDto) {
    const { doctorId, date } = checkAvailabilityDto;

    const appointmentDate = new Date(date);

    if (isNaN(appointmentDate.getTime())) {
      throw new NotFoundException('Invalid date format');
    }
    return this.appointmentsService.checkAvailabilityDoctor(
      doctorId,
      appointmentDate,
    );
  }


  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return await this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.appointmentsService.remove(id);
  }
}

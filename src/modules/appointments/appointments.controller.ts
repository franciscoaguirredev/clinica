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
    HttpStatus 
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    // Crear una nueva cita
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return await this.appointmentsService.create(createAppointmentDto);
    }

    // Leer todas las citas
    @Get()
    async findAll() {
        return await this.appointmentsService.findAll();
    }

    // Leer una cita por ID
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.appointmentsService.findOneById(id);
    }

    // Actualizar una cita por ID
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAppointmentDto: UpdateAppointmentDto
    ) {
        return await this.appointmentsService.update(id, updateAppointmentDto);
    }

    // Eliminar una cita por ID
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.appointmentsService.remove(id);
    }
}

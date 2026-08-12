/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @Roles(UserRole.USER)
  async create(@Req() req: any, @Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.create(req.user.id, dto);
  }

  @Get('me')
  @Roles(UserRole.USER, UserRole.DOCTOR)
  async findMine(@Req() req: any) {
    if (req.user.role === UserRole.DOCTOR) {
      return this.appointmentsService.findDoctorAppointments(req.user.id);
    }
    return this.appointmentsService.findMyAppointments(req.user.id);
  }

  @Get('doctor')
  @Roles(UserRole.DOCTOR)
  async findByDoctor(@Req() req: any) {
    return this.appointmentsService.findDoctorAppointments(req.user.id);
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.DOCTOR)
  async findOne(@Req() req: any, @Param('id') id: string) {
    return this.appointmentsService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id/status')
  @Roles(UserRole.DOCTOR)
  async updateStatus(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateAppointmentStatusDto,
  ) {
    return this.appointmentsService.updateStatus(id, req.user.id, dto);
  }

  @Patch(':id/cancel')
  @Roles(UserRole.USER)
  async cancel(@Req() req: any, @Param('id') id: string) {
    return this.appointmentsService.cancel(id, req.user.id);
  }
}

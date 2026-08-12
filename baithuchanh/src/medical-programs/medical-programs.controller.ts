/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';

import { MedicalProgramsService } from './medical-programs.service';
import { CreateMedicalProgramDto } from './dto/create-medical-program.dto';

import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('medical-programs')
export class MedicalProgramsController {
  constructor(
    private readonly medicalProgramsService: MedicalProgramsService,
  ) {}

  @Post()
  @Roles(UserRole.DOCTOR)
  async create(@Req() req: any, @Body() dto: CreateMedicalProgramDto) {
    return this.medicalProgramsService.create(req.user.id, dto);
  }

  @Get()
  async findAll(@Query('search') search?: string) {
    return this.medicalProgramsService.findAll(search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.medicalProgramsService.findOne(id);
  }
}

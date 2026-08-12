/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentStatus } from './entities/appointment-status.enum';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';
import { MedicalProgram } from '../medical-programs/entities/medical-program.entity';

@Injectable()
export class AppointmentsService {
  findAll(id: any, role: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,

    @InjectRepository(MedicalProgram)
    private readonly medicalProgramRepository: Repository<MedicalProgram>,
  ) {}

  async create(
    patientId: string,
    dto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const medicalProgram = await this.medicalProgramRepository.findOne({
      where: {
        id: dto.medicalProgramId,
        isActive: true,
      },
    });

    if (!medicalProgram) {
      throw new NotFoundException('Medical program not found or inactive');
    }

    if (!dto.appointmentDate) {
      throw new BadRequestException('Appointment date is required');
    }

    const appointmentDate = new Date(dto.appointmentDate);

    if (appointmentDate <= new Date()) {
      throw new BadRequestException('Appointment date must be in the future');
    }

    const appointment = this.appointmentRepository.create({
      patientId,
      medicalProgramId: medicalProgram.id,
      appointmentDate,
      status: AppointmentStatus.PENDING,
    });

    return this.appointmentRepository.save(appointment);
  }

  async findMyAppointments(patientId: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: {
        patientId,
      },
      order: {
        appointmentDate: 'ASC',
      },
    });
  }

  async findOne(id: string, userId: string, role?: any): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (appointment.patientId !== userId) {
      throw new ForbiddenException('You can only view your own appointment');
    }

    return appointment;
  }

  async cancel(id: string, patientId: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (appointment.patientId !== patientId) {
      throw new ForbiddenException('You can only cancel your own appointment');
    }

    if (appointment.status === AppointmentStatus.COMPLETED) {
      throw new BadRequestException(
        'Completed appointment cannot be cancelled',
      );
    }

    if (appointment.status === AppointmentStatus.CANCELLED) {
      throw new BadRequestException('Appointment is already cancelled');
    }

    appointment.status = AppointmentStatus.CANCELLED;

    return this.appointmentRepository.save(appointment);
  }

  async findDoctorAppointments(doctorId: string): Promise<Appointment[]> {
    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .innerJoin(
        MedicalProgram,
        'program',
        'program.id = appointment.medical_program_id',
      )
      .where('program.doctor_id = :doctorId', { doctorId })
      .orderBy('appointment.appointment_date', 'ASC')
      .getMany();
  }

  async updateStatus(
    id: string,
    doctorId: string,
    dto: UpdateAppointmentStatusDto,
  ): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    const medicalProgram = await this.medicalProgramRepository.findOne({
      where: {
        id: appointment.medicalProgramId,
      },
    });

    if (!medicalProgram) {
      throw new NotFoundException('Medical program not found');
    }

    if (medicalProgram.doctorId !== doctorId) {
      throw new ForbiddenException(
        'You can only manage appointments of your own programs',
      );
    }

    if (
      dto.status !== AppointmentStatus.CONFIRMED &&
      dto.status !== AppointmentStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Doctor can only change status to confirmed or completed',
      );
    }

    if (appointment.status === AppointmentStatus.CANCELLED) {
      throw new BadRequestException('Cancelled appointment cannot be updated');
    }

    appointment.status = dto.status;

    return this.appointmentRepository.save(appointment);
  }
}

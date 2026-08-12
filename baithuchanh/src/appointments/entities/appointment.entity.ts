import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AppointmentStatus } from './appointment-status.enum';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  declare id: string;

  @Column({
    name: 'patient_id',
    type: 'uuid',
  })
  declare patientId: string;

  @Column({
    name: 'medical_program_id',
    type: 'uuid',
  })
  declare medicalProgramId: string;

  @Column({
    name: 'appointment_date',
    type: 'timestamptz',
  })
  declare appointmentDate: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  declare status: AppointmentStatus;

  @CreateDateColumn({
    name: 'created_at',
  })
  declare createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  declare updatedAt: Date;
}

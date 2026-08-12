import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('medical_programs')
export class MedicalProgram {
  @PrimaryGeneratedColumn('uuid')
  declare id: string;

  @Column({ name: 'doctor_id', type: 'uuid' })
  declare doctorId: string;

  @Column({ type: 'varchar' })
  declare title: string;

  @Column({ type: 'text' })
  declare description: string;

  @Column({ type: 'numeric' })
  declare price: number;

  @Column({ name: 'duration_minutes', type: 'integer' })
  declare durationMinutes: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  declare isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  declare createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  declare updatedAt: Date;
}

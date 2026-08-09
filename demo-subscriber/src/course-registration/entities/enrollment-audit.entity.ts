import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'enrollment_audits' })
export class EnrollmentAudit {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ name: 'enrollment_id', type: 'int' })
  declare enrollmentId: number;

  @Column({ name: 'course_section_id', type: 'int' })
  declare courseSectionId: number;

  @Column({ name: 'student_id', type: 'int' })
  declare studentId: number;

  @Column({ type: 'varchar', length: 50 })
  declare action: string;

  @CreateDateColumn({ name: 'created_at' })
  declare createdAt: Date;
}

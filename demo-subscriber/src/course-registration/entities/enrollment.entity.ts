import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'enrollments' })
@Unique('UQ_enrollment_course_student', ['courseSectionId', 'studentId'])
export class Enrollment {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({
    name: 'course_section_id',
    type: 'int',
  })
  declare courseSectionId: number;

  @Column({
    name: 'student_id',
    type: 'int',
  })
  declare studentId: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  declare createdAt: Date;
}

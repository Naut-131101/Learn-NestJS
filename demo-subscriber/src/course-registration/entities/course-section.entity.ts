export class CourseRegistration {}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'course_sections' })
export class CourseSection {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  declare code: string;

  @Column({
    type: 'int',
  })
  declare capacity: number;

  @Column({
    name: 'enrolled_count',
    type: 'int',
    default: 0,
  })
  declare enrolledCount: number;
}

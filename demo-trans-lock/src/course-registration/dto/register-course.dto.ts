import { IsInt, Min } from 'class-validator';

export class RegisterCourseDto {
  @IsInt()
  @Min(1)
  courseSectionId!: number;

  @IsInt()
  @Min(1)
  studentId!: number;
}

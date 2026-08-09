import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RegisterCourseDto } from './dto/register-course.dto';
import { CourseSection } from './entities/course-section.entity';
import { Enrollment } from './entities/enrollment.entity';

@Injectable()
export class CourseRegistrationService {
  constructor(private readonly dataSource: DataSource) {}

  async registerCourse(dto: RegisterCourseDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const courseSectionRepository =
        queryRunner.manager.getRepository(CourseSection);

      const enrollmentRepository =
        queryRunner.manager.getRepository(Enrollment);

      const courseSection = await courseSectionRepository
        .createQueryBuilder('courseSection')
        .setLock('pessimistic_write')
        .where('courseSection.id = :courseSectionId', {
          courseSectionId: dto.courseSectionId,
        })
        .getOne();

      if (!courseSection) {
        throw new NotFoundException('Không tìm thấy học phần');
      }

      const existingEnrollment = await enrollmentRepository.findOneBy({
        courseSectionId: dto.courseSectionId,
        studentId: dto.studentId,
      });

      if (existingEnrollment) {
        throw new ConflictException('Sinh viên đã đăng ký học phần này');
      }

      if (courseSection.enrolledCount >= courseSection.capacity) {
        throw new ConflictException(
          `Học phần đã đủ ${courseSection.enrolledCount}/${courseSection.capacity} sinh viên`,
        );
      }

      await this.delay(3000);

      const enrollment = enrollmentRepository.create({
        courseSectionId: dto.courseSectionId,
        studentId: dto.studentId,
      });

      const savedEnrollment = await enrollmentRepository.save(enrollment);

      courseSection.enrolledCount += 1;

      await courseSectionRepository.save(courseSection);

      await queryRunner.commitTransaction();

      return {
        message: 'Đăng ký học phần thành công',
        data: {
          enrollmentId: savedEnrollment.id,
          studentId: savedEnrollment.studentId,
          courseSectionId: savedEnrollment.courseSectionId,
          registered: courseSection.enrolledCount,
          capacity: courseSection.capacity,
        },
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
}

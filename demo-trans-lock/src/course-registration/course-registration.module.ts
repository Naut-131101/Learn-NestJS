import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseRegistrationController } from './course-registration.controller';
import { CourseRegistrationService } from './course-registration.service';
import { CourseSection } from './entities/course-section.entity';
import { Enrollment } from './entities/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseSection, Enrollment])],
  controllers: [CourseRegistrationController],
  providers: [CourseRegistrationService],
})
export class CourseRegistrationModule {}

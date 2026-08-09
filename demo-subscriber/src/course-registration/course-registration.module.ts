import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseRegistrationController } from './course-registration.controller';
import { CourseRegistrationService } from './course-registration.service';
import { CourseSection } from './entities/course-section.entity';
import { Enrollment } from './entities/enrollment.entity';
import { EnrollmentAudit } from './entities/enrollment-audit.entity';
import { EnrollmentSubscriber } from './subscribers/enrollment.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseSection, Enrollment, EnrollmentAudit]),
  ],
  controllers: [CourseRegistrationController],
  providers: [CourseRegistrationService, EnrollmentSubscriber],
})
export class CourseRegistrationModule {}

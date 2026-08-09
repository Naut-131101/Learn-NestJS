import { Body, Controller, Post } from '@nestjs/common';

import { CourseRegistrationService } from './course-registration.service';
import { RegisterCourseDto } from './dto/register-course.dto';

@Controller('course-registrations')
export class CourseRegistrationController {
  constructor(
    private readonly courseRegistrationService: CourseRegistrationService,
  ) {}

  @Post()
  registerCourse(@Body() dto: RegisterCourseDto) {
    return this.courseRegistrationService.registerCourse(dto);
  }
}

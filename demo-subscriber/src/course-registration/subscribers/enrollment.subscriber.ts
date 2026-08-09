import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { EnrollmentAudit } from '../entities/enrollment-audit.entity';
import { Enrollment } from '../entities/enrollment.entity';

@Injectable()
@EventSubscriber()
export class EnrollmentSubscriber implements EntitySubscriberInterface<Enrollment> {
  constructor(private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return Enrollment;
  }

  beforeInsert(event: InsertEvent<Enrollment>): void {
    const enrollment = event.entity;

    if (!enrollment) {
      return;
    }

    console.log('Chuẩn bị đăng ký học phần:', {
      studentId: enrollment.studentId,
      courseSectionId: enrollment.courseSectionId,
    });
  }

  async afterInsert(event: InsertEvent<Enrollment>): Promise<void> {
    const enrollment = event.entity;

    if (!enrollment) {
      return;
    }

    const enrollmentAuditRepository =
      event.manager.getRepository(EnrollmentAudit);

    const audit = enrollmentAuditRepository.create({
      enrollmentId: enrollment.id,
      courseSectionId: enrollment.courseSectionId,
      studentId: enrollment.studentId,
      action: 'COURSE_REGISTERED',
    });

    await enrollmentAuditRepository.save(audit);

    console.log('Đã tạo lịch sử đăng ký:', {
      enrollmentId: enrollment.id,
      studentId: enrollment.studentId,
      courseSectionId: enrollment.courseSectionId,
    });
  }
}

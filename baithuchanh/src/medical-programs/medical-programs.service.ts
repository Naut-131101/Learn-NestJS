import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MedicalProgram } from './entities/medical-program.entity';
import { CreateMedicalProgramDto } from './dto/create-medical-program.dto';

@Injectable()
export class MedicalProgramsService {
  constructor(
    @InjectRepository(MedicalProgram)
    private readonly medicalProgramRepository: Repository<MedicalProgram>,
  ) {}

  async create(
    doctorId: string,
    dto: CreateMedicalProgramDto,
  ): Promise<MedicalProgram> {
    const medicalProgram = this.medicalProgramRepository.create({
      doctorId,
      title: dto.title,
      description: dto.description,
      price: dto.price,
      durationMinutes: dto.durationMinutes,
      isActive: true,
    });

    return this.medicalProgramRepository.save(medicalProgram);
  }

  async findAll(search?: string): Promise<MedicalProgram[]> {
    const query = this.medicalProgramRepository
      .createQueryBuilder('program')
      .where('program.isActive = :isActive', {
        isActive: true,
      });

    if (search) {
      query.andWhere(
        '(LOWER(program.title) LIKE LOWER(:search) OR LOWER(program.description) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }

    return query.orderBy('program.createdAt', 'DESC').getMany();
  }

  async findOne(id: string): Promise<MedicalProgram> {
    const medicalProgram = await this.medicalProgramRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });

    if (!medicalProgram) {
      throw new NotFoundException('Medical program not found');
    }

    return medicalProgram;
  }
}

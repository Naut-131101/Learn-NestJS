import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalProgram } from './entities/medical-program.entity';
import { MedicalProgramsController } from './medical-programs.controller';
import { MedicalProgramsService } from './medical-programs.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalProgram])],
  controllers: [MedicalProgramsController],
  providers: [MedicalProgramsService],
  exports: [MedicalProgramsService],
})
export class MedicalProgramsModule {}

import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  @IsNotEmpty()
  medicalProgramId?: string;

  @IsDateString()
  @IsNotEmpty()
  appointmentDate?: string;
}

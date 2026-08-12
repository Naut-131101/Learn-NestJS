import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateMedicalProgramDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsNumber()
  @Min(0.01)
  price?: number;

  @IsInt()
  @Min(1)
  durationMinutes?: number;
}

import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(50)
  age!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  breed!: string;
}

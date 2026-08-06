/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString } from 'class-validator';

export class SearchBookDto {
  @IsOptional()
  @IsString()
  category?: string;
}

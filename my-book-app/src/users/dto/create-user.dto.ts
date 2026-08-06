/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}

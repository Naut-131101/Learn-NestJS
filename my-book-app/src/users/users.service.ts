/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './enums/role.enum';
import { hashPassword } from '../auth/crypto/hashing.util';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];

  async onModuleInit() {
    const hashedPassword = await hashPassword('naut@9999');
    this.users.push(
      new User(this.users.length + 1, 'naut', hashedPassword, [Role.Admin]),
    );
  }

  async create(userDto: CreateUserDto) {
    const existed = this.users.find(
      (user) => user.username.toLowerCase() === userDto.username.toLowerCase(),
    );

    if (existed) {
      throw new ConflictException(
        `Username ${userDto.username} already exists`,
      );
    }

    const hashedPassword = await hashPassword(userDto.password);
    const user = new User(
      this.users.length + 1,
      userDto.username,
      hashedPassword,
      [Role.Member],
    );

    this.users.push(user);

    const { password, ...result } = user;
    return result;
  }

  findByUsername(username: string) {
    return this.users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  findAll() {
    return this.users.map(({ password, ...rest }) => rest);
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    const { password, ...result } = user;
    return result;
  }
}

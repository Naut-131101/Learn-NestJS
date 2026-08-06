/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './enums/role.enum';

export interface User {
  userId: number;
  username: string;
  password: string;
  roles: Role[];
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { userId: 1, username: 'mario', password: 'abcd1234', roles: [Role.Admin] },
    { userId: 2, username: 'luigi', password: 'abcd1234', roles: [Role.User] },
  ];

  // eslint-disable-next-line @typescript-eslint/require-await
  async findOne(username: string): Promise<User> {
    const result = this.users.find((user) => user.username === username);
    if (!result) {
      throw new NotFoundException(`User ${username} not found`);
    }
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async removeById(userId: number) {
    const result = this.users.findIndex(
      (user) => user.userId === Number(userId),
    );
    if (result === -1) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return this.users.splice(result, 1);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findAll() {
    return this.users.map((user) => ({ username: user.username }));
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findById(userId: number): Promise<User> {
    const result = this.users.find((u) => u.userId === userId);
    if (!result) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return result;
  }
}

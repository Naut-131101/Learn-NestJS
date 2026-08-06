import { Role } from '../enums/role.enum';

export class User {
  constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly password: string,
    public readonly roles: Role[],
  ) {}
}

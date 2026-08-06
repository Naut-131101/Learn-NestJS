import { Role } from '../users/enums/role.enum';

export type AccessTokenPayload = {
  sub: number; // nó là id nhưng vì người ta thường dùng sub để biểu đạt điều đó
  username: string;
  roles: Role[];
  iat?: number;
  exp?: number;
};

export type AuthenticatedRequest = {
  headers: { authorization?: string };
  user?: AccessTokenPayload;
};

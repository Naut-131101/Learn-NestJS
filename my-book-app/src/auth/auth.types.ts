import { Role } from '../users/enums/role.enum';

export type AccessTokenPayload = {
  sub: number;
  username: string;
  roles: Role[];
  iat?: number;
  exp?: number;
};

export type AuthenticatedRequest = {
  headers: {
    authorization?: string;
  };
  user?: AccessTokenPayload;
};

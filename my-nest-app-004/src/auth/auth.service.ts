import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../users/enums/role.enum';

export type AccessTokenPayload = {
  sub: number; // nó là id nhưng vì người ta thường dùng sub để biểu đạt điều đó
  username: string;
  roles: Role[];
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const result = await this.userService.findOne(username);
    if (result.password !== pass) {
      throw new UnauthorizedException();
    }
    const accessTokenPayload: AccessTokenPayload = {
      sub: result.userId,
      username: result.username,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      roles: result.roles,
    };
    return {
      access_token: await this.jwtService.signAsync(accessTokenPayload),
    };
  }

  async deleteProfileByUserId(userId: number) {
    const [result] = await this.userService.removeById(userId);
    return {
      message: `Profile ID: ${userId} deleted successfully`,
      userDeleted: result.username,
    };
  }
}

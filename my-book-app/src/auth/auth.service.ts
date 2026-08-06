import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AccessTokenPayload } from './auth.types';
import { compareHashPassword } from './crypto/hashing.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatches = await compareHashPassword(pass, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException();
    }

    const accessTokenPayload: AccessTokenPayload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };

    return {
      access_token: await this.jwtService.signAsync(accessTokenPayload),
    };
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


export type RequestWithAuthHeader = {
  header: { authorization?: string };
  user: AccessTokenPayload;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithAuthHeader>();
    const token = this.extractTokenFromHeader(request.header.authorization);

    if (!token) {
      throw new UnauthorizedException('Bearer token not found.');
    }

    try {
      const payload =
        await this.jwtService.verifyAsync<AccessTokenPayload>(token);
      request.user = payload;
    } catch {
      throw new UnauthorizedException('Token is invalid or expired');
    }

    return true;
  }

  private extractTokenFromHeader(authorization?: string): string | undefined {
    if (!authorization) {
      return undefined;
    }
    const [type, token] = authorization.split(' ');

    return type === 'Bearer' && token ? token : undefined;
  }
}

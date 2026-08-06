import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from '../auth.service';
import { AuthenticatedRequest } from '../auth.types';
import { Reflector } from '@nestjs/core/services/reflector.service';
import { IS_PUBLIC_KEY } from '../../users/decorators/isPublic.decorator';

export type RequestWithAuthHeader = {
  headers: { authorization?: string };
  user: AccessTokenPayload;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request.headers.authorization);

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

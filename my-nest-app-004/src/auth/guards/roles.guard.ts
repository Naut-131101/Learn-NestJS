import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core/services/reflector.service';
import { Role } from '../../users/enums/role.enum';
import { AuthenticatedRequest } from '../auth.types';
import { ROLES_KEY } from '../../users/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const hasRole = requiredRoles.some((role) =>
      request.user?.roles.includes(role),
    );
    if (!hasRole) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new ForbiddenException(`Required role: ${requiredRoles}`);
    }
    return true;
  }
}

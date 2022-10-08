import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccountRole } from '../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<AccountRole[]>('roles', [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const canActivate = requiredRoles.some((role) => user.accountRoles.includes(role));
    if (!canActivate)
      throw new HttpException(
        `You do not have the permission to access. Only ${requiredRoles.join(', ')} ${
          requiredRoles.length === 1 ? 'is' : 'are'
        } allowed`,
        HttpStatus.FORBIDDEN
      );
    else return true;
  }
}

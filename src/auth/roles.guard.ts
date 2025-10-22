
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //get the roles required for this route (from @Roles decorator)
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // if no role is specified, route is open
    }

    const { user } = context.switchToHttp().getRequest();
    //Check if the logged-in user's role matches
    return requiredRoles.includes(user.role);
  }
}

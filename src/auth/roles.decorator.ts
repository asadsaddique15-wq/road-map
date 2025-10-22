import { SetMetadata } from '@nestjs/common';

//assign roles to routes
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

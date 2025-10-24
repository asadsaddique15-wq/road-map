import { SetMetadata } from '@nestjs/common';

//the key used to store role metadata
export const ROLES_KEY = 'roles';

//decorator for roles, e.g. @Roles('Admin')
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

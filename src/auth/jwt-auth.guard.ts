// src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//guard protects routes that require authentication
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

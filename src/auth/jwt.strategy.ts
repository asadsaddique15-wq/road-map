import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extract JWT token
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'mySecretKey', // must match the secret used above
    });
  }

  async validate(payload: any) {
    // 👇 this will attach the user info (id, email) to request.user
    return { userId: payload.sub, email: payload.username };
  }
}

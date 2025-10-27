import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        //accept standard Bearer tokens
        ExtractJwt.fromAuthHeaderAsBearerToken(),

        //also accept raw tokens without "Bearer" (for Swagger quirks)
        (req) => {
          const token = req?.headers?.authorization;
          if (token && !token.startsWith('Bearer ')) {
            return token;
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'mySuperSecretKey123',
    });
  }

  async validate(payload: any) {
    console.log(' JWT payload:', payload); //useful debug log
    return { 
      userId: payload.sub, 
      email: payload.username, 
      role: payload.role 
    };
  }
}

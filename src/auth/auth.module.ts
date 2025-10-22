import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.stategy';


@Module({
  imports: [
    UsersModule, //authService can use usersService
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "mySuperSecretKey123", //secret key for signing tokens
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN as any || '1h'} , //tokens expire after 1 hour
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

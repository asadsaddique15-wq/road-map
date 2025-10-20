import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //post/register  new user
  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string; phoneNumber?: string },
  ) {
    return this.authService.register(body.name, body.email, body.password, body.phoneNumber);
  }

  // post// Login existing user
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}

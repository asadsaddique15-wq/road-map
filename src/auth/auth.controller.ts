import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard'

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
  
  @UseGuards(JwtAuthGuard) 
  @Get('')
  getProfile(@Request() req) {
    // if token is valid, NestJS will attach the user info to req.user
    return { message: 'Protected route accessed!', user: req.user };
  }

}

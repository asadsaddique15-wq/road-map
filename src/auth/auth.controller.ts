import {Controller,Post,Body,UseGuards,Get,Request,Param,Put,Delete,BadRequestException,} 
            from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //register new user
  @Post('')
  async register(
    @Body() body: { name: string; email: string; password: string; phoneNumber?: string; role?: string },
  ) {
    if (!body.name || !body.email || !body.password) {
      throw new BadRequestException('Name, email, and password are required');
    }

    return this.authService.register(
      body.name,
      body.email,
      body.password,
      body.phoneNumber,
      body.role,
    );
  }

  //login user
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      throw new BadRequestException('Email and password are required');
    }
    return this.authService.login(body.email, body.password);
  }

  //protected profile route
  @UseGuards(JwtAuthGuard)
  @Get('token')
  getProfile(@Request() req) {
    console.log('Authenticated user:', req.user);
    return { message: 'Protected route accessed!', user: req.user };
  }

  //admin only route
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Get('Admin')
  getAdminData(@Request() req) {
    return { message: 'Welcome Admin! You have special access.', user: req.user };
  }

  //update user (for Admin or same user)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() body: any) {
    return this.authService.updateUser(id, body);
  }

  //deleting user (for Admin or same user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }
}

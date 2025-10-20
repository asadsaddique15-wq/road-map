import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Register new user with hashed password
  async register(name: string, email: string, password: string, phoneNumber?: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.usersService.createUser({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    return { message: 'User registered successfully', user };
  }

  // Validate user login
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result; // return user data without password
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // Generate JWT token
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { message: 'Login successful', access_token: token };
  }
}

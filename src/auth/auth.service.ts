import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  //register new user
  async register(name: string, email: string, password: string, phoneNumber?: string, role?: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exists with this email');
    }

    //hashing password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create user using UsersService
    const newUser = await this.usersService.createUser({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role: role || 'User', // default role = User
    });

    return {
      message: 'User registered successfully',
      user: newUser,
    };
  }

  //loging in user
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials (email)');
    }

    //compare plain password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials (password)');
    }

    //create JWT payload and token
    const payload = { username: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  //update user info (Admin or same user can update)
  async updateUser(id: number, data: Partial<any>) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.usersService.updateUser(id, data);
    return { message: 'User updated successfully', user: updatedUser };
  }

  //delete user (Admin only or self)
  async deleteUser(id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    await this.usersService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}

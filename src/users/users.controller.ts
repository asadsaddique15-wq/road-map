import {Controller, Request, Get, Post, Body, Param, Put, Delete, NotFoundException, BadRequestException,
  InternalServerErrorException,} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Register new user, (password will be hashed)
  @Post('')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.createUser(createUserDto);
      return { message: 'User registered successfully', user };
    } catch (error) {
      throw new BadRequestException('Error creating user');
    }
  }

  // Login endpoint
  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new NotFoundException('Invalid email or password');
    }

    return { message: 'Login successful', user };
  }

  //Get all users
  @Get('')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      if (!users.length) throw new NotFoundException('No users found');
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get logged-in user profile' })
  @Get('profile')
  getProfile(@Request() req) {
    // this route requires a valid token
    return req.user; // comes from jwt.strategy.ts validate()
  }

  // Get one user by ID
  @Get('/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', example: 1 })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  //update user
  @Put('/:id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', example: 1 })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.updateUser(+id, updateUserDto);
      if (!updatedUser)
        throw new NotFoundException(`User with ID ${id} not found`);
      return { message: 'User updated successfully', updatedUser };
    } catch (error) {
      throw new BadRequestException('Failed to update user');
    }
  }

  // Delete user
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', example: 1 })

  async remove(@Param('id') id: string) {
    const result = await this.usersService.deleteUser(+id);
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: `User with ID ${id} deleted successfully` };
  }
}

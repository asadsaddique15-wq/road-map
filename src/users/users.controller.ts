import { Body, Controller, Get, Post, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ✅ GET all users
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  // ✅ GET single user by ID
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.getStatus?.() || HttpStatus.BAD_REQUEST);
    }
  }

  // ✅ POST route — create new user
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersService.create(createUserDto);
      return {
        message: 'User created successfully!',
        user: newUser,
      };
    } catch (error) {
      throw new HttpException(error.message, error.getStatus?.() || HttpStatus.BAD_REQUEST);
    }
  }
}

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  create(@Body() body: { name: string; email: string; password: string }): Promise<User> {
    return this.usersService.createUser(body.name, body.email, body.password);
  }

  @Get('/fetchall')
  getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  getById(@Param('id') id: number): Promise<User | null> {
    return this.usersService.getUserById(id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() body: Partial<User>): Promise<User | null> {
    return this.usersService.updateUser(id, body);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}

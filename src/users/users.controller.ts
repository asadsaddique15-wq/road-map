import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 🟢 GET /users
  @Get('/fetchall')
  getAll() {
    return this.usersService.findAll();
  }

  // 🟢 GET /users/:id
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // 🟢 POST /users
  @Post('/create_user')
  create(@Body() body: any) {
    return this.usersService.create(body);
  }

  // 🟢 PUT /users/:id
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.usersService.update(id, body);
  }

  // 🟢 DELETE /users/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}

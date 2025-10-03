import { Controller, Get, Post, Body, Param,  NotFoundException,  BadRequestException, } 
       from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/users')
export class UsersController {
    private users :CreateUserDto[]=[];

    @Get('/getallusers')
    findAll() {
        return this.users;
    }

    @Get(':id')
  findOne(@Param('id') id: string) {
    const index = Number(id);
    if (Number.isNaN(index) || index < 0) {
      throw new BadRequestException('Invalid id parameter');
    }
    const user = this.users[index];
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


    @Post("createusers")
    create(@Body() createUserDto : CreateUserDto) {
         // example: duplicate email check
    const exists = this.users.find(u => u.email === createUserDto.email);
    if (exists) {
      throw new BadRequestException('Email already exists');
    }
        this.users.push(createUserDto);
        return {
            message: 'User created successfully',
            data: createUserDto,
        };
    }
 }   
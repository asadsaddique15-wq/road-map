import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Asad', email: 'asad@gmail.com', password: '123456' },
    { id: 2, name: 'Ali', email: 'ali@gmail.com', password: 'abcdef' },
  ];

  findAll() {
    if (this.users.length === 0) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    if (!createUserDto.email || !createUserDto.name) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }

    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }
}

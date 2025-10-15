import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Asad', email: 'asad@example.com' },
    { id: 2, name: 'Ali', email: 'ali@example.com' },
    { id: 3, name: 'Ahmed', email: 'ahmed@example.com' },
  ];

  // 🟢 CREATE
  create(user: any) {
    const newUser = { id: Date.now(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  // 🟢 READ all
  findAll() {
    return this.users;
  }

  // 🟢 READ one
  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // 🟢 UPDATE
  update(id: number, updatedUser: any) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.users[index] = { ...this.users[index], ...updatedUser };
    return this.users[index];
  }

  // 🟢 DELETE
  remove(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const deleted = this.users.splice(index, 1);
    return { message: 'User deleted', deleted };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // Repository Pattern
  ) {}

  // Create user
  async createUser(name: string, email: string, password: string): Promise<User> {
    const newUser = this.usersRepository.create({ name, email, password });
    return this.usersRepository.save(newUser);
  }

  // Read all users
  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Read single user
  async getUserById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // Update user
  async updateUser(id: number, updatedData: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, updatedData);
    return this.getUserById(id);
  }

  // Delete user
  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

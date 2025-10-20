//  users.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // CREATE new user
  async createUser(dto: CreateUserDto): Promise<User> {
    const existing = await this.usersRepository.findOne({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already registered');

    const newUser = this.usersRepository.create(dto);
    return this.usersRepository.save(newUser);
  }

  // READ all users
  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // READ one user by ID
  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  // UPDATE user
  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const user = await this.getUserById(id);
    Object.assign(user, data);
    return this.usersRepository.save(user);
  }

  // DELETE user
  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`User with ID ${id} not found`);
  }

  // Find a user by their email (used for login authentication)
async findByEmail(email: string): Promise<User | null> {
  return this.usersRepository.findOne({ where: { email } });
}



}

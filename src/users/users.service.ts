import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // inject User repository
  ) {}

  //create a new user with hashed password
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    
    //create new user with hashed password
    const user = this.usersRepository.create({
      ...createUserDto,
      password: createUserDto.password,
    });

    // Save to database
    return this.usersRepository.save(user);
  }

  //find all users
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  //find one user by ID
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  //find user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Update user details
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // If password is provided, hash it before saving
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  // Delete user by ID
  async deleteUser(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    
    if (result.affected === 0) {
      return false; // No user found to delete
    }
    return true; // User deleted successfully
  }
}

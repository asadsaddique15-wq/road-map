// 🟢 tasks.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  // CREATE new task
  async createTask(dto: CreateTaskDto): Promise<Task> {
    const user = await this.usersRepository.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const newTask = this.tasksRepository.create({
      title: dto.title,
      description: dto.description,
      user,
    });

    return this.tasksRepository.save(newTask);
  }

  // READ all tasks
  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['user'] });
  }

  // READ one task by ID
  async getTaskById(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  // UPDATE task
  async updateTask(id: number, data: Partial<Task>): Promise<Task> {
    const task = await this.getTaskById(id);
    Object.assign(task, data);
    return this.tasksRepository.save(task);
  }

  // DELETE task
  async deleteTask(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Task with ID ${id} not found`);
  }
}

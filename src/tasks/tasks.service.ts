import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // CREATE Task
  async createTask(title: string, description: string, user: User): Promise<Task> {
    const newTask = this.tasksRepository.create({ title, description, user });
    return this.tasksRepository.save(newTask);
  }

  // READ All Tasks
  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['user'] });
  }

  // READ Task by ID
  async getTaskById(id: number): Promise<Task | null> {
    return this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
  }

  // UPDATE Task
  async updateTask(id: number, updatedData: Partial<Task>): Promise<Task | null> {
    await this.tasksRepository.update(id, updatedData);
    return this.getTaskById(id);
  }

  // DELETE Task
  async deleteTask(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}

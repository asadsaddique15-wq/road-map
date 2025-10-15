import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // ✅ CREATE
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  // ✅ READ ALL
  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // ✅ READ ONE
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  // ✅ UPDATE
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  // ✅ DELETE
  async remove(id: number): Promise<{ message: string }> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
    return { message: `Task with ID ${id} deleted successfully` };
  }
}

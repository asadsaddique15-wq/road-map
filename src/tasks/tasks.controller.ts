import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/create')
  create(
    @Body() body: { title: string; description: string; userId: number },
  ): Promise<Task> {
    const { title, description, userId } = body;
    // For now, we'll just create a dummy user reference (later link actual user)
    const user = { id: userId } as any;
    return this.tasksService.createTask(title, description, user);
  }

  @Get('/fetchall')
  getAll(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getById(@Param('id') id: number): Promise<Task | null> {
    return this.tasksService.getTaskById(id);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() body: Partial<Task>,
  ): Promise<Task | null> {
    return this.tasksService.updateTask(id, body);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}

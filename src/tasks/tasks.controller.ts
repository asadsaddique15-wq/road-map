import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // 🟢 CREATE new task
  @Post('/create')
  async createTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  //  READ all tasks
  @Get('/fetchall')
  async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  // READ one task by ID
  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  //  UPDATE task
  @Put('/:id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<CreateTaskDto>,
  ) {
    return this.tasksService.updateTask(id, data);
  }

  //  DELETE task
  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}

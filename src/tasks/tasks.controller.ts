import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('Tasks') 
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  //creating new task
  @Post('')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  async createTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  //read all tasks
  @Get('')
  @ApiOperation({ summary: 'Get all tasks' })
  async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  // get one task
  @Get('/:id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', example: 1 })
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  //update any task
  @Put('/:id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', example: 1 })
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<CreateTaskDto>,
  ) {
    return this.tasksService.updateTask(id, data);
  }

  // delete task
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id' })
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}

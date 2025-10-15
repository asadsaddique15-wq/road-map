import { Controller,Get,Post,Body,Param,Put,Delete,} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/create')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('/fetchall')
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('/fetch/:id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}

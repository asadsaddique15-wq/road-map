import { Controller,Get,Post,Body,Param,Put,Delete,} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ✅ CREATE
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // ✅ READ (all)
  @Get('/fetchall')
  findAll() {
    return this.usersService.findAll();
  }

  // ✅ READ (one)
  @Get('/fetch/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // ✅ UPDATE
  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // ✅ DELETE
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

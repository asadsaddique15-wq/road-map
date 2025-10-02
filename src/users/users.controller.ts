import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('/users')
export class UsersController {
    @Get('/getallusers')
    findAll() {
        return ['alli', 'ahmed', 'ashir'];
    }
    @Post("createUsers")
    create(@Body() body: any) {
        return {
            message: 'User created successfully',
            data: body,
        };
    }
 }
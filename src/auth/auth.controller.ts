// import { Controller, Post, Body, UseGuards, Get, Request, Param, Put, Delete, BadRequestException, ForbiddenException, }
//   from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './jwt-auth.guard';
// import { RolesGuard } from './roles.guard';
// import { Roles } from './roles.decorator';
// import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

// import { UsersService } from '../users/users.service';


// @ApiTags('Authentication') //group name in Swagger UI
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService,
//     private readonly usersService: UsersService,
//   ) { }

//   //register new user
//   @Post('')
//   @ApiOperation({ summary: 'Register a new user' })
//   @ApiResponse({ status: 201, description: 'User registered successfully' })
//   @ApiBody({
//     schema: {
//       example: {
//         name: '',
//         email: '',
//         password: '',
//         phoneNumber: '',
//         role: '',
//       },
//     },
//   })

//   async register(
//     @Body() body: { name: string; email: string; password: string; phoneNumber?: string; role?: string },
//   ) {
//     if (!body.name || !body.email || !body.password) {
//       throw new BadRequestException('Name, email, and password are required');
//     }
//     return this.authService.register(body.name, body.email, body.password, body.phoneNumber, body.role);
//   }

//   //login existing user
//   @Post('login')
//   @ApiOperation({ summary: 'Login existing user' })
//   @ApiResponse({ status: 200, description: 'Login successful, returns JWT token' })
//   @ApiBody({
//     schema: {
//       example: {
//         email: '',
//         password: '',
//       },
//     },
//   })
//   async login(@Body() body: { email: string; password: string }) {
//     if (!body.email || !body.password) {
//       throw new BadRequestException('Email and password are required');
//     }
//     return this.authService.login(body.email, body.password);
//   }

//   //only admins can get all users
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('Admin')
//   @Get('')
//   async getAllUsers() {
//     //call service to get all users
//     return this.usersService.findAll();
//   }


//   //protected route
//   @UseGuards(JwtAuthGuard)
//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Get current user profile (Protected)' })
//   @Get('token')
//   getProfile(@Request() req) { 
//     return { message: 'Protected route accessed!', user: req.user };
//   }

//   //admin-only route
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('Admin')
//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Get admin data (Admin only)' })
//   @ApiResponse({ status: 200, description: 'Access granted to Admin' })
//   @Get('admin')
//   getAdminData(@Request() req) {
//     return { message: 'Welcome Admin! You have special access.', user: req.user };
//   }

//   //update user (Admin or self)
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('Admin', 'User')
//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Update user (Admin or same user)' })
//   @ApiParam({ name: 'id', example: 1 })
//   @Put(':id')
//   async updateUser(@Param('id') id: number, @Body() body: any, @Request() req) {
//     if (req.user.role !== 'Admin' && req.user.userId !== +id) {
//       throw new ForbiddenException('You can only update your own account');
//     }
//     return this.authService.updateUser(id, body);
//   }

//   //delete user (Admin only)
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('Admin')
//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Delete user (Admin only)' })
//   @ApiParam({ name: 'id', example: 1 })
//   @Delete(':id')
//   async deleteUser(@Param('id') id: number) {
//     return this.authService.deleteUser(id);
//   }

//     //user by id only
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('Admin')
//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Get a single user by ID (Admin only)' })
//   @ApiParam({ name: 'id', example: 1 })
//   @Get(':id')
//   async getUserById(@Param('id') id: number) {
//     return this.usersService.findOne(id);
//   }
// }
import {Controller,Post,Body,UseGuards,Get,Request,Param,Put,Delete,BadRequestException,ForbiddenException,
                         NotFoundException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import {ApiBearerAuth,ApiTags,ApiOperation,ApiResponse,ApiParam,ApiBody,} from '@nestjs/swagger';
import { UsersService } from '../users/users.service';

@ApiTags('Authentication') //swagger group name
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // Register a new user
  @Post('')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiBody({
    schema: {
      example: {
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: '',
      },
    },
  })
  async register(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      phoneNumber?: string;
      role?: string;
    },
  ) {
    try {
      if (!body.name || !body.email || !body.password) {
        throw new BadRequestException('Name, email, and password are required');
      }

      return await this.authService.register(body.name,body.email,body.password,body.phoneNumber,body.role, );
    } catch (error) {
      throw error;
    }
  }

  //login existing user
  @Post('login')
  @ApiOperation({ summary: 'Login existing user' })
  @ApiResponse({ status: 200, description: 'Login successful, returns JWT token' })
  @ApiBody({
    schema: {
      example: {
        email: '',
        password: '',
      },
    },
  })
  async login(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      throw new BadRequestException('Email and password are required');
    }
    return this.authService.login(body.email, body.password);
  }

  //getting all users
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all users returned' })
  @Get('')
  async getAllUsers() {
    return this.usersService.findAll();
  }

  //get current user profile
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile (Protected)' })
  @Get('token')
  getProfile(@Request() req) {
    return { message: 'Protected route accessed!', user: req.user };
  }

  //get admin data (Admin only)

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get admin data (Admin only)' })
  @ApiResponse({ status: 200, description: 'Access granted to Admin' })
  @Get('admin')
  getAdminData(@Request() req) {
    return { message: 'Welcome Admin! You have special access.', user: req.user };
  }

  //get a single user by ID (Admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a single user by ID (Admin only)' })
  @ApiParam({ name: 'id', example: 1 })
  @Get('users/:id')
  async getUserById(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  //update user (Admin or same user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'User')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user (Admin or same user)' })
  @ApiParam({ name: 'id', example: 1 })
   @Put('users/:id')
  async updateUser(@Param('id') id: number, @Body() body: any, @Request() req) {
    // allow Admin or same user only
    if (req.user.role !== 'Admin' && req.user.userId !== +id) {
      throw new ForbiddenException('You can only update your own account');
    }

    if (!body || Object.keys(body).length === 0) {
      throw new BadRequestException('No fields provided for update');
    }

    return this.authService.updateUser(id, body);
  }

  //Delete user (Admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user (Admin only)' })
  @ApiParam({ name: 'id', example: 1 })
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }
}

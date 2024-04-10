import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
// import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './users.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto ) {
    return this.usersService.createUser(userDto);
  }
  // @ApiOperation({summary: 'Get all users'})
  // @ApiResponse({status: 200, type: [User]})
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
}

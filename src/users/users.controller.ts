import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { CreateTlgUserDto } from './dto/create-tlguser.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StatusUserDto } from './dto/status-user.dto';
import { KarmaUserDto } from './dto/karma-user.dto';
import { User } from './users.model';

@ApiTags('Users controllers: ')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Create Telegram user'})
  // @ApiResponse({status: 200, type: [User]})
  @Post('/create')
  create(@Body() userDto: CreateTlgUserDto ) {
    return this.usersService.createTlgUser(userDto);
  }

  @ApiOperation({summary: 'Add a user to Telegram chat'})
  @Post('/addchat')
  addChat(@Body() userDto: StatusUserDto) {
    return this.usersService.addChat(userDto);
  }

  @ApiOperation({summary: 'Remove a user from Telegram chat'})
  @Post('/removechat')
  removeChat(@Body() userDto: StatusUserDto) {
    return this.usersService.removeChat(userDto);
  }

  @ApiOperation({summary: 'Remove a user from Telegram chat'})
  @Post('/restrict')
  restrictUser(@Body() userDto: StatusUserDto) {
    return this.usersService.restrictUser(userDto);
  }

  @ApiOperation({summary: 'Change karma user from Telegram chat'})
  @Post('/karmauser')
  karmaUser(@Body() userDto: KarmaUserDto) {
    return this.usersService.updateKarmaUser(userDto);
  }

  @ApiOperation({summary: 'Get all users'})
  @ApiResponse({status: 200, type: [User]})
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({summary: 'Get user by Telegram userID'})
  @ApiResponse({status: 200, type: User})
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.usersService.getToUserByTlgID(value);
  }
}

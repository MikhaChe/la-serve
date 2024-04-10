import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async login(userDto: CreateUserDto) {
    const user=await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByName(userDto.username);
    if(candidate) {
      throw new HttpException('User have the same name already exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({...userDto, password: hashPassword});
    return this.generateToken(user);
  }

  private async validateUser(userDto: CreateUserDto) {
    let pswEquals;
    const user = await this.userService.getUserByName(userDto.username);
    if (user) {
      pswEquals = await bcrypt.compare(userDto.password, user.password);
    } else {
      pswEquals = false;
    }
    
    if(user && pswEquals) {
      return user;
    }
    throw new UnauthorizedException({message: 'Incorect username or password'});
  }

  private async generateToken(user: User) {
    const payload = {username: user.username, id: user.id, roles: user.roles};
    return {
      token: this.jwtService.sign(payload),
    }
  }
}

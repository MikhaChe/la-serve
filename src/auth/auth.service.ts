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
    if(!userDto.password) {
      throw new HttpException('User don\'t have any password', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    
    const user = await this.userService.createUser({...userDto, password: hashPassword});

    return this.generateToken(user);
  }

  private async validateUser(userDto: CreateUserDto) {

    const user = await this.userService.findUserByTlgID(userDto.userID);
    const validPassword = await this.userService.getUserPasswordByTlgID(userDto.userID);
    let pswEquals;
    if (user && validPassword) {
      pswEquals = await bcrypt.compare(userDto.password, validPassword);
    } else {
      pswEquals = false;
    }
    
    if(user && pswEquals) {
      return user;
    }
    throw new UnauthorizedException({message: 'Incorect username or password'});
  }

  private async generateToken(user: User) {
    const payload = {userID: user.userID, id: user.id, roles: user.roles};
    return {
      token: this.jwtService.sign(payload),
    }
  }
}

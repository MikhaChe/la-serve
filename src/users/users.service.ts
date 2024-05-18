import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { ChatsService } from '../chats/chats.service';
import { UserChats } from '../chats/user-chats.model';
import { Chat } from '../chats/chats.model';
import { StatesService } from '../states/states.service';
import { StatusUserDto } from './dto/status-user.dto';
import { UserExt } from './user.ext.model';
// import { CreateUserExtDto } from './dto/create-userExt.dto';
import { UserTlgExt } from './user.tlg-ext.model';
import { CreateTlgUserDto } from './dto/create-tlguser.dto';
import { KarmaUserDto } from './dto/karma-user.dto';


@Injectable()
export class UsersService {

  constructor( @InjectModel(User) private userRepository: typeof User, @InjectModel(UserExt) private userExtRepository: typeof UserExt, @InjectModel(UserTlgExt) private userTlgExtRepository: typeof UserTlgExt, @InjectModel(Chat) private chatRepository: typeof Chat, @InjectModel(UserChats) private userChatsRepository: typeof UserChats,private chatsService: ChatsService, private rolesService: RolesService,  private stateService: StatesService) {}

  async createUser(dto: CreateUserDto) {
    const candidate = await this.findUserByTlgID(dto.userID);
    if (candidate) {
      throw new HttpException('User with this ID already exists', HttpStatus.CONFLICT);      
    }

    const user = await this.userRepository.create(dto);
    if(dto.email || dto.password){
      const userExt = await this.userExtRepository.create({email: dto.email, password: dto.password, userId: user.id});
    }
    const role = await this.rolesService.getRoleByValue("USER");
    await user.$set('roles', [role.id]);

    return user;
    
  }

  async createTlgUser(dto: CreateTlgUserDto) {

    const user = await this.createUser({userID: dto.userID, username: dto.username, name: dto.name, karma: dto.karma, email: '', password: ''});
    if(dto.surname) {
      const userExt = await this.userTlgExtRepository.create({surname: dto.surname, userId: user.id});
    }
    const userUpdate = await this.findUserByTlgID(dto.userID);
    return userUpdate;
  }

  async addChat(dto: StatusUserDto) {
    
    const user = await this.findUserByTlgID(dto.userID); 
    if(!user){
      throw new HttpException('User with this ID not found.', HttpStatus.BAD_REQUEST);
    }
    const chat = await this.chatsService.getChatByTlgID(dto.chatID);
    if (!chat) {
      throw new HttpException('There is no chat with this ID.', HttpStatus.BAD_REQUEST);
    }
    const validChat = await this.getUserInChatByTlgID(dto.userID, dto.chatID)
    if (validChat) {
      throw new HttpException('The user is already a member of this chat.', HttpStatus.BAD_REQUEST);
    }
    const author = await this.findUserByTlgID(dto.authorID);
    if(!author){
      throw new HttpException('The author is not a User.', HttpStatus.BAD_REQUEST);
    }
    if(dto.status !== 1) {
      throw new HttpException('Incorrect value of the \"Status\" field', HttpStatus.BAD_REQUEST);
    }
    const state = await this.stateService.createState(
      {userId: user.id, 
        chatId: chat.id,  
        status: dto.status, 
        reason: dto.reason, 
        authorId: author.id
      }
    );
    await user.$add('states', [state.id]);
    const userChats = await this.userChatsRepository.findOne({where: {stateId: state.id}, include: {all: true}});
    userChats.setDataValue('chatId', chat.id);
    userChats.save();

    return {
      userID: dto.userID,
      chatID: dto.chatID,
      state
    }; 
  }

  async removeChat(dto: StatusUserDto) {
    const user = await this.findUserByTlgID(dto.userID);
    if(!user){
      throw new HttpException('User with this ID not found.', HttpStatus.BAD_REQUEST);
    }
    const validChat = await this.getUserInChatByTlgID(dto.userID, dto.chatID)
    if (!validChat) {
      throw new HttpException('The user is not a member of this chat.', HttpStatus.BAD_REQUEST);
    }
    const author = await this.findUserByTlgID(dto.authorID);
    if(!author){
      throw new HttpException('The author is not a User.', HttpStatus.BAD_REQUEST);
    }
    if(dto.status < 3) {
      throw new HttpException('Incorrect value of the "Status" field', HttpStatus.BAD_REQUEST);
    }

    user.$remove('chats', validChat.id)
    const state = await this.stateService.createState(
      {userId: user.id, 
        chatId: validChat.id,  
        status: dto.status, 
        reason: dto.reason, 
        authorId: author.id
      }
    );
    
    return {
      userID: dto.userID,
      chatID: dto.chatID,
      state
    }; 
  }

  async restrictUser(dto: StatusUserDto) {
    const user = await this.findUserByTlgID(dto.userID);
    if(!user){
      throw new HttpException('User with this ID not found.', HttpStatus.BAD_REQUEST);
    }
    const validChat = await this.getUserInChatByTlgID(dto.userID, dto.chatID)
    if (!validChat) {
      throw new HttpException('The user is not a member of this chat.', HttpStatus.BAD_REQUEST);
    }
    const author = await this.findUserByTlgID(dto.authorID);
    if(!author){
      throw new HttpException('The author is not a User.', HttpStatus.BAD_REQUEST);
    }
    if(dto.status === 3 || dto.status === 4) {
      throw new HttpException('Incorrect value of the "Status" field', HttpStatus.BAD_REQUEST);
    }

    const state = await this.stateService.createState(
      {userId: user.id, 
        chatId: validChat.id,  
        status: dto.status, 
        reason: dto.reason, 
        authorId: author.id
      }
    );
    if(!state) {
      throw new HttpException('Uups!.. Something went wrong!', HttpStatus.BAD_REQUEST);
    }

    return {
      userID: dto.userID,
      chatID: dto.chatID,
      state
    }
  }

  async updateKarmaUser(dto: KarmaUserDto) {
    const user = await this.findUserByTlgID(dto.userID);
    if(!user){
      throw new HttpException('User with this ID not found.', HttpStatus.BAD_REQUEST);
    }
    user.setDataValue('karma', dto.karma);
    user.save();

    return {
      userID: dto.userID,
      karma: user.karma,
    }
  }

  async getToUserByTlgID (userID: string) {
    const user = await this.userRepository.findOne({where: {userID}, include: [{model: Chat,}]});
    if(!user){
      throw new HttpException('User with this ID not found.', HttpStatus.BAD_REQUEST);
    }
    return user;
  }


  // Technical functions!!! Don't use them on endpoints

  async getUserInChatByTlgID(userID: string, chatID: string) {
    const user = await this.findUserByTlgID(userID);
    const validChat = user.chats.find(chat => chat.dataValues.chatID === chatID);

    return validChat;
  } 
  
  async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all: true}});
    return users;
  }

  async findUserByTlgID(userID: string) {
    const user = await this.userRepository.findOne({where: {userID}, include: {all: true}});
    return user;
  }

  async getUserByID(userId: number) {
    const user = await this.userRepository.findByPk (userId, {include: {all: true}});
    return user;
  }

  async getUserPasswordByTlgID(userID: string) {
    const user = await this.userRepository.findOne({where: {userID}, include: {model: UserExt}});
    if(!user.user_ext) {
      return 0;
    } else {
      return user.user_ext.password;
    }    
  }

}




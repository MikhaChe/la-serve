import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chats.model';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateStatusDto } from './dto/update-entry.dto';
import { UserChats } from './user-chats.model';


@Injectable()
export class ChatsService {

  constructor( @InjectModel(Chat) private chatRepository: typeof Chat, @InjectModel(UserChats) private userChatRepository: typeof UserChats,  ) {}

  async createChat(dto: CreateChatDto) {
    const chat = await this.chatRepository.create(dto); 
    return chat;
  }

  async getChatByTlgID (chatID: string) {
    const chat = await this.chatRepository.findOne({where: {chatID}, include: {all: true}});
    return chat;
  }

  async getChatByID (chatId: number) {
    const chat = await this.chatRepository.findByPk(chatId, {include: {all: true}});
    return chat; 
  }

  
  async getRowByStateID (stateId: number) {
    const userChats = await this.userChatRepository.findOne({where: {stateId}, include: {all: true}});
    return userChats;
  }

  async findEntry(dto: UpdateStatusDto) {
    // const chat = await this.getChatByID(String(dto.chatID));
    // const user = await this.usersService.getUserByUsrID(dto.userID);
    // await chat.$set('users', user.id);
    // const chatUpdate = await this.getChatByID(String(dto.chatID));
    // return chatUpdate;
  }
}

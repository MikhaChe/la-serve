import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('chats')
export class ChatsController {
  constructor(private chatService: ChatsService) {}

  @Post() 
  create(@Body() dto: CreateChatDto) {
    return this.chatService.createChat(dto);
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.chatService.getChatByTlgID(value); 
  }

}

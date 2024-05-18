import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { Chat } from '../chats/chats.model';
import { User } from '../users/users.model';
import { State } from './states.model';
import { UserChats } from '../chats/user-chats.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [StatesService],
  controllers: [StatesController],
  imports: [
    SequelizeModule.forFeature([User, State, Chat, UserChats]),
    AuthModule
  ],
  exports: [StatesService]

})
export class StatesModule {}

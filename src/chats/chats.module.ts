import { Module} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './chats.model';
import { UserChats } from './user-chats.model';
import { User } from '../users/users.model';
import { State } from '../states/states.model';
import { AuthModule } from '../auth/auth.module';



@Module({
  providers: [ChatsService],
  controllers: [ChatsController],
  imports: [
    SequelizeModule.forFeature([Chat, User, UserChats, State]),
    AuthModule
  ],
  exports: [ChatsService]
})
export class ChatsModule {}

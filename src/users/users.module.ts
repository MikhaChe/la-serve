import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { UserExt } from './user.ext.model';
import { Chat } from '../chats/chats.model';
import { UserChats } from '../chats/user-chats.model';
import { ChatsModule } from '../chats/chats.module';
import { StatesModule } from 'src/states/states.module';
import { UserTlgExt } from './user.tlg-ext.model';




@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, UserExt, UserTlgExt, Role, UserRoles, Chat, UserChats]),
    RolesModule,
    ChatsModule,
    StatesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService,   
  ]
})
export class UsersModule {}

import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
// import { Col } from "sequelize/types/utils";
import { Chat } from "../chats/chats.model";
import { UserChats } from "../chats/user-chats.model";
import { State } from "../states/states.model";
import { UserExt } from "./user.ext.model";
import { UserTlgExt } from "./user.tlg-ext.model";


interface UserCreationAttrs {
  userID: string;
  name: string;
}

@Table({tableName: 'users', createdAt: 'timestamp', updatedAt: false})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: '1', description: 'Unique ID for database. AutoIncrement, PrimaryKey'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: '1009576118', description: 'Unique Telegram UserID. AllowNull: false'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  userID: string;

  @ApiProperty({example: '@vasya', description: 'Username in Telegram'})
  @Column({type: DataType.STRING, allowNull: true})
  username: string;

  @ApiProperty({example: 'Vasiliy', description: 'Name of person'})
  @Column({type: DataType.STRING, allowNull: true})
  name: string;

  @ApiProperty({example: 10, description: 'Accumulated user karma. Type: INTEGER'})
  @Column({type: DataType.INTEGER, allowNull: false})
  karma: number;

  @ApiProperty({example: 'ROLES', description: 'User Roles. Has many. Type: Role'})
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @ApiProperty({example: 'CHATS', description: 'User Chats. Has many. Type: Chat'})
  @BelongsToMany(() => Chat, () => UserChats)
  chats: Chat[];

  @ApiProperty({example: 'STATES', description: 'User State. Has many. Type: Status'})
  @BelongsToMany(() => State, () => UserChats)
  states: State[];

  @HasOne(() => UserExt)
  user_ext: UserExt;

  @HasOne(() => UserTlgExt)
  user_tlgext: UserTlgExt;
}
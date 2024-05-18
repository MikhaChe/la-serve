//import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { UserChats } from "./user-chats.model";
import { State } from "../states/states.model";

interface ChatsCreationAttrs {
  chatID: string;
  description: string;
}

@Table({tableName: 'chats', createdAt: 'timestamp', updatedAt: false})
export class Chat extends Model<Chat, ChatsCreationAttrs> {
  //@ApiProperty({example: '1', description: 'Unique ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  //@ApiProperty({example: 'ADMIN', description: 'User role value'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  chatID: string;

  //@ApiProperty({example: 'Administrator', description: 'Role descrition'})
  @Column({type: DataType.STRING, allowNull: true})
  description: string;

  @BelongsToMany(() => State, () => UserChats)
  states: State[];

  @BelongsToMany(() =>User, () => UserChats)
  users: User[];
}
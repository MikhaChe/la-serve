//import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Chat } from "./chats.model";
import { State } from "../states/states.model";

@Table({tableName: 'user_chats', createdAt: 'timestamp', updatedAt: false})
export class UserChats extends Model<UserChats> {
  
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => Chat)
  @Column({type: DataType.INTEGER})
  chatId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @ForeignKey(() => State)
  @Column({type: DataType.INTEGER})
  stateId: number;
  // @BelongsTo(() => State)
  // state: State; 

}
//import { ApiProperty } from "@nestjs/swagger";
// import { Col } from "sequelize/types/utils";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Chat } from "../chats/chats.model";
import { User } from "../users/users.model";


interface StateCreationAttrs {
  userId: number;
  chatId: number;
  authorId: number;
  status: number;
  reason: string;
}

@Table({tableName: 'states'})
export class State extends Model<State, StateCreationAttrs> {
  //@ApiProperty({example: '1', description: 'Unique ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  authorId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Chat)
  @Column({type: DataType.INTEGER})
  chatId: number;

  @BelongsTo(() => Chat)
  chat: Chat;

  //@ApiProperty({example: 'uservasya', description: 'User name'})
  @Column({type: DataType.INTEGER})
  status: number;

  //@ApiProperty({example: 'uservasya', description: 'User name'})
  @Column({type: DataType.STRING})
  reason: string;
}
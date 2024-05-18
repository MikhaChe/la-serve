import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "./users.model";

interface UserTlgExtCreationAttr {
  surname: string;
  userId: number;
}

@Table({tableName: 'user_tlgext', createdAt: false, updatedAt: false})
export class UserTlgExt extends Model<UserTlgExt, UserTlgExtCreationAttr> {
  //@ApiProperty({example: '1', description: 'Unique ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;
  @BelongsTo(() => User)
  users: User;

  //@ApiProperty({example: 'uservasya', description: 'User name'})
  @Column({type: DataType.STRING, allowNull: true})
  surname: string;




}
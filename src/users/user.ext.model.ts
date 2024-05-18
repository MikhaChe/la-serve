import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "./users.model";

interface UserExtCreationAttr {
  email: string;
  password: string;
  userId: number;
}

@Table({tableName: 'user_ext', createdAt: false, updatedAt: false})
export class UserExt extends Model<UserExt, UserExtCreationAttr> {
  //@ApiProperty({example: '1', description: 'Unique ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;
  @BelongsTo(() => User)
  users: User;

  //@ApiProperty({example: 'uservasya', description: 'User name'})
  @Column({type: DataType.STRING, unique: true, allowNull: true})
  email: string;

  //@ApiProperty({example: 'uservasya', description: 'User name'})
  @Column({type: DataType.STRING, allowNull: true})
  password: string;




}
//import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  //@ApiProperty({example: '1', description: 'Unique ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  //@ApiProperty({example: 'uservasya', description: 'User name'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  username: string;

  //@ApiProperty({example: '12345', description: 'User password'})
  @Column({type: DataType.STRING, allowNull: true})
  password: string;

  //@ApiProperty({example: 'true', description: 'Baned or allowed'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean; 

  //@ApiProperty({example: 'Ban issued for flooding', description: 'Cause for ban'})
  @Column({type: DataType.STRING, allowNull: true})
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
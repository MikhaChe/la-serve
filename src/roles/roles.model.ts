//import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { UserRoles } from "./user-roles.model";

interface RolesCreationAttrs {
  value: string;
  description: string;
}

@Table({tableName: 'roles', createdAt: false, updatedAt: false})
export class Role extends Model<Role, RolesCreationAttrs> {
  //@ApiProperty({example: '1', description: 'Unique ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  //@ApiProperty({example: 'ADMIN', description: 'User role value'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  //@ApiProperty({example: 'Administrator', description: 'Role descrition'})
  @Column({type: DataType.STRING, allowNull: true})
  description: string;

  @BelongsToMany(() =>User, () => UserRoles)
  users: User[];
}
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: '1009576118', description: 'Unique Telegram UserID. AllowNull: false'})
  readonly userID: string;

  @ApiProperty({example: '@ALBi_drejtor_bot', description: 'Username in Telegram'})
  readonly username: string;
  
  @ApiProperty({example: 'ALBi Robot', description: 'Name of person'})
  readonly name: string;

  @ApiProperty({example: 2, description: 'Accumulated user karma. AllowNull: false, Type: INTEGER'})
  readonly karma:  number;

  @ApiProperty({example: 'email@email.net', description: 'AllowNull: true'})
  readonly email: string;

  @ApiProperty({example: 'Qwerty*567_', description: 'AllowNull: false'})
  readonly password:  string;
}



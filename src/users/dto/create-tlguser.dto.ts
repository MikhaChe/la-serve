import { ApiProperty } from "@nestjs/swagger";

export class CreateTlgUserDto {
  @ApiProperty({example: '1009576118', description: 'Unique Telegram UserID. AllowNull: false'})
  readonly userID: string;

  @ApiProperty({example: '@vasya', description: 'Username in Telegram'})
  readonly username: string;
  
  @ApiProperty({example: 'Vasiliy', description: 'Name of person'})
  readonly name: string;

  @ApiProperty({example: 'Petrov', description: 'Surname of person'})
  readonly surname:  string;

  @ApiProperty({example: 2, description: 'Accumulated user karma. Type: INTEGER'})
  readonly karma:  number;
}



import { ApiProperty } from "@nestjs/swagger";


export class KarmaUserDto {
  @ApiProperty({example: '1009576118', description: 'Unique Telegram UserID. AllowNull: false'})
  readonly userID: string;
  @ApiProperty({example: 2, description: 'Accumulated user karma. Type: INTEGER'})
  readonly karma: number;  
}



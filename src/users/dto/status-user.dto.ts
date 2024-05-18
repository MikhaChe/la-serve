import { ApiProperty } from "@nestjs/swagger";

export class StatusUserDto {
  @ApiProperty({example: '1009576118', description: 'Unique Telegram UserID. AllowNull: false'})
  readonly userID: string;
  @ApiProperty({example: '1002006827831', description: 'Unique Telegram ChatID. AllowNull: false'})
  readonly chatID: string;
  @ApiProperty({example: 1, description: '1 - MEMBER, >10 - RESTRICTED, 3 - KICKED, 4 - LEFT. Type: INTEGER'})
  readonly status: number;
  @ApiProperty({example: 'Enter the chat', description: 'Reason for changing user status in chat. Recommended values: ENTER / BANED / KICKED / LEFT'})
  readonly reason: string; 
  @ApiProperty({example: '1009576118', description: 'Unique Telegram UserID. Author of changes in Telegram chat user status'})
  readonly authorID: string; 
}



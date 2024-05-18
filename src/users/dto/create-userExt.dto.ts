// import { ApiProperty } from "@nestjs/swagger";

export class CreateUserExtDto {
  // @ApiProperty({example: '111111111', description: 'User ID in Telegram'})
  readonly userId: number;

  // @ApiProperty({example: '111111111', description: 'User ID in Telegram'})
  readonly email: string;
  
}



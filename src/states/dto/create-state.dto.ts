export class CreateStateDto {
  // @ApiProperty({example: '111111111', description: 'User ID in Telegram'})
  readonly userId: number;

  readonly chatId: number;

  readonly status: number;

  readonly reason: string;

  readonly authorId: number;
}
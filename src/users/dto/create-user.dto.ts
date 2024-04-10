// import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  // @ApiProperty({example: 'uservasya', description: 'User name'})
  readonly username: string;
  // @ApiProperty({example: '12345', description: 'New password'})
  readonly password:  string;
}
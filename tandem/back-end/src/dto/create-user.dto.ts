import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the User',
  })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the User',
    required: false,
  })
  name?: string;
}

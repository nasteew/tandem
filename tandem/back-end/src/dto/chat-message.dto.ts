import { IsNotEmpty, IsString } from 'class-validator';

export class ChatDto {
  @IsString()
  @IsNotEmpty({ message: 'Message cannot be empty' })
  message: string;
}
import { IsString, IsOptional, IsIn } from 'class-validator';

export class ChatDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  conversationId?: string;

  @IsOptional()
  @IsString()
  @IsIn(['junior', 'middle', 'senior'])
  interviewLevel?: string;
}

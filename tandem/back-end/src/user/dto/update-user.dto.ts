import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(4, { message: 'Name must be at least 4 characters long' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email?: string;

  @IsOptional()
  about?: string;
}

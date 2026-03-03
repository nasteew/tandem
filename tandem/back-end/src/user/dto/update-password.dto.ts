import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  oldPassword: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  newPassword: string;
}

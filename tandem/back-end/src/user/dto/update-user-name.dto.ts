import { IsString, MinLength } from 'class-validator';

export class UpdateNameDto {
  @IsString()
  @MinLength(4)
  name: string;
}

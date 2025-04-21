import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 36)
  email: string;
  @IsString()
  @IsNotEmpty()
  @Length(4, 16)
  password: string;
}

import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 72)
  fullname: string;
  @IsString()
  @IsNotEmpty()
  @Length(4, 16)
  password: string;
  @IsString()
  @IsNotEmpty()
  @Length(4, 36)
  email: string;
  @IsString()
  @IsNotEmpty()
  role: string;
}

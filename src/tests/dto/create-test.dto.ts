import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { title } from 'process';

export class CreateTestDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsNotEmpty()
  topicId: number;
}

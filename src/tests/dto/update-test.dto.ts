import { IsNumber, IsString } from 'class-validator';

export class UpdateTestDto {
  @IsString()
  title: string;
  @IsNumber()
  topicId: number;
}

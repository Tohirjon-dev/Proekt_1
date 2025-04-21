import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  subjectId: number;
}

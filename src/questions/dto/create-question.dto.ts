import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;
  @IsNumber()
  testId: number;
}

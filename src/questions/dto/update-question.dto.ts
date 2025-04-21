import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @IsString()
  @IsNotEmpty()
  text: string;
  @IsNumber()
  testId: number;
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin', 'teacher')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    try {
      return await this.questionsService.create(createQuestionDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.questionsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.questionsService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    try {
      return await this.questionsService.update(+id, updateQuestionDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.questionsService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('testAndQuestions/:id')
  async testAndQuestions(@Param('id') id: string) {
    try {
      return await this.questionsService.testAndQuestions(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}

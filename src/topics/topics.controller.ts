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
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Roles('admin', 'teacher')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto) {
    try {
      return await this.topicsService.create(createTopicDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.topicsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.topicsService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ) {
    try {
      return await this.topicsService.update(+id, updateTopicDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.topicsService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  @Get('subjectByTopics/:id')
  async getSubjectByTopics(@Param('id') id: string) {
    try {
      return this.topicsService.getSubjectByTopics(+id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}

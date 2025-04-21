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
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Roles('admin', 'teacher')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post('create')
  async createSubject(@Body() body: CreateSubjectDto) {
    try {
      return this.subjectsService.createSubject(body);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  @Get()
  async getAll() {
    try {
      return this.subjectsService.getAll();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    try {
      return await this.subjectsService.findById(+id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Patch('/:id')
  async updateById(@Param('id') id: string, @Body() body: UpdateSubjectDto) {
    try {
      return this.subjectsService.updateById(+id, body);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    try {
      return await this.subjectsService.deleteById(+id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}

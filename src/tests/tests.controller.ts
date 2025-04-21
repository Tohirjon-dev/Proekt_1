import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Roles('admin', 'teacher')
@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  async create(@Body() createTestDto: CreateTestDto) {
    try {
      return await this.testsService.create(createTestDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.testsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.testsService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    try {
      return await this.testsService.update(+id, updateTestDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.testsService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('getTopic/:id')
  async getTopicAndTests(@Param('id') id: string) {
    try {
      return await this.testsService.getTopicAndTests(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}

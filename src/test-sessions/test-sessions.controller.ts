import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestSessionsService } from './test-sessions.service';
import { CreateTestSessionDto } from './dto/create-test-session.dto';
import { UpdateTestSessionDto } from './dto/update-test-session.dto';

@Controller('test-sessions')
export class TestSessionsController {
  constructor(private readonly testSessionsService: TestSessionsService) {}

  @Post()
  create(@Body() createTestSessionDto: CreateTestSessionDto) {
    return this.testSessionsService.create(createTestSessionDto);
  }

  @Get()
  findAll() {
    return this.testSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testSessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestSessionDto: UpdateTestSessionDto) {
    return this.testSessionsService.update(+id, updateTestSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testSessionsService.remove(+id);
  }
}

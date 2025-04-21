import { Injectable } from '@nestjs/common';
import { CreateTestSessionDto } from './dto/create-test-session.dto';
import { UpdateTestSessionDto } from './dto/update-test-session.dto';

@Injectable()
export class TestSessionsService {
  create(createTestSessionDto: CreateTestSessionDto) {
    return 'This action adds a new testSession';
  }

  findAll() {
    return `This action returns all testSessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testSession`;
  }

  update(id: number, updateTestSessionDto: UpdateTestSessionDto) {
    return `This action updates a #${id} testSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} testSession`;
  }
}

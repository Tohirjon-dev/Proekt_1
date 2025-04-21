import { Module } from '@nestjs/common';
import { TestSessionsService } from './test-sessions.service';
import { TestSessionsController } from './test-sessions.controller';

@Module({
  controllers: [TestSessionsController],
  providers: [TestSessionsService],
})
export class TestSessionsModule {}

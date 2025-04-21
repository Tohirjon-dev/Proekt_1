import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, AuthGuard, RolesGuard],
  exports: [QuestionsService],
})
export class QuestionsModule {}

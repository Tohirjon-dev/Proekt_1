import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [TopicsController],
  providers: [TopicsService, AuthGuard, RolesGuard],
  exports: [TopicsService],
})
export class TopicsModule {}

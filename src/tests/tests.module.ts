import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [TestsController],
  providers: [TestsService, AuthGuard, RolesGuard],
  exports: [TestsService],
})
export class TestsModule {}

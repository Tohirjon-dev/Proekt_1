import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [SubjectsController],
  providers: [SubjectsService, AuthGuard, RolesGuard],
  exports: [SubjectsService],
})
export class SubjectsModule {}

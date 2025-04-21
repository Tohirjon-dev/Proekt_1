import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, RolesGuard],
  exports: [UsersService],
})
export class UsersModule {}

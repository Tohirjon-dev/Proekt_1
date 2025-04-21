import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TopicsModule } from './topics/topics.module';
import { TestsModule } from './tests/tests.module';
import { QuestionsModule } from './questions/questions.module';
import { TestSessionsModule } from './test-sessions/test-sessions.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResInterceptor } from './common/interceptors/res.interceptor';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AllConfig from './common/config/index';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    SubjectsModule,
    TopicsModule,
    TestsModule,
    QuestionsModule,
    TestSessionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: AllConfig,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return config.get('jwt_config') as JwtModuleOptions;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResInterceptor,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './user/users.module.js';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard.js';
import { LevelsModule } from './levels/levels.module.js';
import { AiModule } from './ai/ai.module.js';
import { StatsModule } from './statistics/stats.module.js';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    AiModule,
    LevelsModule,
    StatsModule,
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60, limit: 5 }],
    }),
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

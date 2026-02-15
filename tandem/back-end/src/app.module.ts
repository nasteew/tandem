import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma.service.js';
import { AiModule } from './ai/ai.module.js';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AiModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

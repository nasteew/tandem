import { Module } from '@nestjs/common';
import { AiService } from './ai.service.js';
import { AiController } from './ai.controller.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  providers: [AiService, PrismaService],
  controllers: [AiController],
})
export class AiModule {}

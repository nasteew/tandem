import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service.js';
import { LevelsController } from './levels.controller.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  providers: [LevelsService, PrismaService],
  controllers: [LevelsController],
  exports: [LevelsService],
})
export class LevelsModule {}

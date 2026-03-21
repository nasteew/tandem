import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service.js';
import { LevelsController } from './levels.controller.js';

@Module({
  providers: [LevelsService],
  controllers: [LevelsController],
  exports: [LevelsService],
})
export class LevelsModule {}

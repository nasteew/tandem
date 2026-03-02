import { Module } from '@nestjs/common';
import { AiService } from './ai.service.js';
import { AiController } from './ai.controller.js';

@Module({
  providers: [AiService],
  controllers: [AiController],
})
export class AiModule {}

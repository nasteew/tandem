import { Module } from '@nestjs/common';
import { UserStatsWidgetController } from './user-stats-widget.controller.js';
import { UserStatsWidgetService } from './user-stats-widget.service.js';
import { PrismaService } from '../../prisma.service.js';
import { LevelsService } from '../../levels/levels.service.js';

@Module({
  controllers: [UserStatsWidgetController],
  providers: [UserStatsWidgetService, PrismaService, LevelsService],
  exports: [UserStatsWidgetService],
})
export class UserStatsWidgetModule {}

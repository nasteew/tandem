import { Module } from '@nestjs/common';
import { UserStatsWidgetController } from './user-stats-widget.controller.js';
import { UserStatsWidgetService } from './user-stats-widget.service.js';
import { PrismaService } from '../../prisma.service.js';

@Module({
  controllers: [UserStatsWidgetController],
  providers: [UserStatsWidgetService, PrismaService],
  exports: [UserStatsWidgetService],
})
export class UserStatsWidgetModule {}

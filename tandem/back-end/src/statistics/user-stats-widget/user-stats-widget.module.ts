import { Module } from '@nestjs/common';
import { UserStatsWidgetController } from './user-stats-widget.controller.js';
import { UserStatsWidgetService } from './user-stats-widget.service.js';
import { PrismaService } from '../../prisma.service.js';
import { UserLevelProgressModule } from '../user-level-progress/user-level-progress.module.js';

@Module({
  imports: [UserLevelProgressModule],
  controllers: [UserStatsWidgetController],
  providers: [UserStatsWidgetService, PrismaService],
  exports: [UserStatsWidgetService],
})
export class UserStatsWidgetModule {}

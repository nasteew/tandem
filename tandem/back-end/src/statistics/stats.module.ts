import { Module } from '@nestjs/common';
import { UserStatsWidgetModule } from './user-stats-widget/user-stats-widget.module.js';
import { UserStatsGlobalModule } from './user-stats-global/user-stats-global.module.js';

@Module({
  imports: [UserStatsWidgetModule, UserStatsGlobalModule],
})
export class StatsModule {}

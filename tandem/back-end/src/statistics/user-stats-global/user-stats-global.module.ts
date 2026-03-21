import { Module } from '@nestjs/common';
import { UserStatsGlobalController } from './user-stats-global.controller.js';
import { UserStatsGlobalService } from './user-stats-global.service.js';
import { PrismaService } from '../../prisma.service.js';

@Module({
  controllers: [UserStatsGlobalController],
  providers: [UserStatsGlobalService, PrismaService],
  exports: [UserStatsGlobalService],
})
export class UserStatsGlobalModule {}

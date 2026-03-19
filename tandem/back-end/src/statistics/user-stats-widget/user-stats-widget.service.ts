import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';
import { UserLevelProgressService } from '../user-level-progress/user-level-progress.service.js';

@Injectable()
export class UserStatsWidgetService {
  constructor(
    private prisma: PrismaService,
    private progress: UserLevelProgressService,
  ) {}

  async get(userId: number, widget: string) {
    return this.prisma.userStatsWidget.findUnique({
      where: { userId_widget: { userId, widget } },
    });
  }

  async updateBestTime(userId: number, widget: string, timeMs: number) {
    const stats = await this.get(userId, widget);

    if (!stats || stats.bestTimeMs === null || timeMs < stats.bestTimeMs) {
      return this.prisma.userStatsWidget.upsert({
        where: { userId_widget: { userId, widget } },
        update: { bestTimeMs: timeMs },
        create: { userId, widget, bestTimeMs: timeMs },
      });
    }

    return stats;
  }

  async updateLastLevel(userId: number, widget: string, level: number) {
    return this.prisma.userStatsWidget.upsert({
      where: { userId_widget: { userId, widget } },
      update: { lastLevel: level },
      create: { userId, widget, lastLevel: level },
    });
  }

  async getWithProgress(userId: number, widget: string) {
    const stats = await this.get(userId, widget);

    const completedLevels = await this.progress.getProgressCount(
      userId,
      widget,
    );

    return {
      ...stats,
      completedLevels,
    };
  }
}

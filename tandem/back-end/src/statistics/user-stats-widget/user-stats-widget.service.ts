import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';
import { WidgetStatsResponse } from '../types.js';

@Injectable()
export class UserStatsWidgetService {
  constructor(private prisma: PrismaService) {}

  async updateLastLevel(
    userId: number,
    widget: string,
    difficulty: string,
    level: number,
  ) {
    const lastLevelString = `${difficulty}-${level}`;

    return this.prisma.userStatsWidget.upsert({
      where: { userId_widget: { userId, widget } },
      update: { lastLevel: lastLevelString },
      create: { userId, widget, lastLevel: lastLevelString },
    });
  }

  async getWidgetStats(
    userId: number,
    widget: string,
  ): Promise<WidgetStatsResponse> {
    const difficulties = ['easy', 'medium', 'hard'];

    const widgetStats = await this.prisma.userStatsWidget.findUnique({
      where: { userId_widget: { userId, widget } },
      select: {
        lastLevel: true,
      },
    });

    const byDifficulty: Record<string, number> = {};
    let totalCompleted = 0;

    for (const difficulty of difficulties) {
      const count = await this.prisma.userLevelProgress.count({
        where: { userId, widget, difficulty },
      });

      byDifficulty[difficulty] = count;
      totalCompleted += count;
    }

    return {
      widget,
      lastLevel: widgetStats?.lastLevel ?? null,
      totalCompleted,
      byDifficulty,
    };
  }
}

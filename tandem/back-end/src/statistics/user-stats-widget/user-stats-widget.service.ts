import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';
import { WidgetStatsResponse } from '../types.js';
import { LevelsService } from '../../levels/levels.service.js';

@Injectable()
export class UserStatsWidgetService {
  constructor(
    private prisma: PrismaService,
    private levels: LevelsService,
  ) {}

  async saveCurrentLevel(
    userId: number,
    widget: string,
    difficulty: string,
    level: number,
  ) {
    const current = `${difficulty}-${level}`;

    await this.prisma.userStatsWidget.upsert({
      where: { userId_widget: { userId, widget } },
      update: { lastLevel: current },
      create: { userId, widget, lastLevel: current },
    });

    return { lastLevel: current };
  }

  async saveNextLevel(
    userId: number,
    widget: string,
    difficulty: string,
    level: number,
  ) {
    const difficulties = this.levels.getDifficulties(widget);
    const currentDiffIndex = difficulties.indexOf(difficulty);
    const maxLevel = this.levels.getLevelsCount(widget, difficulty);

    let nextLevelString: string | null = null;

    if (level + 1 <= maxLevel) {
      nextLevelString = `${difficulty}-${level + 1}`;
    } else {
      const nextDiff = difficulties[currentDiffIndex + 1];
      nextLevelString = nextDiff ? `${nextDiff}-1` : null;
    }

    await this.prisma.userStatsWidget.upsert({
      where: { userId_widget: { userId, widget } },
      update: { lastLevel: nextLevelString },
      create: { userId, widget, lastLevel: nextLevelString },
    });

    return {
      nextLevel: nextLevelString,
    };
  }

  async updateLastLevel(
    userId: number,
    widget: string,
    difficulty: string,
    level: number,
    mode: 'start' | 'next',
  ) {
    if (mode === 'start') {
      return this.saveCurrentLevel(userId, widget, difficulty, level);
    }

    return this.saveNextLevel(userId, widget, difficulty, level);
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

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';

@Injectable()
export class UserStatsGlobalService {
  constructor(private prisma: PrismaService) {}

  async get(userId: number) {
    return this.prisma.userStatsGlobal.findUnique({
      where: { userId },
      select: {
        streakDays: true,
        lastVisit: true,
        bestTimeMs: true,
      },
    });
  }

  async updateStreak(userId: number) {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const stats = await this.prisma.userStatsGlobal.findUnique({
      where: { userId },
    });

    if (!stats) {
      return this.prisma.userStatsGlobal.create({
        data: {
          userId,
          streakDays: 1,
          lastVisit: today,
        },
      });
    }

    const lastVisit = stats.lastVisit;
    const lastVisitDay = new Date(
      lastVisit.getFullYear(),
      lastVisit.getMonth(),
      lastVisit.getDate(),
    );

    const diffDays = Math.floor(
      (startOfToday.getTime() - lastVisitDay.getTime()) / 86400000,
    );

    let newStreak = stats.streakDays;

    if (diffDays === 1) newStreak++;
    else if (diffDays > 1) newStreak = 1;

    return this.prisma.userStatsGlobal.update({
      where: { userId },
      data: {
        streakDays: newStreak,
        lastVisit: today,
      },
    });
  }

  async updateBestTime(userId: number, timeMs: number) {
    const stats = await this.get(userId);

    if (!stats || stats.bestTimeMs === null || timeMs < stats.bestTimeMs) {
      return this.prisma.userStatsGlobal.upsert({
        where: { userId },
        update: { bestTimeMs: timeMs },
        create: { userId, bestTimeMs: timeMs },
      });
    }

    return stats;
  }
}

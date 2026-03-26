import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';
import { SortField } from '../types.js';
import { Prisma } from '@prisma/client';

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
        completedLevelsCount: true,
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
      return this.prisma.userStatsGlobal.upsert({
        where: { userId },
        update: {},
        create: {
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

    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    const diffDays = Math.floor(
      (startOfToday.getTime() - lastVisitDay.getTime()) / MS_PER_DAY,
    );

    if (diffDays === 0) {
      return stats;
    }

    let newStreak = stats.streakDays;

    if (diffDays === 1) newStreak++;
    else if (diffDays > 1) newStreak = 1;

    return this.prisma.userStatsGlobal.upsert({
      where: { userId },
      update: {
        streakDays: newStreak,
        lastVisit: today,
      },
      create: {
        userId,
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

  async getAllSorted(sortBy: SortField = 'streak') {
    const orderBy = this.getOrderBy(sortBy);

    const users = await this.prisma.userStatsGlobal.findMany({
      select: {
        userId: true,
        streakDays: true,
        bestTimeMs: true,
        completedLevelsCount: true,
        lastVisit: true,
        user: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: sortBy === 'time' ? undefined : orderBy,
    });

    if (sortBy === 'time') {
      return users.sort((a, b) => {
        if (a.bestTimeMs === null) return 1;
        if (b.bestTimeMs === null) return -1;
        return a.bestTimeMs - b.bestTimeMs;
      });
    }

    return users;
  }

  private getOrderBy(
    sortBy: SortField,
  ): Prisma.UserStatsGlobalOrderByWithRelationInput[] {
    switch (sortBy) {
      case 'levels':
        return [
          { completedLevelsCount: 'desc' },
          { streakDays: 'desc' },
          { bestTimeMs: 'asc' },
        ];

      case 'time':
        return [
          { bestTimeMs: 'asc' },
          { completedLevelsCount: 'desc' },
          { streakDays: 'desc' },
        ];

      case 'streak':
      default:
        return [
          { streakDays: 'desc' },
          { completedLevelsCount: 'desc' },
          { bestTimeMs: 'asc' },
        ];
    }
  }
}

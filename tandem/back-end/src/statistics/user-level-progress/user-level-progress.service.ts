import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';

@Injectable()
export class UserLevelProgressService {
  constructor(private prisma: PrismaService) {}

  async completeLevel(userId: number, widget: string, level: number) {
    return this.prisma.userLevelProgress.upsert({
      where: { userId_widget_level: { userId, widget, level } },
      update: {},
      create: { userId, widget, level },
    });
  }

  async getCompletedLevels(userId: number, widget: string) {
    return this.prisma.userLevelProgress.findMany({
      where: { userId, widget },
      orderBy: { level: 'asc' },
    });
  }

  async getProgressCount(userId: number, widget: string) {
    return this.prisma.userLevelProgress.count({
      where: { userId, widget },
    });
  }
}

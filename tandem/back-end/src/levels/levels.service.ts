import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import {
  isAnyLevel,
  isAnySolution,
  Solutions,
  WidgetMeta,
} from './types/index.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class LevelsService {
  private LEVELS_ROOT = join(process.cwd(), 'levels');
  private SOLUTIONS_ROOT = join(process.cwd(), 'solutions');
  constructor(private prisma: PrismaService) {}

  async getLevels(game: string, difficulty: string, userId: number) {
    const dir = join(this.LEVELS_ROOT, game, difficulty);

    if (!existsSync(dir)) {
      throw new NotFoundException('Game or difficulty not found');
    }

    const files = readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] ?? '0', 10);
        const numB = parseInt(b.match(/\d+/)?.[0] ?? '0', 10);
        return numA - numB;
      });

    const completed = await this.getCompletedLevels(userId, game, difficulty);
    const completedSet = new Set(completed.map((l) => l.level));

    return files.map((f) => {
      const id = Number(f.replace('.json', ''));
      return {
        id,
        completed: completedSet.has(id),
      };
    });
  }

  getLevel(game: string, difficulty: string, id: string) {
    const file = join(this.LEVELS_ROOT, game, difficulty, `${id}.json`);

    if (!existsSync(file)) {
      throw new NotFoundException('Level not found');
    }

    const raw: unknown = JSON.parse(readFileSync(file, 'utf8'));

    if (!isAnyLevel(raw)) {
      throw new Error('Invalid level JSON');
    }

    return raw;
  }

  validate(game: string, difficulty: string, id: string, answer: Solutions) {
    const file = join(this.SOLUTIONS_ROOT, game, difficulty, `${id}.json`);

    if (!existsSync(file)) {
      throw new NotFoundException('Solution not found');
    }

    const raw: unknown = JSON.parse(readFileSync(file, 'utf8'));

    if (!isAnySolution(raw)) {
      throw new Error('Invalid solution JSON');
    }
    const correctAnswer = JSON.stringify(answer) === JSON.stringify(raw);

    return { correct: correctAnswer };
  }

  async completeLevel(
    userId: number,
    widget: string,
    difficulty: string,
    level: number,
  ) {
    const existing = await this.prisma.userLevelProgress.findUnique({
      where: {
        userId_widget_difficulty_level: {
          userId,
          widget,
          difficulty,
          level,
        },
      },
    });

    if (existing) {
      return existing;
    }

    const created = await this.prisma.userLevelProgress.create({
      data: {
        userId,
        widget,
        difficulty,
        level,
        completed: true,
      },
    });

    await this.prisma.userStatsGlobal.update({
      where: { userId },
      data: {
        completedLevelsCount: { increment: 1 },
      },
    });

    return created;
  }

  async getCompletedLevels(userId: number, widget: string, difficulty: string) {
    return this.prisma.userLevelProgress.findMany({
      where: { userId, widget, difficulty },
      orderBy: { level: 'asc' },
    });
  }

  getLevelsCount(game: string, difficulty: string): number {
    const dir = join(this.LEVELS_ROOT, game, difficulty);

    if (!existsSync(dir)) {
      throw new NotFoundException('Game or difficulty not found');
    }

    return readdirSync(dir).filter((f) => f.endsWith('.json')).length;
  }

  getDifficulties(widget: string): string[] {
    const dir = join(this.LEVELS_ROOT, widget);

    if (!existsSync(dir)) {
      throw new NotFoundException('Widget not found');
    }

    return readdirSync(dir).filter((name) => {
      const full = join(dir, name);
      return existsSync(full) && !name.includes('.') && !name.startsWith('_');
    });
  }

  getTotalLevels(widget: string): number {
    const difficulties = this.getDifficulties(widget);

    let total = 0;

    for (const diff of difficulties) {
      total += this.getLevelsCount(widget, diff);
    }

    return total;
  }

  getWidgets() {
    const root = this.LEVELS_ROOT;

    if (!existsSync(root)) {
      throw new NotFoundException('Levels folder not found');
    }

    return readdirSync(root).filter((name) => {
      const full = join(root, name);

      return existsSync(full) && !name.includes('.') && !name.startsWith('_');
    });
  }

  getWidgetsData() {
    const metaPath = join(this.LEVELS_ROOT, 'widgets-meta.json');

    if (!existsSync(metaPath)) {
      throw new NotFoundException('widgets-meta.json not found');
    }

    const raw = readFileSync(metaPath, 'utf8');
    const widgets = JSON.parse(raw) as WidgetMeta[];
    return widgets;
  }
}

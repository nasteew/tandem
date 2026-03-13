import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { isAnyLevel } from './types/index.js';

@Injectable()
export class LevelsService {
  private LEVELS_ROOT = join(process.cwd(), 'levels');
  private SOLUTIONS_ROOT = join(process.cwd(), 'solutions');

  getLevels(game: string, difficulty: string) {
    const dir = join(this.LEVELS_ROOT, game, difficulty);

    if (!existsSync(dir)) {
      throw new NotFoundException('Game or difficulty not found');
    }

    return readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => ({ id: f.replace('.json', '') }));
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

  validate(game: string, difficulty: string, id: string, answer: unknown) {
    const file = join(this.SOLUTIONS_ROOT, game, difficulty, `${id}.json`);

    if (!existsSync(file)) {
      throw new NotFoundException('Solution not found');
    }

    const raw: unknown = JSON.parse(readFileSync(file, 'utf8'));

    if (!isAnyLevel(raw)) {
      throw new Error('Invalid solution JSON');
    }

    const correctAnswer = JSON.stringify(answer) === JSON.stringify(raw);

    return { correct: correctAnswer };
  }
}

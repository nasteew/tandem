import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { LevelsService } from './levels.service.js';
import type { Solutions } from './types/index.js';

@Controller('widgets')
export class LevelsController {
  constructor(private readonly levels: LevelsService) {}

  @Get(':game/:difficulty/user/:id')
  getLevels(
    @Param('game') game: string,
    @Param('difficulty') difficulty: string,
    @Param('id') id: number,
  ) {
    return this.levels.getLevels(game, difficulty, id);
  }

  @Get(':game/:difficulty/:id')
  getLevel(
    @Param('game') game: string,
    @Param('difficulty') difficulty: string,
    @Param('id') id: string,
  ) {
    return this.levels.getLevel(game, difficulty, id);
  }

  @Post(':game/:difficulty/:id/validate')
  validate(
    @Param('game') game: string,
    @Param('difficulty') difficulty: string,
    @Param('id') id: string,
    @Body() answer: Solutions,
  ) {
    return this.levels.validate(game, difficulty, id, answer);
  }

  @Post(':userId/:widget/:difficulty/:level')
  complete(
    @Param('userId') userId: string,
    @Param('widget') widget: string,
    @Param('difficulty') difficulty: string,
    @Param('level') level: string,
  ) {
    return this.levels.completeLevel(
      Number(userId),
      widget,
      difficulty,
      Number(level),
    );
  }
}

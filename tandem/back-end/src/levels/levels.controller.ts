import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { LevelsService } from './levels.service.js';
import type { Solutions } from './types/index.js';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Widgets')
@Controller('widgets')
export class LevelsController {
  constructor(private readonly levels: LevelsService) {}

  @Get(':game/:difficulty/user/:id')
  @ApiOperation({
    summary: 'Get list of levels',
    description:
      'Returns all levels for a given widget and difficulty, including completion status for the specified user.',
  })
  @ApiParam({ name: 'game', description: 'Widget (game) ID', type: String })
  @ApiParam({
    name: 'difficulty',
    description: 'Difficulty name',
    type: String,
  })
  @ApiParam({ name: 'id', description: 'User ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of levels with completion flags',
    schema: {
      example: [
        { id: 1, completed: false },
        { id: 2, completed: true },
      ],
    },
  })
  getLevels(
    @Param('game') game: string,
    @Param('difficulty') difficulty: string,
    @Param('id') id: number,
  ) {
    return this.levels.getLevels(game, difficulty, id);
  }

  @Get(':game/:difficulty/:id')
  @ApiOperation({
    summary: 'Get level data',
    description:
      'Returns the JSON structure of a specific level, including instructions, steps, and configuration.',
  })
  @ApiParam({ name: 'game', type: String })
  @ApiParam({ name: 'difficulty', type: String })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Level JSON data',
    schema: {
      example: {
        id: 1,
        title: 'Sort async tasks',
        steps: [],
      },
    },
  })
  getLevel(
    @Param('game') game: string,
    @Param('difficulty') difficulty: string,
    @Param('id') id: string,
  ) {
    return this.levels.getLevel(game, difficulty, id);
  }

  @Post(':game/:difficulty/:id/validate')
  @ApiOperation({
    summary: 'Validate user answer',
    description:
      'Compares the user’s answer with the correct solution stored in the solutions directory. Returns whether the answer is correct.',
  })
  @ApiParam({ name: 'game', type: String })
  @ApiParam({ name: 'difficulty', type: String })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({
    description: 'User answer object',
    schema: {
      example: {
        order: ['microtask', 'macrotask', 'render'],
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Validation result',
    schema: {
      example: { correct: true },
    },
  })
  validate(
    @Param('game') game: string,
    @Param('difficulty') difficulty: string,
    @Param('id') id: string,
    @Body() answer: Solutions,
  ) {
    return this.levels.validate(game, difficulty, id, answer);
  }

  @Post(':userId/:widget/:difficulty/:level')
  @ApiOperation({
    summary: 'Mark level as completed',
    description:
      'Stores the user’s progress by marking a specific level as completed in the database.',
  })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'widget', type: String })
  @ApiParam({ name: 'difficulty', type: String })
  @ApiParam({ name: 'level', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Level completion saved',
    schema: {
      example: {
        userId: 1,
        widget: 'async-sorter',
        difficulty: 'easy',
        level: 3,
        completed: true,
      },
    },
  })
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

  @Get(':widget/difficulties')
  @ApiOperation({
    summary: 'Get widget difficulties',
    description:
      'Returns a list of available difficulty levels for the specified widget.',
  })
  @ApiParam({ name: 'widget', type: String })
  @ApiResponse({
    status: 200,
    description: 'List of difficulties',
    schema: {
      example: ['easy', 'medium', 'hard'],
    },
  })
  getWidgetInfo(@Param('widget') widget: string) {
    return this.levels.getDifficulties(widget);
  }

  @Get(':widget/total')
  @ApiOperation({
    summary: 'Get total number of levels',
    description:
      'Returns the total number of levels across all difficulties for the specified widget.',
  })
  @ApiParam({ name: 'widget', type: String })
  @ApiResponse({
    status: 200,
    description: 'Total level count',
    schema: {
      example: { widget: 'async-sorter', totalLevels: 30 },
    },
  })
  getTotalLevels(@Param('widget') widget: string) {
    return this.levels.getTotalLevels(widget);
  }

  @Get('all')
  @ApiOperation({
    summary: 'Get all widgets',
    description:
      'Returns a list of all available widgets (games). Each folder inside the levels directory represents one widget.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of widgets',
    schema: {
      example: ['async-sorter', 'memory-match', 'math-puzzle'],
    },
  })
  getWidgets() {
    return this.levels.getWidgets();
  }
}

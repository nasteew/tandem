import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserStatsWidgetService } from './user-stats-widget.service.js';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Widget Stats')
@Controller('stats/widget')
export class UserStatsWidgetController {
  constructor(private service: UserStatsWidgetService) {}

  @Get(':userId/:widget')
  @ApiOperation({
    summary:
      'Get widget statistics: last level, best time, total and per-difficulty progress',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'User ID',
  })
  @ApiParam({
    name: 'widget',
    type: String,
    description: 'Widget name',
  })
  @ApiResponse({
    status: 200,
    description: 'Widget statistics successfully retrieved',
    schema: {
      example: {
        widget: 'math',
        lastLevel: 'easy-5',
        totalCompleted: 12,
        byDifficulty: {
          easy: 7,
          medium: 3,
          hard: 2,
        },
      },
    },
  })
  getWidgetStats(
    @Param('userId') userId: string,
    @Param('widget') widget: string,
  ) {
    return this.service.getWidgetStats(Number(userId), widget);
  }

  @Post(':userId/:widget/:difficulty/last-level')
  @ApiOperation({
    summary: 'Update last completed level for a widget and difficulty',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'User ID',
  })
  @ApiParam({
    name: 'widget',
    type: String,
    description: 'Widget name',
  })
  @ApiParam({
    name: 'difficulty',
    type: String,
    description: 'Difficulty (easy, medium, hard)',
  })
  @ApiBody({
    schema: {
      example: { level: 5 },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Last level updated successfully',
  })
  updateLastLevel(
    @Param('userId') userId: string,
    @Param('widget') widget: string,
    @Param('difficulty') difficulty: string,
    @Body('level') level: number,
  ) {
    return this.service.updateLastLevel(
      Number(userId),
      widget,
      difficulty,
      level,
    );
  }
}

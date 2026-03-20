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
    summary: 'Update last level depending on mode (start or next)',
    description: `
Updates the user's last level for a specific widget and difficulty.

Modes:
- **start** → saves the CURRENT level as lastLevel (used when user presses "Start")
- **next** → saves the NEXT level as lastLevel (used when user completes a level)

Next-level logic (mode = "next"):
- If the next level exists within the same difficulty → returns that level.
- If the current difficulty is completed → returns the first level of the next difficulty.
- If there are no more difficulties → returns null.

The frontend should use the returned "lastLevel" and "nextLevel" accordingly.
`,
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'User ID',
  })
  @ApiParam({
    name: 'widget',
    type: String,
    description: 'Widget (game) name',
  })
  @ApiParam({
    name: 'difficulty',
    type: String,
    description: 'Current difficulty (e.g., easy, medium, hard)',
  })
  @ApiBody({
    description: 'Current level and update mode',
    schema: {
      example: {
        level: 5,
        mode: 'next',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Level updated successfully',
    schema: {
      example: {
        lastLevel: 'easy-5',
        nextLevel: 'medium-1',
      },
    },
  })
  updateLastLevel(
    @Param('userId') userId: string,
    @Param('widget') widget: string,
    @Param('difficulty') difficulty: string,
    @Body('level') level: number,
    @Body('mode') mode: 'start' | 'next',
  ) {
    return this.service.updateLastLevel(
      Number(userId),
      widget,
      difficulty,
      level,
      mode,
    );
  }
}

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
    summary: 'Get widget statistics including completed levels count',
  })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'widget', type: String, description: 'Widget name' })
  @ApiResponse({
    status: 200,
    description: 'Widget statistics successfully retrieved',
    schema: {
      example: {
        id: 12,
        userId: 1,
        widget: 'math',
        streakDays: 4,
        lastVisit: '2026-03-19T16:22:00.000Z',
        bestTimeMs: 1200,
        lastLevel: 7,
        createdAt: '2026-03-10T12:00:00.000Z',
        updatedAt: '2026-03-19T16:22:00.000Z',
        completedLevels: 7,
      },
    },
  })
  get(@Param('userId') userId: string, @Param('widget') widget: string) {
    return this.service.getWithProgress(Number(userId), widget);
  }

  @Post(':userId/:widget/best-time')
  @ApiOperation({ summary: 'Update the best completion time for the widget' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'widget', type: String, description: 'Widget name' })
  @ApiBody({
    schema: {
      example: { timeMs: 1234 },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Best time updated successfully',
  })
  updateBestTime(
    @Param('userId') userId: string,
    @Param('widget') widget: string,
    @Body('timeMs') timeMs: number,
  ) {
    return this.service.updateBestTime(Number(userId), widget, timeMs);
  }

  @Post(':userId/:widget/last-level')
  @ApiOperation({ summary: 'Update the last completed level for the widget' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'widget', type: String, description: 'Widget name' })
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
    @Body('level') level: number,
  ) {
    return this.service.updateLastLevel(Number(userId), widget, level);
  }
}

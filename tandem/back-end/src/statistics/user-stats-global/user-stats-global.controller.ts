import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { UserStatsGlobalService } from './user-stats-global.service.js';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import type { SortField } from '../types.js';

@ApiTags('Global Stats')
@Controller('stats/global')
export class UserStatsGlobalController {
  constructor(private service: UserStatsGlobalService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get global statistics for the user' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Global statistics successfully retrieved',
    schema: {
      example: {
        streakDays: 7,
        lastVisit: '2026-03-19T16:22:00.000Z',
        bestTimeMs: 950,
        completedLevelsCount: 1,
      },
    },
  })
  get(@Param('userId') userId: string) {
    return this.service.get(Number(userId));
  }

  @Post(':userId/streak')
  @ApiOperation({ summary: 'Update daily streak and last visit date' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Streak updated successfully',
    schema: {
      example: {
        id: 5,
        userId: 1,
        streakDays: 8,
        lastVisit: '2026-03-20T09:00:00.000Z',
        bestTimeMs: 950,
        completedLevelsCount: 1,
        lastLevel: 12,
        createdAt: '2026-03-01T10:00:00.000Z',
        updatedAt: '2026-03-20T09:00:00.000Z',
      },
    },
  })
  updateStreak(@Param('userId') userId: string) {
    return this.service.updateStreak(Number(userId));
  }

  @Post(':userId/best-time')
  @ApiOperation({ summary: 'Update the best global completion time' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiBody({
    schema: {
      example: { timeMs: 1234 },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Best time updated successfully',
    schema: {
      example: {
        id: 5,
        userId: 1,
        streakDays: 8,
        lastVisit: '2026-03-20T09:00:00.000Z',
        bestTimeMs: 1234,
        lastLevel: 12,
        createdAt: '2026-03-01T10:00:00.000Z',
        updatedAt: '2026-03-20T09:00:00.000Z',
      },
    },
  })
  updateBestTime(
    @Param('userId') userId: string,
    @Body('timeMs') timeMs: number,
  ) {
    return this.service.updateBestTime(Number(userId), timeMs);
  }

  @Get()
  @ApiOperation({
    summary: 'Get global leaderboard of all users',
    description:
      'Returns a global leaderboard of all users. Supports sorting by completed levels, streak days, or best time. ' +
      'Supports ascending or descending order. Users with null bestTimeMs are placed at the end when sorting by time.',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Sorting field',
    enum: ['streak', 'levels', 'time'],
    example: 'streak',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'Sorting direction',
    enum: ['asc', 'desc'],
    example: 'desc',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all users sorted by the selected field and order.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid sort field or order provided',
  })
  getAllSorted(
    @Query('sortBy') sortBy?: SortField,
    @Query('order') order: 'asc' | 'desc' = 'desc',
  ) {
    return this.service.getAllSorted(sortBy, order);
  }
}

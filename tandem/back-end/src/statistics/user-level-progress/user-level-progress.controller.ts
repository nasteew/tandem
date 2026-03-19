import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserLevelProgressService } from './user-level-progress.service.js';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Level Progress')
@Controller('stats/levels')
export class UserLevelProgressController {
  constructor(private service: UserLevelProgressService) {}

  @Post(':userId/:widget/:level')
  @ApiOperation({ summary: 'Mark a level as completed for the user' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'widget', type: String, description: 'Widget name' })
  @ApiParam({ name: 'level', type: Number, description: 'Level number' })
  @ApiResponse({
    status: 200,
    description: 'Level marked as completed',
    schema: {
      example: {
        id: 45,
        userId: 1,
        widget: 'math',
        level: 3,
        completed: true,
        createdAt: '2026-03-19T16:22:00.000Z',
      },
    },
  })
  complete(
    @Param('userId') userId: string,
    @Param('widget') widget: string,
    @Param('level') level: string,
  ) {
    return this.service.completeLevel(Number(userId), widget, Number(level));
  }

  @Get(':userId/:widget')
  @ApiOperation({ summary: 'Get all completed levels for a widget' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'widget', type: String, description: 'Widget name' })
  @ApiResponse({
    status: 200,
    description: 'List of completed levels',
    schema: {
      example: [
        {
          id: 45,
          userId: 1,
          widget: 'math',
          level: 1,
          completed: true,
          createdAt: '2026-03-10T12:00:00.000Z',
        },
        {
          id: 46,
          userId: 1,
          widget: 'math',
          level: 2,
          completed: true,
          createdAt: '2026-03-11T12:00:00.000Z',
        },
      ],
    },
  })
  getCompleted(
    @Param('userId') userId: string,
    @Param('widget') widget: string,
  ) {
    return this.service.getCompletedLevels(Number(userId), widget);
  }

  @Get(':userId/:widget/count')
  @ApiOperation({ summary: 'Get the number of completed levels for a widget' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'widget', type: String, description: 'Widget name' })
  @ApiResponse({
    status: 200,
    description: 'Completed levels count',
    schema: {
      example: {
        userId: 1,
        widget: 'math',
        completedLevels: 7,
      },
    },
  })
  getCount(@Param('userId') userId: string, @Param('widget') widget: string) {
    return this.service.getProgressCount(Number(userId), widget);
  }
}

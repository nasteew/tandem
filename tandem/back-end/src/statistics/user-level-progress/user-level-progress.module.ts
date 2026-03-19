import { Module } from '@nestjs/common';
import { UserLevelProgressController } from './user-level-progress.controller.js';
import { UserLevelProgressService } from './user-level-progress.service.js';
import { PrismaService } from '../../prisma.service.js';

@Module({
  controllers: [UserLevelProgressController],
  providers: [UserLevelProgressService, PrismaService],
  exports: [UserLevelProgressService],
})
export class UserLevelProgressModule {}

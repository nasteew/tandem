import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard.js';
import { UsersService } from './users.service.js';
import { UpdateNameDto } from './dto/update-user-name.dto.js';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface.js';
import { UpdateEmailDto } from './dto/update-email.dto.js';
import { UpdatePasswordDto } from './dto/update-password.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getUserProfile(@Req() req: AuthenticatedRequest) {
    return this.usersService.getProfile(req.user.sub);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Patch('update-name')
  async updateName(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateNameDto,
  ) {
    return this.usersService.updateUser(req.user.sub, {
      name: dto.name,
    });
  }

  @Patch('update-email')
  async updateEmail(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateEmailDto,
  ) {
    return this.usersService.updateEmail(req.user.sub, dto.email);
  }

  @Patch('update-password')
  async updatePassword(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(req.user.sub, dto.password);
  }

  @Delete('me')
  deleteUserProfile(@Req() req: AuthenticatedRequest) {
    return this.usersService.deleteUser(req.user.sub);
  }
}

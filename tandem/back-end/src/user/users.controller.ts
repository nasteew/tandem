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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Current user profile retrieved successfully.',
  })
  async getUserProfile(@Req() req: AuthenticatedRequest) {
    return this.usersService.getProfile(req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users (names only)' })
  @ApiResponse({
    status: 200,
    description: 'List of all users returned successfully.',
  })
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Patch('update-name')
  @ApiOperation({ summary: 'Update current user name' })
  @ApiResponse({ status: 200, description: 'User name updated successfully.' })
  async updateName(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateNameDto,
  ) {
    return this.usersService.updateUser(req.user.sub, {
      name: dto.name,
    });
  }

  @Patch('update-email')
  @ApiOperation({ summary: 'Update current user email' })
  @ApiResponse({ status: 200, description: 'User email updated successfully.' })
  @ApiResponse({ status: 400, description: 'Email is already taken.' })
  async updateEmail(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateEmailDto,
  ) {
    return this.usersService.updateEmail(req.user.sub, dto.email);
  }

  @Patch('update-password')
  @ApiOperation({ summary: 'Update current user password' })
  @ApiResponse({
    status: 200,
    description: 'User password updated successfully.',
  })
  async updatePassword(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(req.user.sub, dto.password);
  }

  @Delete('me')
  @ApiOperation({ summary: 'Delete current user account' })
  @ApiResponse({
    status: 200,
    description: 'User account deleted successfully.',
  })
  deleteUserProfile(@Req() req: AuthenticatedRequest) {
    return this.usersService.deleteUser(req.user.sub);
  }
}

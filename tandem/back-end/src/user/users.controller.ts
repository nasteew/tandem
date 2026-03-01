import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface.js';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator.js';
import { UpdatePasswordDto } from './dto/update-password.dto.js';

@ApiTags('Users')
@ApiBearerAuth()
@Public()
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Current user profile retrieved successfully.',
  })
  async getUserProfile() {
    return this.usersService.getProfile(1);
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

  @Patch('update-user')
  @ApiOperation({ summary: 'Update current user (name, email, password)' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  async updateUser(@Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(1, dto);
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete current user account' })
  @ApiResponse({
    status: 204,
    description: 'User account deleted successfully.',
  })
  async deleteUserProfile(@Req() req: AuthenticatedRequest) {
    await this.usersService.deleteUser(req.user.sub);
  }

  @Patch('update-password')
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Validation error or wrong old password.',
  })
  async updatePassword(@Body() dto: UpdatePasswordDto) {
    return this.usersService.updatePassword(1, dto);
  }
}

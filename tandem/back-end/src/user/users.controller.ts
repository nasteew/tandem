import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  HttpCode,
  HttpStatus,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator.js';
import { UpdatePasswordDto } from './dto/update-password.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@ApiBearerAuth()
@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':id/profile')
  @ApiOperation({ summary: 'Get user profile by ID' })
  async getUserProfile(@Param('id') id: string) {
    return this.usersService.getProfile(Number(id));
  }

  @Get()
  @ApiOperation({ summary: 'Get all users (names only)' })
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Patch(':id/update-user')
  @ApiOperation({ summary: 'Update user by ID' })
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(Number(id), dto);
  }

  @Patch(':id/update-password')
  @ApiOperation({ summary: 'Change user password by ID' })
  async updatePassword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(Number(id), dto);
  }

  @Delete(':id/profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by ID' })
  async deleteUserProfile(@Param('id') id: string) {
    await this.usersService.deleteUser(Number(id));
  }

  @Patch(':id/avatar')
  @ApiOperation({ summary: 'Upload or update user avatar' })
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.usersService.uploadAvatar(Number(id), file);
  }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { Public } from './decorators/public.decorator.js';
import type { Request, Response } from 'express';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';
import { JwtAuthGuard } from './guard/jwt-auth.guard.js';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description:
      'Successful login. Returns access token in response body and sets refresh token in HttpOnly cookie',
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(res, loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description:
      'User registered successfully. Returns access token in response body and sets refresh token in HttpOnly cookie',
  })
  @ApiResponse({ status: 400, description: 'User already exists' })
  register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(
      res,
      registerDto.email,
      registerDto.password,
      registerDto.name,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @Public()
  @ApiOperation({ summary: 'Refresh access token using refresh token cookie' })
  @ApiCookieAuth()
  @ApiResponse({
    status: 200,
    description:
      'New access token returned in response body and refresh token updated in HttpOnly cookie',
  })
  @ApiResponse({ status: 401, description: 'Refresh token missing' })
  @ApiResponse({ status: 403, description: 'Invalid or expired refresh token' })
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken =
      typeof req.cookies?.['refresh_token'] === 'string'
        ? req.cookies['refresh_token']
        : null;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }
    return this.authService.refresh(res, refreshToken);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user and clear refresh token cookie' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  logout(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(res, req.user.sub);
  }
}

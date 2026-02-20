import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { Public } from './decorators/public.decorator.js';
import type { Response } from 'express';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';

interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(res, loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  signIn(
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
  @Public()
  @Post('refresh')
  refresh(
    @Body('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(res, refreshToken);
  }

  @Post('logout')
  logout(
    @Request() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(res, req.user.sub);
  }
}

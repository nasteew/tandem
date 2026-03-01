import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../user/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service.js';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';
import type { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly isProduction: boolean;
  private readonly jwtRefreshSecret: string;
  private readonly refreshExpiresIn: number;
  private readonly saltRounds: number;
  private readonly cookieOptions: import('express').CookieOptions;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.isProduction =
      this.configService.getOrThrow<string>('NODE_ENV') === 'production';

    this.jwtRefreshSecret =
      this.configService.getOrThrow<string>('JWT_REFRESH_SECRET');

    this.refreshExpiresIn = Number(
      this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN'),
    );
    if (isNaN(this.refreshExpiresIn)) {
      throw new Error('Invalid JWT_REFRESH_EXPIRES_IN');
    }

    this.saltRounds = Number(
      this.configService.getOrThrow<string>('BCRYPT_SALT_ROUNDS'),
    );

    this.cookieOptions = {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: 'lax',
      maxAge: this.refreshExpiresIn * 1000,
      path: '/',
    };
  }

  private async issueTokens(res: Response, userId: number) {
    const tokens = this.generateTokens(userId);
    await this.saveRefreshToken(userId, tokens.refresh_token);
    this.setCookie(res, tokens.refresh_token);
    return { access_token: tokens.access_token };
  }

  async login(res: Response, email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(res, user.id);
  }

  async register(res: Response, email: string, password: string, name: string) {
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = await this.usersService.createUser({
      email,
      password: hashedPassword,
      name,
    });

    return this.issueTokens(res, user.id);
  }

  async logout(res: Response, userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    res.clearCookie('refresh_token', this.cookieOptions);

    return { message: 'Logged out successfully' };
  }

  private generateTokens(userId: number) {
    const payload: JwtPayload = { sub: userId };
    const access_token = this.jwtService.sign(payload);

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.jwtRefreshSecret,
      expiresIn: this.refreshExpiresIn,
    });

    return { access_token, refresh_token };
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  private async saveRefreshToken(userId: number, token: string) {
    const hashed = await bcrypt.hash(token, this.saltRounds);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashed, refreshTokenCreatedAt: new Date() },
    });
  }

  private async comparePasswords(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async refresh(res: Response, refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Access denied');
    }

    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.jwtRefreshSecret,
      });
    } catch {
      throw new ForbiddenException('Access denied');
    }

    const user = await this.usersService.findById(payload.sub);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    const passwordMatch = await bcrypt.compare(refreshToken, user.refreshToken);

    let isGracePeriodValid = false;
    if (user.refreshTokenCreatedAt instanceof Date) {
      isGracePeriodValid =
        Date.now() - user.refreshTokenCreatedAt.getTime() < 30_000;
    }

    const isTokenValid = passwordMatch || isGracePeriodValid;

    if (!isTokenValid) {
      res.clearCookie('refresh_token', this.cookieOptions);
      throw new ForbiddenException('Access denied');
    }

    return this.issueTokens(res, user.id);
  }

  private setCookie(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, this.cookieOptions);
  }
}

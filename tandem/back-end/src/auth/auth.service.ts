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
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

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

    const tokens = this.generateTokens(user.id);

    await this.saveRefreshToken(user.id, tokens.refresh_token);

    this.setCookie(res, tokens.refresh_token);

    return tokens;
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

    const tokens = this.generateTokens(user.id);

    await this.saveRefreshToken(user.id, tokens.refresh_token);

    this.setCookie(res, tokens.refresh_token);

    return tokens;
  }

  async logout(res: Response, userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    res.clearCookie('refresh_token');

    return { message: 'Logged out successfully' };
  }

  private generateTokens(userId: number) {
    const payload: JwtPayload = { sub: userId };
    const access_token = this.jwtService.sign(payload);

    const refreshExpire = Number(
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    );

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: refreshExpire,
    });

    return { access_token, refresh_token };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = Number(
      this.configService.get<number>('BCRYPT_SALT_ROUNDS'),
    );
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  private async saveRefreshToken(userId: number, token: string) {
    const saltRounds = Number(
      this.configService.getOrThrow<string>('BCRYPT_SALT_ROUNDS'),
    );
    const hashed = await bcrypt.hash(token, saltRounds);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashed },
    });
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async refresh(res: Response, refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Access denied');
    }

    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new ForbiddenException('Access denied');
    }

    const user = await this.usersService.findById(payload.sub);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isTokenValid) {
      throw new ForbiddenException('Access denied');
    }

    const newTokens = this.generateTokens(payload.sub);

    await this.saveRefreshToken(user.id, newTokens.refresh_token);

    this.setCookie(res, newTokens.refresh_token);

    return newTokens;
  }

  private setCookie(res: Response, refreshToken: string) {
    const refreshExpire = Number(
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    );

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: refreshExpire * 1000,
    });
  }
}

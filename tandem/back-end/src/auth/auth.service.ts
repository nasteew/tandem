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

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async login(email: string, password: string) {
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

    const tokens = this.generateTokens(user.id, user.email);

    await this.saveRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async register(email: string, password: string, name: string) {
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

    const tokens = this.generateTokens(user.id, user.email);

    await this.saveRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    return { message: 'Logged out successfully' };
  }

  private generateTokens(userId: number, email: string) {
    const payload = { sub: userId, email };
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
    const saltRounds = this.configService.get<number>('BCRYPT_SALT_ROUNDS');
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  private async saveRefreshToken(userId: number, token: string) {
    const saltRounds =
      this.configService.getOrThrow<string>('BCRYPT_SALT_ROUNDS');
    const hashed = await bcrypt.hash(token, saltRounds);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashed },
    });
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Access denied');
    }

    let payload: { sub: number; email: string };

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

    const newTokens = this.generateTokens(payload.sub, payload.email);

    await this.saveRefreshToken(user.id, newTokens.refresh_token);

    return newTokens;
  }
}

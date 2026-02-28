import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UpdatePasswordDto } from './dto/update-password.dto.js';

@Injectable()
export class UsersService {
  private readonly saltRounds: number;
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.saltRounds = Number(
      this.configService.getOrThrow<string>('BCRYPT_SALT_ROUNDS'),
    );
  }

  async createUser(data: { email: string; password: string; name: string }) {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: number, data: Partial<UpdateUserDto>) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: { name: true, email: true, about: true },
    });
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);

    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }
    const hashed = await bcrypt.hash(dto.newPassword, this.saltRounds);

    return this.prisma.user.update({
      where: { id },
      data: { password: hashed },
      select: { email: true, name: true },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
      select: { name: true, email: true },
    });
  }

  async getProfile(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
        about: true,
      },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        name: true,
      },
    });
  }
}

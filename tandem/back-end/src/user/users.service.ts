import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

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

  async updateEmail(id: number, newEmail: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: newEmail },
    });

    if (existingUser && existingUser.id !== id) {
      throw new BadRequestException('Email is already taken');
    }

    return this.updateUser(id, { email: newEmail });
  }

  async updatePassword(id: number, newPassword: string) {
    const hashed = await bcrypt.hash(newPassword, this.saltRounds);
    return this.updateUser(id, { password: hashed });
  }

  async updateUser(
    id: number,
    data: Partial<{ email: string; password: string; name: string }>,
  ) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
      select: { id: true, name: true, email: true },
    });
  }

  async getProfile(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
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

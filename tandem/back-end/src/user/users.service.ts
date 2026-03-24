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
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './interfaces/database.interface.js';

@Injectable()
export class UsersService {
  private readonly saltRounds: number;
  private supabase: SupabaseClient<Database>;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.saltRounds = Number(
      this.configService.getOrThrow<string>('BCRYPT_SALT_ROUNDS'),
    );

    this.supabase = createClient(
      this.configService.getOrThrow<string>('SUPABASE_URL'),
      this.configService.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY'),
    );
  }

  async createUser(data: {
    email: string;
    password: string | null;
    name: string;
    googleId?: string;
  }) {
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
      select: {
        id: true,
        name: true,
        email: true,
        about: true,
        avatarUrl: true,
      },
    });
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password) {
      throw new BadRequestException('No password');
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
        id: true,
        name: true,
        email: true,
        about: true,
        avatarUrl: true,
        googleId: true,
      },
    });
  }

  async getUser(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
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

  async uploadAvatar(userId: number, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const bucket = this.configService.getOrThrow<string>('SUPABASE_BUCKET');
    const fileName = `avatars/${userId}-${Date.now()}-${file.originalname}`;

    const { error: uploadError } = await this.supabase.storage
      .from(bucket)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      throw new BadRequestException(uploadError.message);
    }

    const {
      data: { publicUrl },
    } = this.supabase.storage.from(bucket).getPublicUrl(fileName);

    await this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: publicUrl },
    });

    return { avatarUrl: publicUrl };
  }
}

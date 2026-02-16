import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service.js';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string) {
    const hash = bcrypt.hashSync(password, 10);
    return this.prisma.user.create({
      data: { email, password: hash },
    });
  }
}

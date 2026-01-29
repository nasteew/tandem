import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('users')
  async createUser(@Body() data: { email: string; name?: string }) {
    return this.appService.createUser(data);
  }

  @Get('users')
  async getAllUsers() {
    return this.appService.getAllUsers();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Controller, Post, Body, Res } from '@nestjs/common';
import { type Response } from 'express';
import { AiService } from './ai.service.js';
import { ChatDto } from '../dto/chat-message.dto.js';
import { Public } from '../auth/decorators/public.decorator.js';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Public()
  @Post('chat')
  async chat(
    @Body() dto: ChatDto,
    @Res() res: Response,
  ) {
    const { message } = dto;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    await this.aiService.streamChatToResponse(message, res);
  }
}

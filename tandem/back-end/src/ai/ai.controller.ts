import {
  Controller,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { type Response } from 'express';
import { AiService } from './ai.service.js';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(
    @Body('message') message: string,
    @Res() res: Response,
  ) {
    const stream = await this.aiService.streamChat(message);
    if (!stream) {
      return res.status(500).send('Error streaming chat');
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = stream.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      res.write(chunk);
    }

    res.end();
  }
}

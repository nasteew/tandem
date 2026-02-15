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
    try {
      const stream = await this.aiService.streamChat(message);
      if (!stream) {
        return res.status(500).send('Error streaming chat');
      }

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;

          const data = trimmed.slice(5).trim();
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              res.write(content);
            }
          } catch {
            console.warn('Failed to parse SSE chunk:', data);
          }
        }
      }

      res.end();
    } catch (error) {
      console.error('Chat endpoint error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to get AI response' });
      } else {
        res.end();
      }
    }
  }
}

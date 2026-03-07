import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service.js';



@Injectable()
export class AiService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService
  ) {}

  async streamChatToResponse(
    message: string,
    conversationId: string | undefined,
    res: Response
  ): Promise<string> {
    const apiKey = this.config.get<string>('OPENROUTER_API_KEY');
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY is not set');
    }
    let conversation;
    if (!conversationId) {
      conversation = await this.prisma.conversation.create({
        data: {},
      });
    } else {
      conversation = await this.prisma.conversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation) {
        conversation = await this.prisma.conversation.create({
          data: {},
        });
      }
    }

    const id = conversation.id;

    res.setHeader('x-conversation-id', id);

    await this.prisma.message.create({
      data: {
        conversationId: id,
        role: 'user',
        content: message,
      },
    });

    const history = await this.prisma.message.findMany({
      where: { conversationId: id },
      orderBy: { createdAt: 'asc' },
      take: 20,
    });

    const formattedMessages = [
      {
        role: 'system',
        content:
          'You are a senior Software Engineer interviewer helping a candidate practice interviews.',
      },
      ...history.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'liquid/lfm-2.5-1.2b-instruct:free',
          stream: true,
          messages: formattedMessages
        }),
      },
    );

    if (!response.ok || !response.body) {
      throw new Error('OpenRouter request failed');
    }
    let assistantMessage = '';
    try {
      assistantMessage = await this.pipeStream(response.body, res);
    } finally {
      res.end();
    }

    await this.prisma.message.create({
      data: {
        conversationId: id,
        role: 'assistant',
        content: assistantMessage,
      },
    });

    return id;

  }

    private async pipeStream(
    stream: ReadableStream<Uint8Array>,
    res: Response,
  ): Promise<string> {
    const reader = stream.getReader();
    const decoder = new TextDecoder();

    let buffer = '';
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data:')) continue;

        const data = line.replace('data:', '').trim();

        if (data === '[DONE]') return fullText;
        if (!data.startsWith('{')) continue;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;

          if (content) {
            fullText += content;
            res.write(content);
          }
        } catch (err) {
          console.error('Stream parse error:', err);
        }
      }
    }

    return fullText;
  }
}
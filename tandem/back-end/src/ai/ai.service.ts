import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service.js';

type Conversation = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

type AIChunk = {
  choices?: {
    delta?: {
      content?: string;
    };
  }[];
};

@Injectable()
export class AiService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async streamChatToResponse(
    message: string,
    conversationId: string | undefined,
    res: Response,
  ): Promise<string> {
    const apiKey = this.config.getOrThrow<string>('OPENROUTER_API_KEY');
    let conversation: Conversation | null = null;
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
    const url = this.config.getOrThrow<string>('OPENROUTER_URL');
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-super-120b-a12b:free',
        stream: true,
        messages: formattedMessages,
      }),
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      console.error('OpenRouter error:', errorText);

      throw new Error(
        `OpenRouter request failed: ${response.status} ${errorText}`,
      );
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
          const parsed: AIChunk = JSON.parse(data) as AIChunk;
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

  async getConversationMessages(conversationId: string) {
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });
  }
}

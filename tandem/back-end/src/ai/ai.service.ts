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

type InterviewLevel = 'junior' | 'middle' | 'senior';

function levelGuidance(level: InterviewLevel): string {
  switch (level) {
    case 'junior':
      return `Interview level: JUNIOR.
Target: fundamentals, syntax, basic data structures, simple algorithms, and straightforward debugging.
Ask short, concrete questions a junior web developer should answer in a few sentences.`;
    case 'middle':
      return `Interview level: MID-LEVEL WEB DEVELOPER.
Target: trade-offs, common patterns, API design, performance basics, testing, and practical system boundaries.
Ask focused questions that need brief reasoning, not essays.`;
    case 'senior':
      return `Interview level: SENIOR WEB DEVELOPER.
Target: architecture, scalability, reliability, security trade-offs, mentoring, and ambiguous technical decisions.
Ask sharp, scoping questions; expect concise trade-off answers, not long lectures.`;
    default:
      return '';
  }
}

function buildSystemPrompt(
  interviewLevel?: string,
  language: 'en' | 'ru' = 'en',
): string {
  const level: InterviewLevel | undefined =
    interviewLevel && ['junior', 'middle', 'senior'].includes(interviewLevel)
      ? (interviewLevel as InterviewLevel)
      : undefined;

  const languageInstruction =
    language === 'ru' ? 'Speak ONLY in Russian.' : 'Speak ONLY in English.';
  const levelSection = level ? `${levelGuidance(level)}\n\n` : '';

  return `You are a senior Software Engineer interviewer.

${levelSection}
${languageInstruction}
Rules:
- Only ask interview-style questions.
- Do NOT explain answers unless the user explicitly asks.
- Keep each reply very short: ideally one or two sentences plus ONE clear question (under ~60 words total unless the user asks for detail).
- Ask one question at a time.
- Be concise and direct, like a live technical screen or phone interview.
- Focus on technical interview topics (coding, system design, backend, frontend, etc.).
- If the user answers, ask a follow-up question based on their response.
- Do not break character.

Your goal is to simulate a real technical interview.`;
}

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
    interviewLevel?: string,
    language?: 'en' | 'ru',
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
        language: language || 'en',
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
        content: buildSystemPrompt(interviewLevel, language),
      },
      ...history.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];
    const url = this.config.getOrThrow<string>('OPENROUTER_URL');
    const models = [
     'stepfun/step-3.5-flash:free',
     'stepfun/step-3.5-flash:free'
    ];

    let response: globalThis.Response | null = null;
    let lastError: unknown = null;

    for (const model of models) {
      try {
        response = await fetch(`${url}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model,
            stream: true,
            messages: formattedMessages,
          }),
        });

        if (response.ok && response.body) {
          break;
        } else {
          lastError = await response.text();
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!response || !response.body) {
      const message =
        lastError instanceof Error
          ? lastError.message
          : typeof lastError === 'string'
            ? lastError
            : 'Unknown error';

      throw new Error(`All models failed: ${message}`);
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
        language: language || 'en',
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

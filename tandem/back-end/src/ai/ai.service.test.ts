import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiService } from './ai.service.js';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

function createMockStream(chunks: string[]) {
  return new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }

      controller.close();
    },
  });
}

describe('AiService', () => {
  let service: AiService;

  let prismaMock: {
    conversation: {
      create: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
    };
    message: {
      create: ReturnType<typeof vi.fn>;
      findMany: ReturnType<typeof vi.fn>;
    };
  };

  let configMock: {
    getOrThrow: ReturnType<typeof vi.fn>;
  };

  let mockRes: Partial<Response>;

  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.stubGlobal('fetch', fetchMock);

    prismaMock = {
      conversation: {
        create: vi.fn(),
        findUnique: vi.fn(),
      },
      message: {
        create: vi.fn(),
        findMany: vi.fn(),
      },
    };

    configMock = {
      getOrThrow: vi.fn(),
    };

    mockRes = {
      setHeader: vi.fn(),
      write: vi.fn(),
      end: vi.fn(),
    };

    configMock.getOrThrow.mockReturnValue('fake-api-key');
    prismaMock.conversation.create.mockResolvedValue({ id: 'conv-1' });
    prismaMock.message.findMany.mockResolvedValue([]);

    service = new AiService(
      configMock as unknown as ConfigService,
      prismaMock as unknown as PrismaClient,
    );
  });

  it('устанавливает заголовок x-conversation-id в ответ', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      body: createMockStream([]),
      headers: {},
    });

    await service.streamChatToResponse(
      'Hello AI',
      undefined,
      mockRes as Response,
    );

    expect(mockRes.setHeader).toHaveBeenCalledWith(
      'x-conversation-id',
      'conv-1',
    );
  });

  it('стримит ответ AI в res корректно', async () => {
    const mockStream = createMockStream([
      'data: {"choices":[{"delta":{"content":"AI Reply"}}]}\n',
      'data: [DONE]\n',
    ]);

    fetchMock.mockResolvedValue({
      ok: true,
      body: mockStream,
      headers: {},
    });

    await service.streamChatToResponse(
      'Hello AI',
      undefined,
      mockRes as Response,
    );

    expect(mockRes.write).toHaveBeenCalledWith('AI Reply');
    expect(mockRes.end).toHaveBeenCalled();
  });
});

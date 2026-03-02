import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AiService {
  constructor(private readonly config: ConfigService) {}
  async streamChatToResponse(message: string, res: Response) {
    const apiKey = this.config.get<string>('OPENROUTER_API_KEY');
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY is not set');
    }
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
          messages: [
            {
              role: 'system',
              content:
                'You are a senior Software Engineer interviewer helping a candidate practice interviews.',
            },
            { role: 'user', content: message },
          ],
        }),
      },
    );

    if (!response.ok || !response.body) {
      throw new Error('OpenRouter request failed');
    }

    try {
      await this.pipeStream(response.body, res);
    } finally {
      res.end();
    }
  }

  private async pipeStream(
    stream: ReadableStream<Uint8Array>,
    res: Response,
  ) {
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
        if (!line.startsWith('data:')) continue;

        const data = line.replace('data:', '').trim();
        if (data === '[DONE]') {
          return;
        }

        if (!data.startsWith('{')) continue;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;

          if (content) {
            res.write(content);
          }
        } catch (error) {
          console.error('Stream JSON error:', error);
        }
      }
    }
  }
}

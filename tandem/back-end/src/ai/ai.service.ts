import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AiService {
  async streamChatToResponse(message: string, res: Response) {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
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

    await this.pipeStream(response.body, res);

    res.end();
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
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;

          if (content) {
            res.write(content);
          }
        } catch {}
      }
    }
  }
}
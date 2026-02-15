import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async streamChat(message: string) {
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

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('OpenRouter API error:', response.status, errorBody);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    return response.body;
  }
}
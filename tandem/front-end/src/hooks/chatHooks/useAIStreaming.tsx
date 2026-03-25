import type { InterviewLevel } from '../../types/interviewLevel';

export async function streamAI(
  message: string,
  conversationId: string | null,
  onChunk: (chunk: string) => void,
  onId: (id: string) => void,
  signal?: AbortSignal,
  interviewLevel?: InterviewLevel | null
) {
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const res = await fetch(`${backendUrl}/ai/chat`, {
    method: 'POST',
    body: JSON.stringify({
      message,
      conversationId,
      ...(interviewLevel ? { interviewLevel } : {}),
    }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    signal,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const newConversationId = res.headers.get('x-conversation-id');
  if (newConversationId) {
    onId(newConversationId);
  }

  if (!res.body) throw new Error('No stream');

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    onChunk(decoder.decode(value, { stream: true }));
  }

  return newConversationId;
}

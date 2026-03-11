export async function streamAI(
  message: string,
  conversationId: string | null,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const res = await fetch(`${backendUrl}/ai/chat`, {
    method: "POST",
    body: JSON.stringify({ message, conversationId }),
    headers: { "Content-Type": "application/json" },
    signal
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const newConversationId = res.headers.get("x-conversation-id");

  if (!res.body) throw new Error("No stream");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    onChunk(decoder.decode(value, { stream: true }));
  }

  return newConversationId;
}
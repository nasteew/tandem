export async function streamAI(
  message: string,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
) {
  const res = await fetch(`http://localhost:3001/ai/chat`, {
    method: "POST",
    body: JSON.stringify({ message }),
    headers: { "Content-Type": "application/json" },
    signal
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  if (!res.body) throw new Error("No stream");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    onChunk(decoder.decode(value, { stream: true }));
  }
}
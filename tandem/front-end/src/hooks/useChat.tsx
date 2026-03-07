import { useEffect, useRef, useState, useCallback } from 'react';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: "Hello! I'm your AI pair programmer...",
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim() || loading) return;

    // Cancel previous request if exists
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to fetch AI response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      // Insert assistant placeholder once
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value);

        // Update only last message
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: accumulated,
          };
          return updated;
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: '⚠️ Something went wrong. Please try again.',
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  return { messages, input, setInput, loading, handleSend, bottomRef, scrollToBottom };
}

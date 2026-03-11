import { useState, useRef } from 'react';
import { useChatMessages } from './useChatMessages';
import { streamAI } from './useAIStreaming';
import { useAutoScroll } from './useAutoScroll';
import { generateId } from './useChatMessages';

export function useChat() {
  const { messages, addMessage, updateLastMessage } = useChatMessages([
    { id: generateId(), role: 'assistant', content: 'Hi! How can I help you?' },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const conversationIdRef = useRef<string | null>(null);

  const bottomRef = useAutoScroll(messages);

  const send = async () => {
    if (!input.trim()) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    addMessage({
      id: generateId(),
      role: 'user',
      content: input,
    });

    addMessage({
      id: generateId(),
      role: 'assistant',
      content: '',
    });

    const prompt = input;
    setInput('');
    setLoading(true);

    let acc = '';

    try {
      const newConversationId = await streamAI(
        prompt,
        conversationIdRef.current,
        (chunk) => {
          acc += chunk;
          updateLastMessage(acc);
        },
        abortRef.current.signal
      );

      if (newConversationId) {
        conversationIdRef.current = newConversationId;
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    send,
    loading,
    bottomRef,
  };
}

import { useState, useRef, useEffect } from 'react';
import { useChatMessages } from './useChatMessages';
import { streamAI } from './useAIStreaming';
import { useAutoScroll } from './useAutoScroll';
import { generateId } from './useChatMessages';
import { type Message } from '../../types/message';

const STORAGE_KEY = 'chat_conversation_id';

export function useChat() {
  const { messages, addMessage, updateLastMessage, setMessages } = useChatMessages([
    { id: generateId(), role: 'assistant', content: 'Hi! How can I help you?' },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  /** Latest assistant bubble was filled via API streaming (or loaded history); skip typewriter for it. */
  const [latestAssistantStreamDone, setLatestAssistantStreamDone] = useState(false);

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
    setLatestAssistantStreamDone(false);
    setLoading(true);

    let acc = '';

    try {
      await streamAI(
        prompt,
        conversationIdRef.current,
        (chunk) => {
          acc += chunk;
          updateLastMessage(acc);
        },
        (id) => {
          conversationIdRef.current = id;
          localStorage.setItem(STORAGE_KEY, id);
        },
        abortRef.current.signal
      );
    } finally {
      setLoading(false);
      setLatestAssistantStreamDone(true);
    }
  };
  const loadHistory = async (conversationId: string) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    const res = await fetch(`${backendUrl}/ai/messages?conversationId=${conversationId}`);
    const data = await res.json();

    return data.map((m: Message) => ({
      id: generateId(),
      role: m.role,
      content: m.content,
    }));
  };
  useEffect(() => {
  const savedId = localStorage.getItem(STORAGE_KEY);

  if (!savedId) return;

  conversationIdRef.current = savedId;

  loadHistory(savedId).then((history) => {

    if (history.length > 0) {
      setMessages(history);
      setLatestAssistantStreamDone(true);
    } else {
      setMessages([
    { id: generateId(), role: 'assistant', content: 'Hi! How can I help you?' }
  ]);
    }
  });
}, [setMessages]);

  return {
    messages,
    input,
    setInput,
    send,
    loading,
    latestAssistantStreamDone,
    bottomRef,
  };
}

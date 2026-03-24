import { useState, useRef, useEffect, useCallback } from 'react';
import { useChatMessages } from './useChatMessages';
import { streamAI } from './useAIStreaming';
import { useAutoScroll } from './useAutoScroll';
import { generateId } from './useChatMessages';
import { type Message } from '../../types/message';
import type { InterviewLevel } from '../../types/interviewLevel';
import { interviewIntroMessage } from '../../types/interviewLevel';

const STORAGE_KEY = 'chat_conversation_id';

function initialMessagesForLevel(level: InterviewLevel | null) {
  if (!level) return [];
  return [
    {
      id: generateId(),
      role: 'assistant' as const,
      content: interviewIntroMessage(level),
    },
  ];
}

export function useChat(interviewLevel: InterviewLevel | null) {
  const { messages, addMessage, updateLastMessage, setMessages } = useChatMessages(
    initialMessagesForLevel(interviewLevel)
  );

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  /** Latest assistant bubble was filled via API streaming (or loaded history); skip typewriter for it. */
  const [latestAssistantStreamDone, setLatestAssistantStreamDone] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const conversationIdRef = useRef<string | null>(null);

  const bottomRef = useAutoScroll(messages);

  const beginInterviewSession = useCallback(
    (level: InterviewLevel) => {
      localStorage.removeItem(STORAGE_KEY);
      conversationIdRef.current = null;
      setMessages([
        {
          id: generateId(),
          role: 'assistant',
          content: interviewIntroMessage(level),
        },
      ]);
      setLatestAssistantStreamDone(true);
    },
    [setMessages]
  );

  const send = async () => {
    if (!input.trim() || !interviewLevel) return;

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
        abortRef.current.signal,
        interviewLevel
      );
    } finally {
      setLoading(false);
      setLatestAssistantStreamDone(true);
    }
  };

  const loadHistory = async (conversationId: string) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const res = await fetch(`${backendUrl}/ai/messages?conversationId=${conversationId}`);
    const data = await res.json();

    return data.map((m: Message) => ({
      id: generateId(),
      role: m.role,
      content: m.content,
    }));
  };

  useEffect(() => {
    if (!interviewLevel) return;

    const savedId = localStorage.getItem(STORAGE_KEY);

    if (!savedId) return;

    conversationIdRef.current = savedId;

    loadHistory(savedId).then((history) => {
      if (history.length > 0) {
        setMessages(history);
        setLatestAssistantStreamDone(true);
      } else {
        setMessages(initialMessagesForLevel(interviewLevel));
      }
    });
  }, [setMessages, interviewLevel]);

  return {
    messages,
    input,
    setInput,
    send,
    loading,
    latestAssistantStreamDone,
    bottomRef,
    beginInterviewSession,
  };
}

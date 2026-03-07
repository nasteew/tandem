import { useState } from "react";

export const generateId = (): string => Math.random().toString(36).substring(2, 10);

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function useChatMessages(initial: ChatMessage[]) {
  const [messages, setMessages] = useState(initial);

  const addMessage = (msg: ChatMessage) => {
    setMessages(prev => [...prev, msg]);
  };

  const updateLastMessage = (content: string) => {
    setMessages(prev => {
      const copy = [...prev];
      copy[copy.length - 1] = {
        ...copy[copy.length - 1],
        content
      };
      return copy;
    });
  };

  return { messages, addMessage, updateLastMessage };
}
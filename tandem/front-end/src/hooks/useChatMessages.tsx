import { useState } from "react";

export interface ChatMessage {
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
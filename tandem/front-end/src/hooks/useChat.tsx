import { useState, useRef } from "react";
import { useChatMessages } from "./useChatMessages";
import { streamAI } from "./useAIStreaming";
import { useAutoScroll } from "./useAutoScroll";

export function useChat() {

  const { messages, addMessage, updateLastMessage } =
    useChatMessages([
      { role: "assistant", content: "Hi! How can I help you?" }
    ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const bottomRef = useAutoScroll(messages);

  const send = async () => {

    if (!input.trim()) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    addMessage({
      role: "user",
      content: input
    });

    addMessage({
      role: "assistant",
      content: ""
    });

    const prompt = input;
    setInput("");
    setLoading(true);

    let acc = "";

    try {

      await streamAI(
        prompt,
        chunk => {
          acc += chunk;
          updateLastMessage(acc);
        },
        abortRef.current.signal
      );

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
    bottomRef
  };
}
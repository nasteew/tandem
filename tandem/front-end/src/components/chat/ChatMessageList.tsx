import { type RefObject } from 'react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import type { ChatMessage as ChatMessageType } from '../../hooks/useChat';

interface ChatMessageListProps {
  messages: ChatMessageType[];
  loading: boolean;
  bottomRef: RefObject<HTMLDivElement | null>;
  onMessageUpdate?: () => void;
}

export const ChatMessageList = ({ messages, loading, bottomRef, onMessageUpdate }: ChatMessageListProps) => {
  return (
    <main className="flex-1 p-4 max-w-4xl mx-auto w-full flex flex-col gap-6 overflow-y-auto">
      {messages.map((msg, index) => (
        <ChatMessage
          key={index}
          role={msg.role}
          content={msg.content}
          onUpdate={onMessageUpdate}
        />
      ))}

      {loading && <TypingIndicator />}
      <div ref={bottomRef} />
    </main>
  );
};

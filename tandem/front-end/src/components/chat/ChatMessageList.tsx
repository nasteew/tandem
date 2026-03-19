import { type RefObject } from 'react';
import { ChatMessage } from './ChatMessage';
import type { ChatMessage as ChatMessageType } from '../../hooks/chatHooks/useChatMessages';


interface ChatMessageListProps {
  messages: ChatMessageType[];
  bottomRef: RefObject<HTMLDivElement | null>;
}

export const ChatMessageList = ({ messages, bottomRef }: ChatMessageListProps) => {
  const scrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="flex-1 p-4 max-w-4xl mx-auto w-full flex flex-col gap-6 overflow-y-auto">
      {messages.map((msg, index) => (
        <ChatMessage
          key={index}
          role={msg.role}
          content={msg.content}
          isLatest={index === messages.length - 1}
          onUpdate={index === messages.length - 1 ? scrollToBottom : undefined}
        />
      ))}

      <div ref={bottomRef} />
    </main>
  );
};

import { type RefObject, useCallback } from 'react';
import { ChatMessage } from './ChatMessage';
import type { ChatMessage as ChatMessageType } from '../../hooks/chatHooks/useChatMessages';


interface ChatMessageListProps {
  messages: ChatMessageType[];
  bottomRef: RefObject<HTMLDivElement | null>;
  loading?: boolean;
  latestAssistantStreamDone?: boolean;
  voiceEnabled?: boolean;
}

export const ChatMessageList = ({
  messages,
  bottomRef,
  loading = false,
  latestAssistantStreamDone = false,
  voiceEnabled = true,
}: ChatMessageListProps) => {
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [bottomRef]);

  return (
    <main className="flex-1 p-4 max-w-4xl mx-auto w-full flex flex-col gap-6 overflow-y-auto">
      {messages.map((msg, index) => {
        const isLast = index === messages.length - 1;
        return (
          <ChatMessage
            key={msg.id}
            role={msg.role}
            content={msg.content}
            isLatest={isLast}
            loading={loading && isLast}
            streamTurnComplete={isLast && msg.role === 'assistant' ? latestAssistantStreamDone : false}
            voiceEnabled={voiceEnabled}
            onUpdate={isLast ? scrollToBottom : undefined}
          />
        );
      })}

      <div ref={bottomRef} />
    </main>
  );
};

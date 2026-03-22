import { Bot, User } from 'lucide-react';
import { Message } from '../Message/message';
import { TypingMessage } from './TypingMessage';
import { useTextToSpeech } from '../../hooks/chatHooks/useTextToSpeech';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  onUpdate?: () => void;
  isLatest?: boolean;
  loading?: boolean;
  streamTurnComplete?: boolean;
}

export const ChatMessage = ({
  role,
  content,
  onUpdate,
  isLatest = false,
  loading = false,
  streamTurnComplete = false,
}: ChatMessageProps) => {
  const streamLive = role === 'assistant' && isLatest && loading;

  useTextToSpeech(content, {
    enabled: role === 'assistant' && isLatest && content.length > 0,
    streaming: streamLive,
  });
  return (
    <div className={`flex gap-4 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      {role === 'assistant' ? (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 flex-shrink-0 flex items-center justify-center mt-1">
          <Bot className="w-5 h-5 text-white" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-lg bg-slate-700 flex-shrink-0 flex items-center justify-center mt-1">
          <User className="w-5 h-5 text-slate-300" />
        </div>
      )}

      {/* Message Bubble */}
      {role === 'assistant' ? (
        <Message className="bg-slate-900 border-indigo-500/20 max-w-2xl">
          <div className="text-slate-300 leading-relaxed prose-sm">
            {content === '' ? (
              <div className="flex items-center gap-2 h-6 text-slate-400">
                <span
                  className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            ) : (
              <TypingMessage
                content={content}
                onUpdate={onUpdate}
                isLatest={isLatest}
                streamLive={streamLive}
                streamTurnComplete={streamTurnComplete}
              />
            )}
          </div>
        </Message>
      ) : (
        <div className="bg-indigo-600 rounded-xl p-4 max-w-2xl text-white shadow-lg shadow-indigo-500/10">
          <p className="leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
      )}
    </div>
  );
};

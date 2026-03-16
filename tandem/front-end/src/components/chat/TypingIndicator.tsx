import { Bot } from 'lucide-react';
import { Message } from '../Message/message';

export const TypingIndicator = () => {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 flex-shrink-0 flex items-center justify-center mt-1">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <Message className="bg-slate-900 border-indigo-500/20">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </Message>
    </div>
  );
};

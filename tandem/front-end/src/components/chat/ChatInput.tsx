import React from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';

export interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  loading: boolean;
}

export const ChatInput = ({ input, setInput, onSend, loading }: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 border-t border-slate-800 bg-slate-950/50 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto relative">
        <Input
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your code..."
          className="pr-24 py-4 text-base"
          disabled={loading}
        />
        <div className="absolute right-2 top-2 flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 rounded-full hover:bg-slate-800 text-slate-400"
          >
            <Sparkles className="w-4 h-4" />
          </Button>
          <Button size="sm" className="h-8 px-3" onClick={onSend} disabled={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 mt-2">
        AI can make mistakes. Please review generated code.
      </p>
    </div>
  );
};

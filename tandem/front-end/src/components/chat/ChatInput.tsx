import { Send, Mic, AudioLines } from 'lucide-react';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';
import { useSpeechRecognition } from '../../hooks/chatHooks/useSpeechRecognition';

export interface ChatInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
  loading: boolean;
  disabled?: boolean;
}

export const ChatInput = ({
  input,
  setInput,
  onSend,
  loading,
  disabled = false,
}: ChatInputProps) => {
  const blocked = loading || disabled;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const { listening, startDictation } = useSpeechRecognition(setInput);

  return (
    <div className="p-4 border-t border-[var(--color-bg-light)] bg-[var(--ai-blocks-color)] backdrop-blur-xl">
      <div className="max-w-4xl mx-auto relative">
        <Input
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your code..."
          className="pr-24 py-4 text-base"
          disabled={blocked}
        />
        <div className="absolute right-2 top-2 flex items-center gap-2">
          <Button
            size="sm"
            variant="primary-no-outline"
            onClick={startDictation}
            // className={}
            disabled={blocked}
            className={`focus:outline-none focus:ring-0 ${listening ? 'bg-white text-black' : ''}`}
          >
            {listening ? <AudioLines size={18} className="animate-pulse" /> : <Mic size={18} />}
          </Button>
          <Button size="sm" className="h-8 px-3" onClick={onSend} disabled={blocked}>
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

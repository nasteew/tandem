import { Send, Mic, AudioLines } from 'lucide-react';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';
import { useSpeechRecognition } from '../../hooks/chatHooks/useSpeechRecognition';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('agent');
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
          placeholder={t('input.placeholder')}
          className="pr-24 py-3 sm:py-4 text-sm sm:text-base"
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
            {listening ? <AudioLines size={14} className="animate-pulse" /> : <Mic size={14} />}
          </Button>
          <Button size="sm" className="h-8 px-3" onClick={onSend} disabled={blocked}>
            <Send size={14} />
          </Button>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 mt-2">
        {t('input.disclaimer')}
      </p>
    </div>
  );
};

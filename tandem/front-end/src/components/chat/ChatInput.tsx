import React, { useRef, useState } from 'react';
import { type SpeechRecognition, type SpeechRecognitionConstructor } from '../../types/SpeechRecognition';
import { Send, Mic, AudioLines } from 'lucide-react';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';

export interface ChatInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>
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

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [listening, setListening] = useState(false);

React.useEffect(() => {
  const SpeechRecognition =
    (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor })
      .SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor })
      .webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.log("Speech recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onstart = () => {
    setListening(true);
  };

  recognition.onend = () => {
    setListening(false);  
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    setInput((prev) => prev ? prev + " " + transcript : transcript);
  };

  recognitionRef.current = recognition;

}, []);

  const startDictation = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
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
            variant="primary-no-outline"
            onClick={startDictation}
            // className={}
            disabled={loading}
            className={`focus:outline-none focus:ring-0 ${listening ? 'bg-white text-black' : ''}`}
          >
            {listening ? <AudioLines size={18} className="animate-pulse" /> : <Mic size={18} />}
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

import { useEffect, useRef } from 'react';

function toSpeakableFragment(s: string): string {
  return s
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\[([^\]]*)]\([^)]*\)/g, '$1')
    .replace(/#{1,6}\s*/g, '')
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

type UseTextToSpeechOptions = {
  enabled: boolean;
  streaming?: boolean;
};

const DEBOUNCE_MS = 320;

export const useTextToSpeech = (
  text: string,
  { enabled, streaming = false }: UseTextToSpeechOptions
) => {
  const lastSpokenEndRef = useRef(0);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      lastSpokenEndRef.current = 0;
      window.speechSynthesis?.cancel();
      return undefined;
    }

    if (!text) return undefined;
    if (typeof SpeechSynthesisUtterance === 'undefined' || !window.speechSynthesis)
      return undefined;

    const flush = () => {
      const start = lastSpokenEndRef.current;
      if (text.length <= start) return;

      const raw = text.slice(start);
      lastSpokenEndRef.current = text.length;

      const chunk = toSpeakableFragment(raw);
      if (!chunk) return;

      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    };

    if (streaming) {
      const id = window.setTimeout(flush, DEBOUNCE_MS);
      return () => clearTimeout(id);
    }

    flush();
    return undefined;
  }, [text, enabled, streaming]);
};

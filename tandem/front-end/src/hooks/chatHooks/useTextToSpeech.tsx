import { useEffect, useRef } from 'react';

function toSpeakableFragment(s: string): string {
  return s
    .replace(/```/g, ' ')
    .replace(/`/g, ' ')
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

      let raw = text.slice(start);
      
      if (streaming) {
        const lastBoundary = raw.search(/[\s.,!?;:]+[^\s.,!?;:]*$/);
        if (lastBoundary !== -1) {
          raw = raw.slice(0, lastBoundary + 1);
        } else {
          return;
        }
      }

      if (!raw) return;
      lastSpokenEndRef.current = start + raw.length;

      const chunk = toSpeakableFragment(raw);
      if (!chunk) return;

      const utterance = new SpeechSynthesisUtterance(chunk);
      const lang = localStorage.getItem('i18nextLng') || 'en';
      utterance.lang = lang.startsWith('ru') ? 'ru-RU' : 'en-US';
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

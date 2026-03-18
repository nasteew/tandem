import { useEffect } from 'react';

export const useTextToSpeech = (
  text: string,
  enabled: boolean
) => {
  useEffect(() => {
    if (!enabled || !text) return;

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = 'en-US'; 
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, enabled]);
};
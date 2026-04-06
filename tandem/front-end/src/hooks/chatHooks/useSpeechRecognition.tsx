import { useEffect, useRef, useState } from 'react';
import { type SpeechRecognition, type SpeechRecognitionConstructor } from '../../types/SpeechRecognition';

export const useSpeechRecognition = (setInput: React.Dispatch<React.SetStateAction<string>>) => {
const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [listening, setListening] = useState(false);

useEffect(() => {
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
  const currentLang = localStorage.getItem('i18nextLng') || 'en';
  recognition.lang = currentLang.startsWith('ru') ? 'ru-RU' : 'en-US';
  recognition.interimResults = false;

  recognition.onstart = () => setListening(true);
  recognition.onend = () => setListening(false);

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    setInput((prev) => prev ? prev + " " + transcript : transcript);
  };

  recognitionRef.current = recognition;

}, [setInput]);

const startDictation = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return { listening, startDictation };
}
export interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly [index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

export interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

export interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;

  start(): void;
  stop(): void;

  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

export interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}
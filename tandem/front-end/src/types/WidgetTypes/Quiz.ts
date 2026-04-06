import type { BaseLevel } from './index';

export interface QuizOption {
  en?: string;
  ru?: string;
}

export interface QuizPayload {
  question: {
    en?: string;
    ru?: string;
  };
  options: QuizOption[];
  correctIndex: number;
}

export interface QuizLevel extends BaseLevel<QuizPayload> {
  type: 'quiz';
}

export interface QuizAnswer {
  selectedIndex: number;
}

import { BaseLevel } from './base-level.js';

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

export interface QuizSolution {
  correctIndex: number;
}

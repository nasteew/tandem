import { BaseLevel } from './base-level.js';

export interface CodeCompletionBlank {
  id: string;
  correctAnswer: string;
  hint?: string;
}

export interface CodeCompletionPayload {
  codeSnippet: string;
  language: string;
  blanks: CodeCompletionBlank[];
}

export interface CodeCompletionLevel extends BaseLevel<CodeCompletionPayload> {
  type: 'code-completion';
}

export interface CodeCompletionSolution {
  answers: string[];
}

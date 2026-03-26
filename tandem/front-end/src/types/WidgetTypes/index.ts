import type { AsyncSorterLevel, AsyncSorterSolution } from './AsyncSorter';
import type { CodeCompletionLevel, CodeCompletionSolution } from './CodeCompletion';
import type { QuizLevel, QuizAnswer } from './Quiz';

export type { ValidateResponse } from './AsyncSorter';

export interface BaseLevel<TPayload> {
  id: string;
  game: string;
  version: number;
  difficulty: number;
  tags: string[];
  payload: TPayload;
}

export type Levels = AsyncSorterLevel | CodeCompletionLevel | QuizLevel;

export type Solutions = AsyncSorterSolution | CodeCompletionSolution | QuizAnswer;

export type LevelItem = {
  id: number;
  completed: boolean;
};

export interface Widget {
  id: string;
  label: string;
  description: string;
  tag: string;
  accent: string;
}

export type WidgetsResponse = Widget[];

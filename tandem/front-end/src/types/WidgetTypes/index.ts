import type { AsyncSorterLevel, AsyncSorterSolution } from './AsyncSorter';
import type { CodeCompletionLevel, CodeCompletionSolution } from './CodeCompletion';

export type { ValidateResponse } from './AsyncSorter';

export interface BaseLevel<TPayload> {
  id: string;
  game: string;
  version: number;
  difficulty: number;
  tags: string[];
  payload: TPayload;
}

export type Levels = AsyncSorterLevel | CodeCompletionLevel;

export type Solutions = AsyncSorterSolution | CodeCompletionSolution;

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

import type { AsyncSorterLevel, AsyncSorterSolution } from './AsyncSorter';

export type { ValidateResponse } from './AsyncSorter';

export interface BaseLevel<TPayload> {
  id: string;
  game: string;
  version: number;
  difficulty: number;
  tags: string[];
  payload: TPayload;
}

export type Levels = AsyncSorterLevel;

export type Solutions = AsyncSorterSolution;

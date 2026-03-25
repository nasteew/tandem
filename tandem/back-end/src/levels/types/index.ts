import { AsyncSorterLevel, AsyncSorterSolution } from './async-sorter.level.js';
import {
  CodeCompletionLevel,
  CodeCompletionSolution,
} from './code-completion.level.js';

export type Levels = AsyncSorterLevel | CodeCompletionLevel;

export function isAnyLevel(json: unknown): json is Levels {
  return (
    typeof json === 'object' &&
    json !== null &&
    'type' in json &&
    typeof json.type === 'string'
  );
}

export type { AsyncSorterLevel, CodeCompletionLevel };

export type Solutions = AsyncSorterSolution | CodeCompletionSolution;

export function isAnySolution(json: unknown): json is Solutions {
  return typeof json === 'object' && json !== null;
}

export interface WidgetMeta {
  id: string;
  label: string;
  description: string;
  tag: string;
  accent: string;
}

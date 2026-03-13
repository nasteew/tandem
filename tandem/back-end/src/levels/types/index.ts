import { AsyncSorterLevel } from './async-sorter.level.js';

export type Levels = AsyncSorterLevel;

export function isAnyLevel(json: unknown): json is Levels {
  return (
    typeof json === 'object' &&
    json !== null &&
    'type' in json &&
    typeof json.type === 'string'
  );
}

export type { AsyncSorterLevel };

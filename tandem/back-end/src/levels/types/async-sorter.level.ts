import { BaseLevel } from './base-level.js';

export interface AsyncSorterBlock {
  id: string;
  code: string;
  label: string;
}

export interface AsyncSorterPayload {
  codeSnippet: string;
  blocks: AsyncSorterBlock[];
}

export interface AsyncSorterLevel extends BaseLevel<AsyncSorterPayload> {
  type: 'async-sorter';
}

export interface AsyncSorterSolution {
  callStack: string[];
  microtasks: string[];
  macrotasks: string[];
  outputOrder: string[];
}

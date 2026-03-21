import type { BaseLevel } from './index';

export interface AsyncSorterBlock {
  id: string;
  code: string;
  label: string;
  type: 'callstack' | 'microtask' | 'macrotask';
  creates?: string[];
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

export interface ValidateResponse<TSolution = AsyncSorterSolution> {
  correct: boolean;
  answer: TSolution;
}

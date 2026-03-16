export type ZoneType = 'pool' | 'callStack' | 'microtasks' | 'macrotasks';

// Совместим с AsyncSorterBlock из бэкенда (label опциональный)
export interface BlockData {
  id: string;
  code: string;
  label?: string;
}

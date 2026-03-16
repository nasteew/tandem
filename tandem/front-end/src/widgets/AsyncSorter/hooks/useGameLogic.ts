import { useState, useCallback, useMemo } from 'react';
import type { ZoneType } from '../types/ComponentTypes';
import type { AsyncSorterBlock } from '@/types/WidgetTypes/AsyncSorter';

function detectZone(x: number, y: number): ZoneType | null {
  const el = document.elementFromPoint(x, y);
  if (!el) return null;
  const zoneEl = el.closest<HTMLElement>('[data-zone]');
  return (zoneEl?.dataset.zone as ZoneType) ?? null;
}

function simulateEventLoop(blocks: AsyncSorterBlock[], zones: Record<ZoneType, string[]>) {
  const result: string[] = [];

  function appendNested(parentId: string) {
    const nested = blocks.filter((b) => b.creates?.includes(parentId));
    for (const n of nested) {
      result.push(n.id);
      appendNested(n.id);
    }
  }

  for (const id of zones.callStack) {
    result.push(id);
    appendNested(id);
  }

  for (const id of zones.microtasks) {
    result.push(id);
    appendNested(id);
  }

  for (const id of zones.macrotasks) {
    result.push(id);
    appendNested(id);
  }

  return result;
}
export function useGameLogic(initialIds: string[], blocks: AsyncSorterBlock[]) {
  const [zones, setZones] = useState<Record<ZoneType, string[]>>({
    pool: initialIds,
    callStack: [],
    microtasks: [],
    macrotasks: [],
  });

  const handleDrop = useCallback((x: number, y: number, id: string, sourceZone: string) => {
    const targetZone = detectZone(x, y) ?? 'pool';
    setZones((prev) => {
      const next = { ...prev };
      next[sourceZone as ZoneType] = next[sourceZone as ZoneType].filter((b) => b !== id);
      if (!next[targetZone].includes(id)) {
        next[targetZone] = [...next[targetZone], id];
      }
      return next;
    });
  }, []);

  const executionOrder = useMemo(() => {
    return simulateEventLoop(blocks, zones);
  }, [blocks, zones]);

  return { zones, handleDrop, executionOrder };
}

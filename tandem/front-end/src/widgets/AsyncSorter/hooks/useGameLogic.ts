import { useState, useCallback } from 'react';
import type { ZoneType } from '../types/ComponentTypes';

function detectZone(x: number, y: number): ZoneType | null {
  const el = document.elementFromPoint(x, y);
  if (!el) return null;
  const zoneEl = el.closest<HTMLElement>('[data-zone]');
  return (zoneEl?.dataset.zone as ZoneType) ?? null;
}

export function useGameLogic(initialIds: string[]) {
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

  const resetZones = useCallback((initial: string[]) => {
    setZones({
      pool: initial,
      callStack: [],
      microtasks: [],
      macrotasks: [],
    });
  }, []);

  return { zones, handleDrop, resetZones };
}

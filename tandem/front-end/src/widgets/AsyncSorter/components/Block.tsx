import React from 'react';
import type { ZoneType, BlockData } from '../types/ComponentTypes';

interface BlockProps {
  id: string;
  zone: ZoneType;
  blocks: BlockData[];
  draggingId: string | null;
  onPointerDown: (e: React.PointerEvent, id: string, zone: ZoneType) => void;
}

export function Block({ id, zone, draggingId, onPointerDown }: BlockProps) {
  if (draggingId === id) {
    return null;
  }

  return (
    <div
      onPointerDown={(e) => onPointerDown(e, id, zone)}
      className="px-3 py-2 rounded shrink-0 whitespace-nowrap font-mono text-sm cursor-grab select-none touch-none transition-all"
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--border-light)',
        backdropFilter: 'var(--glass-blur)',
        color: 'var(--color-text-light)',
      }}
    >
      {id}
    </div>
  );
}

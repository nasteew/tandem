import React from 'react';
import type { ZoneType, BlockData } from '../../types/ComponentTypes';

interface BlockProps {
  id: string;
  label?: string;
  zone: ZoneType;
  blocks: BlockData[];
  draggingId: string | null;
  onPointerDown: (e: React.PointerEvent, id: string, zone: ZoneType) => void;
}

export function Block({ id, label, zone, draggingId, onPointerDown }: BlockProps) {
  if (draggingId === id) return null;

  return (
    <div
      onPointerDown={(e) => onPointerDown(e, id, zone)}
      className="
    w-10 h-10
    rounded-lg
    flex items-center justify-center
    font-mono text-sm
    cursor-grab select-none touch-none
    transition-all duration-300

    bg-[var(--bg-primary)]
    border border-[var(--color-primary)]
    backdrop-blur-xl
    text-[var(--color-text-light)]

    shadow-[0_0_4px_rgba(96,165,250,0.25)]
    hover:shadow-[0_0_10px_var(--color-primary)]
    hover:-translate-y-[2px]
    active:scale-[0.92]
  "
    >
      {label ?? id}
    </div>
  );
}

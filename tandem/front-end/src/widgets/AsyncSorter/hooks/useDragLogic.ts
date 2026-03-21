import { useCallback, useEffect, useRef, useState } from 'react';
import type { DragStartInfo, DropCallback } from '../types/DragTypes';

export function useDrag(onDrop?: DropCallback) {
  const [dragInfo, setDragInfo] = useState<DragStartInfo | null>(null);
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const dragRef = useRef<DragStartInfo | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const onDropRef = useRef<DropCallback | undefined>(undefined);

  useEffect(() => {
    onDropRef.current = onDrop;
  }, [onDrop]);

  const startDrag = useCallback((info: DragStartInfo) => {
    dragRef.current = info;
    setDragInfo(info);

    function getZoneUnderCursor(x: number, y: number): string | null {
      const els = document.elementsFromPoint(x, y);
      const zoneEl = els.find(
        (el) => el instanceof HTMLElement && (el as HTMLElement).dataset.zone
      ) as HTMLElement | undefined;
      return zoneEl?.dataset.zone ?? null;
    }

    function onMove(e: PointerEvent) {
      const ghost = ghostRef.current;
      const drag = dragRef.current;
      if (!ghost || !drag) return;

      ghost.style.transform = `translate(${e.clientX - drag.offsetX}px, ${e.clientY - drag.offsetY}px)`;

      const zone = getZoneUnderCursor(e.clientX, e.clientY);
      setActiveZone((prev) => (prev === zone ? prev : zone));
    }

    function onUp(e: PointerEvent) {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);

      const drag = dragRef.current;
      if (!drag) return;

      onDropRef.current?.(e.clientX, e.clientY, drag.id, drag.sourceZone);
      dragRef.current = null;
      setDragInfo(null);
      setActiveZone(null);
    }

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, []);

  return { dragInfo, activeZone, ghostRef, startDrag };
}

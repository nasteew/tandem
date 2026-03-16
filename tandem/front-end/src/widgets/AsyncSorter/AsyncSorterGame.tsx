import React, { useCallback } from 'react';
import { useDrag } from './hooks/useDragLogic';
import { useGameLogic } from './hooks/useGameLogic';
import { CodePanel } from './components/CodePanel';
import { Block } from './components/Block';
import { Zone } from './components/Zone';
import type { ZoneType, BlockData } from './types/ComponentTypes';
import type { AsyncSorterSolution, ValidateResponse } from '@/types/WidgetTypes/AsyncSorter';
import { Button } from '@/components/ui/Button/Button';

export interface AsyncSorterGameProps {
  level: {
    id: string;
    payload: {
      codeSnippet: string;
      blocks: BlockData[];
    };
  };
  onValidate: (answer: AsyncSorterSolution) => Promise<ValidateResponse>;
  onNextLevel: () => void;
}

export const AsyncSorterGame = ({ level, onNextLevel }: AsyncSorterGameProps) => {
  const { codeSnippet, blocks } = level.payload;

  const { zones, handleDrop } = useGameLogic(blocks.map((b) => b.id));
  const { dragInfo, activeZone, ghostRef, startDrag } = useDrag(handleDrop);

  // const [result, setResult] = useState<ValidateResponse<AsyncSorterSolution> | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent, id: string, zone: ZoneType) => {
      e.preventDefault();
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      startDrag({
        id,
        sourceZone: zone,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
        startX: e.clientX,
        startY: e.clientY,
      });
    },
    [startDrag]
  );

  const draggingBlock = dragInfo ? blocks.find((b) => b.id === dragInfo.id) : null;
  const liveOrder = [...zones.callStack, ...zones.microtasks, ...zones.macrotasks];

  const handleCheck = async () => {
    // const res = await onValidate({
    //   callStack: zones.callStack,
    //   microtasks: zones.microtasks,
    //   macrotasks: zones.macrotasks,
    //   outputOrder: [...zones.callStack, ...zones.microtasks, ...zones.macrotasks],
    // });
    // setResult(res)
  };

  return (
    <div className="relative min-h-screen px-6 pt-10 flex justify-center bg-[var(--bg-primary)] text-[var(--color-text-light)]">
      <div className="w-full max-w-5xl space-y-10">
        <div className="flex gap-6 items-start">
          <div className="flex-1">
            <CodePanel code={codeSnippet} />
          </div>

          <div className="w-[320px]">
            <Zone
              type="pool"
              title="Instruction Bus"
              subtitle="Drag blocks into execution queues"
              horizontal
              isHighlighted={activeZone === 'pool'}
            >
              {zones.pool.map((id) => (
                <Block
                  key={id}
                  id={id}
                  zone="pool"
                  blocks={blocks}
                  draggingId={dragInfo?.id ?? null}
                  onPointerDown={onPointerDown}
                />
              ))}
            </Zone>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <Zone
            type="callStack"
            title="Call Stack"
            subtitle="Synchronous execution"
            horizontal
            isHighlighted={activeZone === 'callStack'}
          >
            {zones.callStack.map((id) => (
              <Block
                key={id}
                id={id}
                zone="callStack"
                blocks={blocks}
                draggingId={dragInfo?.id ?? null}
                onPointerDown={onPointerDown}
              />
            ))}
          </Zone>

          <Zone
            type="microtasks"
            title="Microtasks Queue"
            subtitle="Promise jobs"
            horizontal
            isHighlighted={activeZone === 'microtasks'}
          >
            {zones.microtasks.map((id) => (
              <Block
                key={id}
                id={id}
                zone="microtasks"
                blocks={blocks}
                draggingId={dragInfo?.id ?? null}
                onPointerDown={onPointerDown}
              />
            ))}
          </Zone>

          <Zone
            type="macrotasks"
            title="Macrotasks Queue"
            subtitle="Timers, events"
            horizontal
            isHighlighted={activeZone === 'macrotasks'}
          >
            {zones.macrotasks.map((id) => (
              <Block
                key={id}
                id={id}
                zone="macrotasks"
                blocks={blocks}
                draggingId={dragInfo?.id ?? null}
                onPointerDown={onPointerDown}
              />
            ))}
          </Zone>
        </div>

        <div className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--border-medium)]">
          <div className="font-semibold mb-2">Execution order preview:</div>

          {liveOrder.length > 0 ? (
            <div className="font-mono text-sm">{liveOrder.join(' → ')}</div>
          ) : (
            <div className="text-sm text-[var(--color-text-muted)]">
              Drag blocks into queues to see execution order
            </div>
          )}
        </div>
        <div className="flex gap-4 justify-center">
          <Button onClick={handleCheck} size="md">
            Check Answer
          </Button>

          <Button onClick={onNextLevel} size="md" variant="secondary">
            Next Level
          </Button>
        </div>
      </div>

      {draggingBlock && dragInfo && (
        <div
          ref={ghostRef}
          className="fixed z-50 px-3 py-2 rounded pointer-events-none select-none whitespace-nowrap font-mono text-sm"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)',
            border: '1px solid var(--glass-border)',
            color: 'var(--color-text-light)',
            top: 0,
            left: 0,
            transform: `translate(${dragInfo.startX - dragInfo.offsetX}px, ${dragInfo.startY - dragInfo.offsetY}px)`,
            willChange: 'transform',
          }}
        >
          {draggingBlock.code}
        </div>
      )}
    </div>
  );
};

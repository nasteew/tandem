import { useCallback, useState } from 'react';
import { useDrag } from './hooks/useDragLogic';
import { useGameLogic } from './hooks/useGameLogic';
import { CodePanel } from './components/CodePanel';
import { Block } from './components/Block/Block';
import { Zone } from './components/Zone';
import type { ZoneType } from './types/ComponentTypes';
import type {
  AsyncSorterLevel,
  AsyncSorterSolution,
  ValidateResponse,
} from '@/types/WidgetTypes/AsyncSorter';
import { Button } from '@/components/ui/Button/Button';
import { ExecutionOrderInput } from './components/ExecutionOrderInput/ExecutionOrderInput';
import { Modal } from '@/components/ui/Modal/Modal';
import { HappyRobot } from './components/HappyRobot/HappyRobot';
import { AngryRobot } from './components/AngryRobot/AngryRobot';
import { CountdownTimer } from './components/CountdownTimer';

export interface AsyncSorterGameProps {
  level: AsyncSorterLevel;
  onValidate: (answer: AsyncSorterSolution) => Promise<ValidateResponse>;
  onNextLevel: () => void;
}

export const AsyncSorterGame = ({ level, onValidate, onNextLevel }: AsyncSorterGameProps) => {
  const { codeSnippet, blocks } = level.payload;

  const { zones, handleDrop, resetZones } = useGameLogic(blocks.map((b) => b.id));
  const { dragInfo, activeZone, ghostRef, startDrag } = useDrag(handleDrop);

  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<'win' | 'lose' | null>(null);

  const [resetKey, setResetKey] = useState(0);

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

  const handleCheck = async () => {
    const res = await onValidate({
      outputOrder: userOrder,
      microtasks: zones.microtasks,
      macrotasks: zones.macrotasks,
      callStack: zones.callStack,
    });

    if (res.correct) {
      setModalState('win');
    } else {
      setModalState('lose');
    }

    setModalOpen(true);
  };

  const resetGame = () => {
    setModalOpen(false);

    setResetKey((k) => k + 1);

    setUserOrder([]);

    const initialIds = blocks.map((b) => b.id);
    resetZones(initialIds);
  };

  const allBlocksPlaced =
    zones.pool.length === 0 &&
    zones.callStack.length + zones.microtasks.length + zones.macrotasks.length === blocks.length;

  const orderFilled = userOrder.length === blocks.length;

  const isReady = allBlocksPlaced && orderFilled;

  return (
    <div className="relative min-h-screen px-4 pt-15 flex justify-center bg-[var(--bg-primary)] text-[var(--color-text-light)]">
      <div className="w-full max-w-5xl space-y-5">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 w-full">
            <CodePanel code={codeSnippet} />
          </div>

          <div className="w-full md:w-[320px]">
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
                  label={blocks.find((b) => b.id === id)?.label}
                  zone="pool"
                  blocks={blocks}
                  draggingId={dragInfo?.id ?? null}
                  onPointerDown={onPointerDown}
                />
              ))}
            </Zone>
            <CountdownTimer
              initialTime={60}
              resetKey={resetKey}
              onFinish={() => {
                setModalState('lose');
                setModalOpen(true);
              }}
            />
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-5">
              <Button onClick={handleCheck} size="md" className="w-full" disabled={!isReady}>
                Check Answer
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                label={blocks.find((b) => b.id === id)?.label}
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
                label={blocks.find((b) => b.id === id)?.label}
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
                label={blocks.find((b) => b.id === id)?.label}
                zone="macrotasks"
                blocks={blocks}
                draggingId={dragInfo?.id ?? null}
                onPointerDown={onPointerDown}
              />
            ))}
          </Zone>
        </div>

        <ExecutionOrderInput blocks={blocks} userOrder={userOrder} setUserOrder={setUserOrder} />
      </div>

      {draggingBlock && dragInfo && (
        <div
          ref={ghostRef}
          className="fixed z-50 px-3 py-2 rounded pointer-events-none select-none whitespace-nowrap font-mono text-sm  w-10 h-10
  rounded-lg
  flex items-center justify-center
  font-mono text-sm
  bg-gradient-to-br
      from-[rgba(20,30,50,0.65)]
      to-[rgba(10,20,35,0.55)]
    border border-[var(--accent-blue)]
  backdrop-blur-xl
  text-[var(--color-text-light)]

  shadow-[0_0_4px_rgba(96,165,250,0.25)]"
          style={{
            top: 0,
            left: 0,
            transform: `translate(${dragInfo.startX - dragInfo.offsetX}px, ${dragInfo.startY - dragInfo.offsetY}px)`,
            willChange: 'transform',
          }}
        >
          {draggingBlock.label ?? draggingBlock.code}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalState === 'win' ? 'You Win!' : 'Try Again'}
        showCloseButton={false}
      >
        <div className="relative flex flex-col items-center justify-center py-6">
          {modalState === 'win' && (
            <>
              <HappyRobot />
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 mb-4">
                Great job!
              </div>
            </>
          )}

          {modalState === 'lose' && (
            <>
              <AngryRobot />
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400 mb-4">
                That’s not correct — try again
              </div>
            </>
          )}

          <div className="flex gap-3 mt-6">
            {modalState === 'lose' && (
              <Button size="md" variant="secondary" onClick={resetGame}>
                Try Again
              </Button>
            )}

            <Button onClick={onNextLevel} size="md" variant="primary">
              Next Level
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

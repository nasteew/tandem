import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { HappyRobot } from '@/widgets/AsyncSorter/components/HappyRobot/HappyRobot';
import { AngryRobot } from '@/widgets/AsyncSorter/components/AngryRobot/AngryRobot';
import { CountdownTimer } from '@/widgets/AsyncSorter/components/CountdownTimer';
import type { TrueFalseLevel, TrueFalseAnswer } from '@/types/WidgetTypes/TrueFalse';

interface TrueFalseWidgetProps {
  level: TrueFalseLevel;
  onSubmit: (answer: TrueFalseAnswer) => Promise<{ correct: boolean }>;
  onNextLevel: () => void;
  onSuccess: (timeMs: number) => void;
}

export const TrueFalseWidget = ({
  level,
  onSubmit,
  onNextLevel,
  onSuccess,
}: TrueFalseWidgetProps) => {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const { statement, explanation } = level.payload;
  const text = statement.en || statement.ru || '';

  const handleSelect = async (value: boolean) => {
    if (result !== null) return;
    setSelected(value);
    try {
      const res = await onSubmit({ value });
      if (res.correct) {
        setResult('correct');
        onSuccess(elapsedMs);
        setModalOpen(true);
      } else {
        setResult('incorrect');
        setModalOpen(true);
      }
    } catch (error) {
      console.error('Validation failed', error);
      setSelected(null);
      setResult(null);
    }
  };

  const resetGame = () => {
    setResult(null);
    setSelected(null);
    setModalOpen(false);
    setElapsedMs(0);
    setResetKey((k) => k + 1);
  };

  const handleNext = () => {
    setModalOpen(false);
    onNextLevel();
  };

  const handleTimeout = () => {
    if (result === null) {
      setResult('incorrect');
      setModalOpen(true);
    }
  };

  const handleTimeUpdate = (elapsed: number) => {
    setElapsedMs(elapsed);
  };

  return (
    <div className="relative min-h-screen px-4 pt-15 flex justify-center bg-[var(--bg-primary)] text-[var(--color-text-light)]">
      <div className="w-full max-w-2xl space-y-6">
        <div
          className="p-6 rounded-2xl border backdrop-blur-md"
          style={{
            background: 'var(--glass-bg)',
            borderColor: 'var(--border-light)',
          }}
        >
          <h2 className="text-xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {text}
          </h2>

          <div className="mb-6">
            <CountdownTimer
              key={resetKey}
              initialTime={60}
              onFinish={handleTimeout}
              paused={modalOpen}
              onTimeUpdate={handleTimeUpdate}
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleSelect(true)}
              disabled={result !== null}
              className={`
                px-8 py-4 rounded-xl text-xl font-semibold transition-all duration-200
                ${
                  selected === true
                    ? 'bg-green-500/20 border-green-400 text-green-400'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-green-400/50'
                }
                border disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              TRUE
            </button>
            <button
              onClick={() => handleSelect(false)}
              disabled={result !== null}
              className={`
                px-8 py-4 rounded-xl text-xl font-semibold transition-all duration-200
                ${
                  selected === false
                    ? 'bg-red-500/20 border-red-400 text-red-400'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-red-400/50'
                }
                border disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              FALSE
            </button>
          </div>

          {result === 'incorrect' && explanation && (
            <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-400/30 text-sm">
              <strong>Explanation:</strong> {explanation.en || explanation.ru}
            </div>
          )}
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={result === 'correct' ? 'You Win!' : 'Try Again'}
        showCloseButton={false}
      >
        <div className="relative flex flex-col items-center justify-center py-6">
          {result === 'correct' && (
            <>
              <HappyRobot />
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 mb-4">
                Great job!
              </div>
            </>
          )}
          {result === 'incorrect' && (
            <>
              <AngryRobot />
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400 mb-4">
                That’s not correct — try again
              </div>
              {explanation && (
                <div className="text-center text-sm text-gray-300 mt-2">
                  {explanation.en || explanation.ru}
                </div>
              )}
            </>
          )}
          <div className="flex gap-3 mt-6">
            {result === 'incorrect' && (
              <Button size="md" variant="secondary" onClick={resetGame}>
                Try Again
              </Button>
            )}
            <Button onClick={handleNext} size="md" variant="primary">
              Next Level
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

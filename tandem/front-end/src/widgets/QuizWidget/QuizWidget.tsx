import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { HappyRobot } from '@/widgets/AsyncSorter/components/HappyRobot/HappyRobot';
import { AngryRobot } from '@/widgets/AsyncSorter/components/AngryRobot/AngryRobot';
import { CountdownTimer } from '@/widgets/AsyncSorter/components/CountdownTimer';
import type { QuizLevel, QuizAnswer } from '@/types/WidgetTypes/Quiz';

interface QuizWidgetProps {
  level: QuizLevel;
  onSubmit: (answer: QuizAnswer) => Promise<{ correct: boolean }>;
  onNextLevel: () => void;
  onSuccess: (timeMs: number) => void;
}

export const QuizWidget = ({ level, onSubmit, onNextLevel, onSuccess }: QuizWidgetProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const payload = level.payload;
  const question = payload.question.en || payload.question.ru || '';
  const options = payload.options.map((opt) => opt.en || opt.ru || '');

  const handleSelect = async (idx: number) => {
    if (result !== null) return;
    setSelectedIndex(idx);
    try {
      const res = await onSubmit({ selectedIndex: idx });
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
      setResult(null);
      setSelectedIndex(null);
    }
  };

  const resetGame = () => {
    setResult(null);
    setSelectedIndex(null);
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
    <div className="relative min-h-screen px-4 pt-15 flex justify-center text-[var(--color-text-light)]">
      <div className="w-full max-w-2xl space-y-6">
        <div
          className="p-6 rounded-2xl border backdrop-blur-md"
          style={{
            background: 'var(--glass-bg)',
            borderColor: 'var(--border-light)',
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {question}
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

          <div className="space-y-3">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={result !== null}
                className={`
                  w-full text-left px-4 py-3 rounded-lg border transition-all duration-200
                  ${
                    selectedIndex === idx
                      ? 'bg-blue-500/20 border-blue-400 text-white'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-400/50'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {opt}
              </button>
            ))}
          </div>
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

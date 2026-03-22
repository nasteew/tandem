import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';

export interface CodeCompletionGameProps {
  code: string;
  blanks: string[];
  correctAnswers: string[];
  onNextLevel: () => void;
}

export const CodeCompletionGame = ({
  code,
  blanks,
  correctAnswers,
  onNextLevel,
}: CodeCompletionGameProps) => {
  const [inputs, setInputs] = useState<string[]>(blanks.map(() => ''));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<'win' | 'lose' | null>(null);

  const handleInputChange = (value: string, index: number) => {
    const copy = [...inputs];
    copy[index] = value;
    setInputs(copy);
  };

  const handleCheck = () => {
    const isCorrect = inputs.every((input, idx) => input.trim() === correctAnswers[idx]);
    setModalState(isCorrect ? 'win' : 'lose');
    setModalOpen(true);
  };

  const resetGame = () => {
    setInputs(blanks.map(() => ''));
    setModalOpen(false);
  };

  return (
    <div className="relative min-h-screen px-4 pt-15 flex justify-center bg-[var(--bg-primary)] text-[var(--color-text-light)]">
      <div className="w-full max-w-3xl space-y-6">
        <pre className="bg-slate-900 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap">
          {code.split('___').map((part, idx) => (
            <span key={idx}>
              {part}
              {idx < blanks.length && (
                <input
                  type="text"
                  value={inputs[idx]}
                  onChange={(e) => handleInputChange(e.target.value, idx)}
                  className="w-20 mx-1 px-1 rounded border border-gray-600 bg-slate-800 text-white text-sm font-mono"
                />
              )}
            </span>
          ))}
        </pre>

        <div className="flex gap-4 justify-center">
          <Button onClick={handleCheck} size="md" variant="primary">
            Check Answer
          </Button>
          <Button onClick={resetGame} size="md" variant="secondary">
            Reset
          </Button>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalState === 'win' ? 'Correct!' : 'Try Again'}
        showCloseButton={true}
      >
        <div className="flex flex-col items-center justify-center py-4">
          {modalState === 'win' ? (
            <div className="text-xl font-bold text-green-400 mb-4">🎉 Great job!</div>
          ) : (
            <div className="text-xl font-bold text-red-400 mb-4">❌ That’s not correct</div>
          )}
          {modalState === 'win' && (
            <Button size="md" variant="primary" onClick={onNextLevel}>
              Next Level
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

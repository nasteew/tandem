import { useState } from 'react';
import { useCodeCompletionLogic } from './hooks/useCodeCompletionLogic';
import { CodeEditor } from './components/CodeEditor';
import { HintPanel } from './components/HintPanel';
import type {
  CodeCompletionLevel,
  CodeCompletionSolution,
} from '@/types/WidgetTypes/CodeCompletion';
import type { ValidateResponse } from '@/types/WidgetTypes';
import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { CountdownTimer } from '@/widgets/AsyncSorter/components/CountdownTimer';
import { HappyRobot } from '@/widgets/AsyncSorter/components/HappyRobot/HappyRobot';
import { AngryRobot } from '@/widgets/AsyncSorter/components/AngryRobot/AngryRobot';
import { useTranslation } from 'react-i18next';

export interface CodeCompletionGameProps {
  level: CodeCompletionLevel;
  onValidate: (answer: CodeCompletionSolution) => Promise<ValidateResponse>;
  onNextLevel: () => void;
  onSuccess: (timeMs: number) => void;
}

export const CodeCompletionGame = ({
  level,
  onValidate,
  onNextLevel,
  onSuccess,
}: CodeCompletionGameProps) => {
  const { t } = useTranslation('widgets');
  
  const { codeSnippet, blanks } = level.payload;

  const { inputs, handleInputChange, resetInputs, allFilled } = useCodeCompletionLogic(blanks);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<'win' | 'lose' | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleCheck = async () => {
    const res = await onValidate({ answers: inputs.map((v) => v.trim()) });

    if (res.correct) {
      setModalState('win');
      onSuccess?.(elapsedTime);
    } else {
      setModalState('lose');
    }

    setModalOpen(true);
  };

  const resetGame = () => {
    setModalOpen(false);
    setModalState(null);
    setResetKey((k) => k + 1);
    resetInputs();
  };

  return (
    <div className="relative min-h-screen px-4 pt-15 flex justify-center text-[var(--color-text-light)]">
      <div className="w-full max-w-3xl space-y-6">
        <CodeEditor codeSnippet={codeSnippet} inputs={inputs} onInputChange={handleInputChange} />

        <HintPanel blanks={blanks} difficulty={level.difficulty} />

        <CountdownTimer
          key={resetKey}
          initialTime={90}
          onTimeUpdate={(t) => setElapsedTime(t)}
          onFinish={() => {
            setModalState('lose');
            setModalOpen(true);
          }}
        />

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Button
            onClick={handleCheck}
            size="md"
            variant="primary"
            className="w-full sm:w-auto"
            disabled={!allFilled}
          >
            {t('codeCompletion.checkAnswer')}
          </Button>
          <Button onClick={resetGame} size="md" variant="secondary" className="w-full sm:w-auto">
            {t('codeCompletion.reset')}
          </Button>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalState === 'win' ? t('codeCompletion.winTitle') : t('codeCompletion.loseTitle')}
        showCloseButton={false}
      >
        <div className="relative flex flex-col items-center justify-center py-6">
          {modalState === 'win' && (
            <>
              <HappyRobot />
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 mb-4">
                {t('codeCompletion.winSubtitle')}
              </div>
            </>
          )}

          {modalState === 'lose' && (
            <>
              <AngryRobot />
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400 mb-4">
                {t('codeCompletion.loseSubtitle')}
              </div>
            </>
          )}

          <div className="flex gap-3 mt-6">
            {modalState === 'lose' && (
              <Button size="md" variant="secondary" onClick={resetGame}>
                {t('codeCompletion.btnTryAgain')}
              </Button>
            )}

            <Button onClick={onNextLevel} size="md" variant="primary">
              {t('codeCompletion.btnNextLevel')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

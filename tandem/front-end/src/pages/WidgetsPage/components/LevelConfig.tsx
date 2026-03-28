import { DifficultySelector } from './DifficultySelector';
import { LevelSelect } from './LevelSelect';
import { Button } from '@/components/ui/Button/Button';

interface Level {
  id: number;
  completed?: boolean;
}

interface Props {
  difficulties: string[];
  difficulty: string | null;
  setDifficulty: (d: string | null) => void;

  levels: Level[];
  levelsLoading: boolean;

  selectedLevel: string;
  setSelectedLevel: (v: string) => void;

  onStart: () => void;
}

export const LevelConfig = ({
  difficulties,
  difficulty,
  setDifficulty,
  levels,
  levelsLoading,
  selectedLevel,
  setSelectedLevel,
  onStart,
}: Props) => {
  return (
    <div
      className="p-6 rounded-2xl border space-y-6"
      style={{
        background: 'var(--color-card-bg)',
        borderColor: 'var(--border-light)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <h3 className="text-base font-semibold" style={{ color: 'var(--color-text-light)' }}>
        Configure Level
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DifficultySelector
          difficulties={difficulties}
          selected={difficulty}
          onSelect={setDifficulty}
          resetLevel={() => setSelectedLevel('')}
        />

        <LevelSelect
          levels={levels}
          selectedLevel={selectedLevel}
          onChange={setSelectedLevel}
          loading={levelsLoading}
        />
      </div>

      <Button
        onClick={onStart}
        disabled={!selectedLevel}
        variant="primary"
        size="md"
        fullWidth
        className="rounded-xl font-semibold text-sm transition-all duration-200"
      >
        Start
      </Button>
    </div>
  );
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useWidgets,
  useWidgetDifficulties,
  useLevels,
  useUpdateLastLevel,
} from '../../hooks/widgets/useWidgetLevels';
import { useAuthStore } from '@/store/authStore';
import { LoadingScreen } from '@/components/Loading/Loading';
import { ErrorBlock } from '@/components/ErrorComponent/ErrorComponent';
import { GamesList } from './components/GamesList';
import { LevelConfig } from './components/LevelConfig';

export const WidgetsPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const { data: widgets = [], isLoading: widgetsLoading, error: widgetsError } = useWidgets();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const selectedGameSafe = selectedGame ?? widgets[0]?.id ?? null;

  const { data: difficulties = [] } = useWidgetDifficulties(selectedGameSafe);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  const difficultySafe = difficulty ?? difficulties[0] ?? null;

  const { data: levels = [], isLoading: levelsLoading } = useLevels(
    selectedGameSafe,
    difficultySafe,
    userId
  );

  const [selectedLevel, setSelectedLevel] = useState('');

  const updateLast = useUpdateLastLevel(selectedGameSafe, difficultySafe, userId);

  const handleStart = () => {
    if (!selectedLevel || !selectedGameSafe || !difficultySafe) return;

    updateLast.mutate(
      {
        level: Number(selectedLevel),
        mode: 'start',
      },
      {
        onSuccess: () => {
          navigate(`/widgets/${selectedGameSafe}/${difficultySafe}/${selectedLevel}`);
        },
      }
    );
  };

  if (widgetsError) {
    return <ErrorBlock message={widgetsError.message} />;
  }

  if (widgetsLoading) {
    return <LoadingScreen />;
  }
  return (
    <div
      className="px-6 pt-15 pb-16 flex justify-center"
      style={{
        background:
          'radial-gradient(circle at 20% 30%, var(--color-bg-light), var(--color-bg-dark))',
      }}
    >
      <div className="w-full max-w-3xl space-y-10">
        <GamesList
          games={widgets}
          selectedGame={selectedGameSafe}
          onSelect={setSelectedGame}
          resetDifficulty={() => setDifficulty(null)}
          resetLevel={() => setSelectedLevel('')}
        />
        <LevelConfig
          difficulties={difficulties}
          difficulty={difficultySafe}
          setDifficulty={setDifficulty}
          levels={levels}
          levelsLoading={levelsLoading}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          onStart={handleStart}
        />
      </div>
    </div>
  );
};

export default WidgetsPage;

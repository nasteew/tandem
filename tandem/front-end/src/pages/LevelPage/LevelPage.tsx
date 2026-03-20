import { useNavigate, useParams } from 'react-router-dom';
import {
  useLevel,
  useLevelStats,
  useUpdateLastLevel,
  useValidateLevel,
} from '../../hooks/widgets/useWidgetLevels';
import { WidgetEngine } from '../../widgets/WidgetEngine/WidgetEngine';
import type { Solutions } from '../../types/WidgetTypes';
import { Button } from '@/components/ui/Button/Button';
import { useAuthStore } from '@/store/authStore';

export function LevelPage() {
  const {
    game = '',
    difficulty = '',
    id = '',
  } = useParams<{ game: string; difficulty: string; id: string }>();
  const navigate = useNavigate();

  const { data: widget, isLoading, isError } = useLevel(game, difficulty, id);
  const validate = useValidateLevel(game, difficulty, id);

  const user = useAuthStore((s) => s.user);
  const userId = user?.id;

  const levelId = Number(id);

  const stats = useLevelStats(game, levelId, difficulty, userId);
  const updateLast = useUpdateLastLevel(game, difficulty, userId);

  if (isLoading)
    return <div className="p-10 text-center text-[var(--color-text-muted)]">Loading…</div>;

  if (isError || !widget)
    return <div className="p-10 text-center text-red-400">Level not found</div>;

  const handleSubmit = (answer: Solutions) => validate.mutateAsync(answer);

  const handleNextLevel = () => {
    const current = Number(id);

    updateLast.mutate(
      {
        level: current,
        mode: 'next',
      },
      {
        onSuccess: (data) => {
          const next = data?.nextLevel;

          if (!next) {
            navigate('/widgets');
            return;
          }

          const [nextDifficulty, nextId] = next.split('-');

          navigate(`/widgets/${game}/${nextDifficulty}/${nextId}`);
        },
      }
    );
  };

  const handleBackToMenu = () => {
    navigate('/widgets');
  };

  const handleSuccess = (timeMs: number) => {
    stats.mutateAsync(timeMs);
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute top-4 left-4 z-50">
        <Button onClick={handleBackToMenu} size="sm" variant="secondary">
          ← Back to menu
        </Button>
      </div>

      <WidgetEngine
        widget={widget}
        onSubmit={handleSubmit}
        onNextLevel={handleNextLevel}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

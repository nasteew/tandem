import { useNavigate, useParams } from 'react-router-dom';
import { useLevel, useValidateLevel } from '../../hooks/useWidgetLevels';
import { WidgetEngine } from '../../widgets/WidgetEngine/WidgetEngine';
import type { Solutions } from '../../types/WidgetTypes';
import { Button } from '@/components/ui/Button/Button';

export function LevelPage() {
  const {
    game = '',
    difficulty = '',
    id = '',
  } = useParams<{ game: string; difficulty: string; id: string }>();
  const navigate = useNavigate();

  const { data: widget, isLoading, isError } = useLevel(game, difficulty, id);
  const validate = useValidateLevel(game, difficulty, id);

  if (isLoading)
    return <div className="p-10 text-center text-[var(--color-text-muted)]">Loading…</div>;

  if (isError || !widget)
    return <div className="p-10 text-center text-red-400">Level not found</div>;

  const handleSubmit = (answer: Solutions) => validate.mutateAsync(answer);

  const handleNextLevel = () => {
    navigate(`/widgets/${game}/${difficulty}/${String(Number(id) + 1)}`);
  };

  const handleBackToMenu = () => {
    navigate('/widgets');
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute top-4 left-4 z-50">
        <Button onClick={handleBackToMenu} size="sm" variant="secondary">
          ← Back to menu
        </Button>
      </div>

      <WidgetEngine widget={widget} onSubmit={handleSubmit} onNextLevel={handleNextLevel} />
    </div>
  );
}

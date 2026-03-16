import { useNavigate } from 'react-router-dom';
import { useLevel, useValidateLevel } from '@/hooks/useWidgetLevels';
import { WidgetEngine } from '@/widgets/WidgetEngine/WidgetEngine';
import type { Solutions } from '@/types/WidgetTypes';

interface LevelPageProps {
  game: string;
  difficulty: string;
  id: string;
}

export function LevelPage({ game, difficulty, id }: LevelPageProps) {
  const navigate = useNavigate();
  const { data: widget, isLoading, isError } = useLevel(game, difficulty, id);
  const validate = useValidateLevel(game, difficulty, id);

  if (isLoading)
    return <div className="p-10 text-center text-[var(--color-text-muted)]">Loading…</div>;
  if (isError || !widget)
    return <div className="p-10 text-center text-red-400">Level not found</div>;

  const handleSubmit = (answer: Solutions) => validate.mutateAsync(answer);

  const handleNextLevel = () => {
    const nextId = String(Number(id) + 1);
    navigate(`/level/${game}/${difficulty}/${nextId}`);
  };

  return <WidgetEngine widget={widget} onSubmit={handleSubmit} onNextLevel={handleNextLevel} />;
}

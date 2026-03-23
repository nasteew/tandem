import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useWidgets,
  useWidgetDifficulties,
  useLevels,
  useUpdateLastLevel,
} from '../../hooks/widgets/useWidgetLevels';
import { Button } from '@/components/ui/Button/Button';
import { useAuthStore } from '@/store/authStore';
import { LoadingScreen } from '@/components/Loading/Loading';
import { ErrorBlock } from '@/components/ErrorComponent/ErrorComponent';


export const WidgetsPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const { data: widgets = [], isLoading: widgetsLoading, error: widgetsError } = useWidgets();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const selectedGameSafe = selectedGame ?? widgets[0]?.id ?? null;

  const { data: difficulties = [], isLoading: difficultiesLoading } =
    useWidgetDifficulties(selectedGameSafe);
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

  if (widgetsLoading || difficultiesLoading || !selectedGameSafe || !difficultySafe) {
    return <LoadingScreen />;
  }
  return (
    <div
      className="min-h-screen px-6 pt-28 pb-16 flex justify-center"
      style={{
        background:
          'radial-gradient(circle at 20% 30%, var(--color-bg-light), var(--color-bg-dark))',
      }}
    >
      <div className="w-full max-w-3xl space-y-10">
        <div className="grid gap-4">
          {widgets.map((game) => {
            const active = selectedGameSafe === game.id;
            return (
              <button
                key={game.id}
                onClick={() => {
                  setSelectedGame(game.id);
                  setDifficulty(null);
                  setSelectedLevel('');
                }}
                className="w-full text-left p-5 rounded-2xl border transition-all duration-200"
                style={{
                  background: active ? 'rgba(96,165,250,0.08)' : 'var(--glass-bg)',
                  borderColor: active ? 'var(--accent-blue)' : 'var(--border-light)',
                  boxShadow: active ? '0 0 24px rgba(96,165,250,0.2)' : 'none',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(96,165,250,0.15)',
                          color: 'var(--accent-blue)',
                          border: '1px solid rgba(96,165,250,0.3)',
                        }}
                      >
                        {game.tag}
                      </span>
                    </div>
                    <h2
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-text-white)' }}
                    >
                      {game.label}
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {game.description}
                    </p>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full border-2 shrink-0 mt-1 flex items-center justify-center"
                    style={{
                      borderColor: active ? 'var(--accent-blue)' : 'var(--border-medium)',
                    }}
                  >
                    {active && (
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: 'var(--accent-blue)' }}
                      />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div
          className="p-6 rounded-2xl border space-y-6"
          style={{
            background: 'var(--glass-bg)',
            borderColor: 'var(--border-light)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <h3 className="text-base font-semibold" style={{ color: 'var(--color-text-light)' }}>
            Configure Level
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Difficulty
              </label>
              <div className="flex gap-2">
                {difficulties.map((d: string) => (
                  <button
                    key={d}
                    onClick={() => {
                      setDifficulty(d);
                      setSelectedLevel('');
                    }}
                    className="flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-150 cursor-pointer"
                    style={{
                      background:
                        difficultySafe === d ? 'rgba(96,165,250,0.15)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${difficultySafe === d ? 'var(--accent-blue)' : 'var(--border-light)'}`,
                      color:
                        difficultySafe === d ? 'var(--accent-blue)' : 'var(--color-text-muted)',
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                disabled={levelsLoading || !levels?.length}
                className="w-full px-3 py-2 rounded-lg text-sm transition-all focus:outline-none disabled:opacity-40 cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-light)',
                  color: selectedLevel ? 'var(--color-text-light)' : 'var(--color-text-muted)',
                }}
              >
                <option value="" style={{ background: '#0f172a' }}>
                  — Select level —
                </option>
                {levels?.map((lvl) => (
                  <option
                    key={lvl.id}
                    value={lvl.id}
                    style={{
                      background: '#0f172a',
                      color: lvl.completed ? 'var(--accent-green)' : 'var(--color-text-light)',
                      fontWeight: lvl.completed ? '600' : '400',
                    }}
                  >
                    Level {lvl.id} {lvl.completed ? '✓' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            onClick={handleStart}
            disabled={!selectedLevel}
            variant="primary"
            size="md"
            fullWidth
            className="rounded-xl font-semibold text-sm transition-all duration-200"
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WidgetsPage;

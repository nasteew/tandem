interface Game {
  id: string;
  label: string;
  description: string;
  tag: string;
}

interface Props {
  games: Game[];
  selectedGame: string | null;
  onSelect: (id: string) => void;
  resetDifficulty?: () => void;
  resetLevel: () => void;
}

import { useTranslation } from 'react-i18next';

export const GamesList = ({ games, selectedGame, onSelect, resetLevel }: Props) => {
  const { t } = useTranslation('widgets');
  return (
    <div className="grid gap-4">
      {games.map((game) => {
        const active = selectedGame === game.id;

        return (
          <button
            key={game.id}
            onClick={() => {
              onSelect(game.id);
              resetLevel();
            }}
            className="cursor-pointer w-full text-left p-5 rounded-2xl border transition-all duration-300 ease-in-out"
            style={{
              background: 'var(--color-card-bg)',
              borderColor: active ? 'var(--color-primary)' : 'var(--border-light)',
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
                      background: 'var(--color-card-bg)',
                      color: 'var(--color-primary)',
                      border: '1px solid var(--color-primary)',
                    }}
                  >
                    {t(`meta.${game.id}.tag`)}
                  </span>
                </div>

                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-white)' }}>
                  {t(`meta.${game.id}.label`)}
                </h2>

                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {t(`meta.${game.id}.description`)}
                </p>
              </div>

              <div
                className="w-5 h-5 rounded-full border-2 shrink-0 mt-1 flex items-center justify-center"
                style={{
                  borderColor: active ? 'var(--color-primary)' : 'var(--border-medium)',
                }}
              >
                {active && (
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: 'var(--color-primary)' }}
                  />
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

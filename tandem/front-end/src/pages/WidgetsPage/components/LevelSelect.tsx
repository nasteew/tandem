interface Level {
  id: number;
  completed?: boolean;
}

interface Props {
  levels: Level[];
  selectedLevel: string;
  onChange: (value: string) => void;
  loading: boolean;
}

export const LevelSelect = ({ levels, selectedLevel, onChange, loading }: Props) => {
  return (
    <div className="space-y-2">
      <label
        className="text-xs font-medium uppercase tracking-wider"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Level
      </label>

      <select
        value={selectedLevel}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading || levels.length === 0}
        className="w-full px-3 py-2 rounded-lg text-sm transition-all focus:outline-none disabled:opacity-40 cursor-pointer"
        style={{
          background: 'var(--color-bg-light)',
          border: '1px solid var(--border-light)',
          color: selectedLevel ? 'var(--color-text-light)' : 'var(--color-text-muted)',
        }}
      >
        <option value="" style={{ background: 'var(--color-bg-light)' }}>
          — Select level —
        </option>

        {!loading &&
          levels.map((lvl) => (
            <option
              key={lvl.id}
              value={lvl.id}
              style={{
                background: 'var(--color-bg-light)',
                color: lvl.completed ? 'var(--accent-green)' : 'var(--color-text-light)',
                fontWeight: lvl.completed ? '600' : '400',
              }}
            >
              Level {lvl.id} {lvl.completed ? '✓' : ''}
            </option>
          ))}
      </select>
    </div>
  );
};

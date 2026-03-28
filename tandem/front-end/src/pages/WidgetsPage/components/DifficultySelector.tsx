interface Props {
  difficulties: string[];
  selected: string | null;
  onSelect: (d: string) => void;
  resetLevel: () => void;
}

export const DifficultySelector = ({ difficulties, selected, onSelect, resetLevel }: Props) => {
  return (
    <div className="space-y-2">
      <label
        className="text-xs font-medium uppercase tracking-wider"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Difficulty
      </label>

      <div
        className={`flex gap-2 transition-all duration-300 ease-in-out min-h-[40px] ${
          difficulties.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {difficulties.map((d: string) => (
          <button
            key={d}
            onClick={() => {
              onSelect(d);
              resetLevel();
            }}
            className="flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-150 cursor-pointer"
            style={{
              background: selected === d ? 'rgba(96,165,250,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${selected === d ? 'var(--accent-blue)' : 'var(--border-light)'}`,
              color: selected === d ? 'var(--accent-blue)' : 'var(--color-text-muted)',
            }}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
};

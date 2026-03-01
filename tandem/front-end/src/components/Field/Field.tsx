import { Button } from '../ui/Button/Button';

interface FieldProps {
  label: string;
  value?: string;
  editing: boolean;
  textarea?: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Field = ({
  label,
  value,
  editing,
  textarea,
  onEdit,
  onCancel,
  onChange,
}: FieldProps) => {
  const fieldHeight = 'h-10';

  return (
    <div className="space-y-1 group">
      <div className="flex justify-between items-center">
        <span className="text-sm text-[var(--color-text-muted)] uppercase font-bold">{label}</span>

        {!editing ? (
          <Button size="sm" variant="ghost" onClick={onEdit}>
            Edit
          </Button>
        ) : (
          <Button size="sm" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>

      <div
        className={`
          rounded-lg ${editing ? 'bg-slate-950 border border-slate-800' : 'bg-white/5 border-[var(--color-border-light)]'} border border-[var(--color-border-light)]
          transition px-4 py-2 ${fieldHeight} flex items-center
        `}
      >
        {!editing ? (
          <p className="text-white text-sm truncate">{value}</p>
        ) : textarea ? (
          <textarea
            value={value}
            onChange={onChange}
            rows={1}
            className="
              w-full text-sm text-white bg-transparent
              outline-none border-none resize-none
              leading-none
            "
          />
        ) : (
          <input
            value={value}
            onChange={onChange}
            className="
              w-full text-sm text-white bg-transparent
              outline-none border-none
              leading-none
            "
            maxLength={50}
          />
        )}
      </div>
    </div>
  );
};

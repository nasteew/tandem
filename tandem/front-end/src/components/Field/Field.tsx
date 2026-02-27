import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';

interface FieldProps {
  label: string;
  value: string;
  editing: boolean;
  textarea?: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
          <Button
            size="sm"
            variant="ghost"
            className="transition-shadow duration-300 hover:shadow-[0_0_10px_rgb(96,165,250)] hover:text-white"
            onClick={onEdit}
          >
            Edit
          </Button>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            className="transition-shadow duration-300 hover:shadow-[0_0_10px_rgb(96,165,250)] hover:text-white"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>

      {!editing ? (
        <div
          className={`rounded-lg bg-white/5 border border-[var(--color-border-light)] transition ${fieldHeight} px-4 py-2`}
        >
          <p className="text-white text-sm truncate">{value}</p>
        </div>
      ) : textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={1}
          className={`w-full rounded-lg bg-white/5 border border-[var(--color-border-light)] text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none ${fieldHeight} px-4 py-2 align-top`}
        />
      ) : (
        <Input
          value={value}
          onChange={onChange}
          className={`text-sm transition ${fieldHeight} px-4 py-2.5`}
          maxLength={50}
        />
      )}
    </div>
  );
};

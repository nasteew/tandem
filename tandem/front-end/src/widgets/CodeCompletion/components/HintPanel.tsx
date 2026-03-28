import type { CodeCompletionBlank } from '@/types/WidgetTypes/CodeCompletion';
import { useTranslation } from 'react-i18next';

interface HintPanelProps {
  blanks: CodeCompletionBlank[];
  difficulty: number;
}

export function HintPanel({ blanks, difficulty }: HintPanelProps) {
  const { t } = useTranslation('widgets');
  
  if (difficulty >= 3) return null;

  const hints = blanks
    .map((b, i) => {
      if (difficulty <= 1 && b.hint) {
        return { index: i + 1, text: t(`hints.${b.hint}`, { defaultValue: b.hint }) };
      }
      if (difficulty === 2) {
        return { index: i + 1, text: `${b.correctAnswer.length} characters` };
      }
      return null;
    })
    .filter(Boolean) as { index: number; text: string }[];

  if (hints.length === 0) return null;

  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background: 'rgba(96,165,250,0.05)',
        border: '1px solid rgba(96,165,250,0.15)',
      }}
    >
      <div
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: 'var(--accent-blue)' }}
      >
        {t('codeCompletion.hintsLabel')}
      </div>
      <ul className="space-y-1">
        {hints.map((h) => (
          <li key={h.index} className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <span style={{ color: 'var(--accent-blue)' }}>{t('codeCompletion.blank')} {h.index}:</span> {h.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

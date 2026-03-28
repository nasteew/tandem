import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface CodeEditorProps {
  codeSnippet: string;
  inputs: string[];
  onInputChange: (index: number, value: string) => void;
}

export function CodeEditor({ codeSnippet, inputs, onInputChange }: CodeEditorProps) {
  const { t } = useTranslation('widgets');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const parts = codeSnippet.split('___');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < inputs.length) {
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  return (
    <div
      className="p-5 rounded-xl font-mono text-sm leading-relaxed whitespace-pre-wrap"
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--border-medium)',
        backdropFilter: 'var(--glass-blur)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <span
          className="ml-2 text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'var(--accent-blue)' }}
        >
          {t('codeCompletion.completeCode')}
        </span>
      </div>

      <pre className="whitespace-pre-wrap text-[var(--color-text-light)]">
        {parts.map((part, idx) => (
          <React.Fragment key={idx}>
            <span>{part}</span>
            {idx < inputs.length && (
              <input
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                value={inputs[idx]}
                onChange={(e) => onInputChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                placeholder="???"
                spellCheck={false}
                autoComplete="off"
                className="inline-block mx-1 px-2 py-0.5 rounded-md font-mono text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] focus:shadow-[0_0_8px_rgba(96,165,250,0.3)]"
                style={{
                  width: `${Math.max(inputs[idx].length + 3, 5)}ch`,
                  background: 'rgba(96,165,250,0.08)',
                  border: '1px solid rgba(96,165,250,0.3)',
                  color: 'var(--accent-blue)',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </pre>
    </div>
  );
}

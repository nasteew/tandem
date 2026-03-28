import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface CodePanelProps {
  code: string;
}

export function CodePanel({ code }: CodePanelProps) {
  const { t } = useTranslation('widgets');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.dataset.highlighted === 'yes') return;

    hljs.highlightElement(ref.current);
  }, [code]);

  return (
    <div className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--border-medium)] backdrop-blur-md font-mono text-sm">
      <div className="text-[var(--color-primary)] mb-2 font-semibold">{t('asyncSorter.sourceCode')}</div>

      <pre className="whitespace-pre-wrap">
        <code
          key={code}
          ref={ref}
          className="language-javascript"
          style={{ color: 'inherit', background: 'var(--code-panel)' }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}

import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useEffect, useRef } from 'react';

interface CodePanelProps {
  code: string;
}

export function CodePanel({ code }: CodePanelProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.dataset.highlighted === 'yes') return;

    hljs.highlightElement(ref.current);
  }, [code]);

  return (
    <div className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--border-medium)] backdrop-blur-md font-mono text-sm">
      <div className="text-[var(--accent-blue)] mb-2 font-semibold">Source Code</div>

      <pre className="whitespace-pre-wrap">
        <code key={code} ref={ref} className="language-javascript" style={{ color: 'inherit' }}>
          {code}
        </code>
      </pre>
    </div>
  );
}

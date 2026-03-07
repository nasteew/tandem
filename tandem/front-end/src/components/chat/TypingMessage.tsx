import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface TypingMessageProps {
  content: string;
  onUpdate?: () => void;
  isLatest?: boolean;
}

export const TypingMessage = ({ content, onUpdate, isLatest = false }: TypingMessageProps) => {
  const [displayed, setDisplayed] = useState(isLatest ? '' : content);
  const idxRef = useRef(0);

  useEffect(() => {
    if (!isLatest) {
      setDisplayed(content);
      return;
    }

    idxRef.current = 0;

    const timer = setInterval(() => {
      idxRef.current += 1;

      setDisplayed(content.slice(0, idxRef.current));
      onUpdate?.();

      if (idxRef.current >= content.length) {
        clearInterval(timer);
      }
    }, 12);

    return () => clearInterval(timer);
  }, [content, onUpdate, isLatest]);

  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-5 mb-2">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-5 mb-2">{children}</ol>,
        li: ({ children }) => <li className="mb-1">{children}</li>,
        code: ({ children, className }) => {
          const isBlock = className?.includes('language-');
          return isBlock ? (
            <pre className="bg-slate-800 rounded-lg p-3 my-2 overflow-x-auto">
              <code className={`text-sm text-emerald-400 ${className ?? ''}`}>{children}</code>
            </pre>
          ) : (
            <code className="bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">{children}</code>
          );
        },
        pre: ({ children }) => <>{children}</>,
        h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-base font-semibold mb-1">{children}</h3>,
        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noreferrer" className="text-indigo-400 underline hover:text-indigo-300">{children}</a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-indigo-500 pl-3 italic text-slate-400 my-2">{children}</blockquote>
        ),
      }}
    >
      {displayed || ' '}
    </ReactMarkdown>
  );
};

import { memo, useEffect, useState, useCallback, useRef, useMemo } from 'react';
import styles from './LaptopSVG.module.css';

interface LaptopSVGProps {
  onClick: () => void;
}

const codeLines = [
  { text: 'function interviewPrep() {', color: 'var(--color-primary)' },
  { text: '⠀⠀const skills = ["TS", "React"];', color: 'var(--color-secondary)' },
  { text: '⠀⠀const level = 42;', color: 'var(--color-support)' },
  { text: '⠀⠀while(level < 99) {', color: 'var(--color-success)' },
  { text: '⠀⠀⠀⠀level = practice();', color: 'var(--color-primary)' },
  { text: '⠀⠀}', color: 'var(--color-success)' },
  { text: '⠀⠀return "HIRED!";', color: 'var(--color-text-400)' },
  { text: '}', color: 'var(--color-primary)' },
];

export const LaptopSVG = memo(({ onClick }: LaptopSVGProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animationRef = useRef<number | undefined>(undefined);

  const resetAnimation = useCallback(() => {
    setCurrentLine(0);
    setCurrentChar(0);
    setIsDeleting(false);
    setDisplayText('');
  }, []);

  const staticText = useMemo(() => {
    if (prefersReducedMotion) {
      return codeLines.map((line) => line.text).join('\n');
    }
    return '';
  }, [prefersReducedMotion]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (prefersReducedMotion) {
        setDisplayText(staticText);
      } else {
        resetAnimation();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion, staticText, resetAnimation]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let isActive = true;

    const animate = () => {
      if (!isActive) return;

      const currentLineText = codeLines[currentLine].text;

      if (!isDeleting) {
        if (currentChar < currentLineText.length) {
          setDisplayText((prev) => prev + currentLineText[currentChar]);
          setCurrentChar((prev) => prev + 1);
          animationRef.current = window.setTimeout(animate, 30);
        } else {
          animationRef.current = window.setTimeout(() => {
            if (!isActive) return;
            if (currentLine < codeLines.length - 1) {
              setCurrentLine((prev) => prev + 1);
              setCurrentChar(0);
              setDisplayText((prev) => prev + '\n');
              animationRef.current = window.setTimeout(animate, 30);
            } else {
              setIsDeleting(true);
              animationRef.current = window.setTimeout(animate, 300);
            }
          }, 300);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
          animationRef.current = window.setTimeout(animate, 20);
        } else {
          setIsDeleting(false);
          setCurrentLine(0);
          setCurrentChar(0);
          animationRef.current = window.setTimeout(animate, 30);
        }
      }
    };

    animationRef.current = window.setTimeout(animate, 30);

    return () => {
      isActive = false;
      if (animationRef.current) {
        window.clearTimeout(animationRef.current);
      }
    };
  }, [currentLine, currentChar, isDeleting, displayText, prefersReducedMotion]);

  const handleKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 600 210"
      preserveAspectRatio="xMidYMid meet"
      className={styles.laptopSvg}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Laptop with coding animation - click to register"
      style={{
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      <defs>
        <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(20, 30, 50, 0.95)" />
          <stop offset="100%" stopColor="rgba(10, 15, 25, 0.98)" />
        </linearGradient>

        <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(96, 165, 250, 0.4)" />
          <stop offset="100%" stopColor="rgba(96, 165, 250, 0.1)" />
        </linearGradient>

        <clipPath id="screenClip">
          <rect x="100" y="30" width="400" height="140" rx="10" ry="10" />
        </clipPath>
      </defs>

      <rect
        x="70"
        y="135"
        width="460"
        height="25"
        rx="15"
        ry="15"
        fill="url(#shadowGradient)"
        className={styles.shadow}
      />

      <rect
        x="80"
        y="20"
        width="440"
        height="160"
        rx="20"
        ry="20"
        fill="var(--color-gray-dark-10)"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        className={styles.screenFrame}
      />

      <rect
        x="90"
        y="30"
        width="420"
        height="140"
        rx="15"
        ry="15"
        fill="url(#screenGradient)"
        className={styles.screen}
      />

      {prefersReducedMotion ? (
        <text
          x="120"
          y="50"
          fill="var(--color-primary)"
          fontFamily='"SF Mono", "Fira Code", monospace'
          fontSize="12"
          className={styles.staticText}
        >
          <tspan x="120" dy="0">
            Ready to start?
          </tspan>
          <tspan x="120" dy="16">
            Click to begin!
          </tspan>
        </text>
      ) : (
        <text
          x="120"
          y="50"
          fill="var(--color-primary)"
          fontFamily='"SF Mono", "Fira Code", monospace'
          fontSize="12"
          className={styles.typingText}
        >
          {displayText.split('\n').map((line, index) => (
            <tspan
              key={index}
              x="120"
              dy={index === 0 ? 0 : 16}
              fill={codeLines[index]?.color || 'var(--color-primary)'}
            >
              {line}
              {index === currentLine &&
                !isDeleting &&
                currentChar < codeLines[currentLine].text.length && (
                  <tspan className={styles.cursor}>|</tspan>
                )}
            </tspan>
          ))}
        </text>
      )}
    </svg>
  );
});

LaptopSVG.displayName = 'LaptopSVG';

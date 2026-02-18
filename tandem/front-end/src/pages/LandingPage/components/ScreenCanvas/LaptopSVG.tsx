import { memo, useEffect, useState } from 'react';
import styles from './LaptopSVG.module.css';

interface LaptopSVGProps {
  onClick: () => void;
}

// Код для анимации прокрутки
const codeLines = [
  { text: 'function interviewPrep() {', color: 'var(--color-primary)' },
  { text: '⠀const skills = ["TS", "React"];', color: 'var(--color-secondary)' },
  { text: '⠀const level = 42;', color: 'var(--color-support)' },
  { text: '⠀while(level < 99) {', color: 'var(--color-success)' },
  { text: '⠀⠀level = practice();', color: 'var(--color-primary)' },
  { text: '⠀}', color: 'var(--color-success)' },
  { text: '⠀return "HIRED!";', color: 'var(--color-text-400)' },
  { text: '}', color: 'var(--color-primary)' },
];

export const LaptopSVG = memo(({ onClick }: LaptopSVGProps) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Анимация прокрутки кода (как было в Canvas)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let animationFrameId: number;

    const animate = () => {
      const time = Date.now() / 1000; // текущее время в секундах
      const speed = 20; // скорость прокрутки
      const offset = (time * speed) % 200; // 200 - высота всех строк

      setScrollOffset(offset);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [prefersReducedMotion]);

  // Обработка клавиатуры для доступности
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
      viewBox="0 0 600 190"
      preserveAspectRatio="xMidYMid meet"
      className={styles.laptopSvg}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Laptop with coding animation - click to register"
      style={{
        cursor: 'pointer',
        outline: 'none', // Убираем стандартную рамку фокуса
      }}
    >
      {/* Определение градиентов и фильтров */}
      <defs>
        {/* Градиент для экрана */}
        <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(20, 30, 50, 0.95)" />
          <stop offset="100%" stopColor="rgba(10, 15, 25, 0.98)" />
        </linearGradient>

        {/* Градиент для тени */}
        <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(96, 165, 250, 0.4)" />
          <stop offset="100%" stopColor="rgba(96, 165, 250, 0.1)" />
        </linearGradient>

        {/* Маска для обрезки текста внутри экрана */}
        <clipPath id="screenClip">
          <rect x="100" y="30" width="400" height="100" rx="10" ry="10" />
        </clipPath>
      </defs>

      {/* Тень под ноутбуком (с закругленными краями) */}
      <rect
        x="70"
        y="115"
        width="460"
        height="25"
        rx="15"
        ry="15"
        fill="url(#shadowGradient)"
        className={styles.shadow}
      />

      {/* Основная часть ноутбука (экран) */}
      <rect
        x="80"
        y="20"
        width="440"
        height="140"
        rx="20"
        ry="20"
        fill="var(--color-gray-dark-10)"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        className={styles.screenFrame}
      />

      {/* Внутренняя часть экрана (стеклянный эффект) */}
      <rect
        x="90"
        y="30"
        width="420"
        height="120"
        rx="15"
        ry="15"
        fill="url(#screenGradient)"
        className={styles.screen}
      />

      {/* Бегущий код на экране */}
      {prefersReducedMotion ? (
        // Статичный текст
        <text
          x="120"
          y="80"
          fill="var(--color-primary)"
          fontFamily='"SF Mono", "Fira Code", monospace'
          fontSize="12"
          className={styles.staticText}
        >
          <tspan x="120" dy="0">
            Ready to start?
          </tspan>
          <tspan x="120" dy="20">
            Click to begin!
          </tspan>
        </text>
      ) : (
        // Группа с прокручивающимся текстом
        <g clipPath="url(#screenClip)">
          {codeLines.map((line, index) => (
            <text
              key={index}
              x="120"
              y={80 + index * 20 - scrollOffset}
              fill={line.color}
              fontFamily='"SF Mono", "Fira Code", monospace'
              fontSize="12"
              className={styles.scrollingText}
            >
              {line.text}
            </text>
          ))}
        </g>
      )}
    </svg>
  );
});

LaptopSVG.displayName = 'LaptopSVG';

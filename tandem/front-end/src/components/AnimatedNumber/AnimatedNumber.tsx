import { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
  value: number | string;
  duration?: number;
}

export const AnimatedNumber = ({ value, duration = 1500 }: AnimatedNumberProps) => {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress;

      if (typeof value === 'string' && /^\d{2}:\d{2}$/.test(value)) {
        const [m, s] = value.split(':').map(Number);
        const total = m * 60 + s;

        const current = Math.floor(total * eased);

        const mm = Math.floor(current / 60);
        const ss = current % 60;

        setDisplay(`${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`);
      }

      if (typeof value === 'number') {
        const current = Math.floor(value * eased);
        setDisplay(current);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return <span>{display}</span>;
};

import { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

export const AnimatedNumber = ({ value, duration = 1500 }: AnimatedNumberProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);

    const step = () => {
      start += increment;
      if (start < value) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    step();
  }, [value, duration]);

  return <span>{count}</span>;
};

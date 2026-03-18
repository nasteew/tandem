import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialTime: number;
  onFinish?: () => void;
  resetKey: number;
}

export const CountdownTimer = ({ initialTime, onFinish, resetKey }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeLeft(initialTime);
    }, 0);

    return () => clearTimeout(timeout);
  }, [resetKey, initialTime]);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    return undefined;
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && onFinish) {
      const timeout = setTimeout(() => {
        onFinish();
      }, 0);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [timeLeft, onFinish]);

  const progress = Math.max((timeLeft / initialTime) * 100, 0);
  return (
    <div className={`w-full max-w-xs mx-auto mt-5`}>
      <div className="relative h-6 rounded-full bg-gray-800 overflow-hidden shadow-inner">
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #b83c3c, #af6161, #7199c7)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white select-none">
          {timeLeft}s
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  initialTime: number;
  onFinish?: () => void;
  onTimeUpdate?: (elapsed: number) => void;
  paused?: boolean;
}

export const CountdownTimer = ({
  initialTime,
  onFinish,
  onTimeUpdate,
  paused,
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (paused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, paused]);

  useEffect(() => {
    const elapsed = (initialTime - timeLeft) * 1000;
    onTimeUpdate?.(elapsed);
  }, [timeLeft, initialTime, onTimeUpdate]);

  useEffect(() => {
    if (timeLeft === 0) {
      onFinish?.();
    }
  }, [timeLeft, onFinish]);

  const progress = Math.max((timeLeft / initialTime) * 100, 0);

  return (
    <div className="w-full max-w-xs mx-auto mt-5">
      <div className="relative h-6 rounded-full bg-[var(--bg-secondary)] overflow-hidden shadow-inner">
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--color-primary), #b0c3d8)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[var(--text-white)] select-none">
          {timeLeft}s
        </div>
      </div>
    </div>
  );
};

import { lazy, Suspense } from 'react';
import styles from '../../LandingPage.module.css';

const LaptopSVG = lazy(() =>
  import('./LaptopSVG').then((module) => ({ default: module.LaptopSVG }))
);

interface ScreenCanvasProps {
  onClick: () => void;
}

export const ScreenCanvas = ({ onClick }: ScreenCanvasProps) => {
  return (
    <Suspense
      fallback={
        <div
          className={styles.laptopCanvas}
          style={{
            background: 'var(--color-gray-dark-10)',
            borderRadius: 'var(--radius-xl)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      }
    >
      <LaptopSVG onClick={onClick} />
    </Suspense>
  );
};

import { memo, type CSSProperties } from 'react';
import styles from './Robot.module.css';

interface RobotProps {
  size?: number;
  style?: CSSProperties;
  className?: string;
}

const Robot = memo(function RobotMascot({ size = 1, style, className }: RobotProps) {
  return (
    <div className={`${styles.robotContainer} ${className || ''}`} style={style}>
      <svg
        width={90 * size}
        height={100 * size}
        viewBox="0 0 80 100"
        fill="none"
        className={styles.root}
      >
        {/* ── Antenna ── */}
        <line
          x1="40"
          y1="3"
          x2="40"
          y2="14"
          stroke="#63B3ED"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="40" cy="2.5" r="3.5" fill="#F6E05E" />

        {/* ── Head ── */}
        <rect
          x="14"
          y="13"
          width="52"
          height="36"
          rx="10"
          fill="#1E2A3A"
          stroke="#63B3ED"
          strokeWidth="2"
        />

        {/* ── Eyes ── */}
        <rect className={styles.eye} x="20" y="23" width="14" height="10" rx="3" />
        <rect className={styles.eye} x="46" y="23" width="14" height="10" rx="3" />

        {/* ── Pupils ── */}
        <circle className={styles.pupil} cx="27" cy="28" r="3.5" fill="white" />
        <circle className={styles.pupil} cx="53" cy="28" r="3.5" fill="white" />

        {/* ── Smile ── */}
        <path
          d="M27 42 Q40 51 53 42"
          stroke="#68D391"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* ── Neck ── */}
        <rect x="33" y="49" width="14" height="7" rx="3" fill="#2D3F55" />

        {/* ── Body ── */}
        <rect
          x="10"
          y="56"
          width="60"
          height="34"
          rx="11"
          fill="#1E2A3A"
          stroke="#63B3ED"
          strokeWidth="2"
        />

        {/* ── Chest panel ── */}
        <rect x="22" y="64" width="36" height="14" rx="4" fill="#0D1926" />
        <circle cx="31" cy="71" r="3.5" fill="#FC8181" />
        <circle cx="40" cy="71" r="3.5" fill="#F6E05E" />
        <circle cx="49" cy="71" r="3.5" fill="#68D391" />

        {/* ── Left arm (waves) ── */}
        <rect
          className={styles.armLeft}
          x="0"
          y="57"
          width="10"
          height="24"
          rx="5"
          fill="#2D3F55"
          stroke="#63B3ED"
          strokeWidth="1.5"
        />

        {/* ── Right arm ── */}
        <rect
          x="70"
          y="57"
          width="10"
          height="24"
          rx="5"
          fill="#2D3F55"
          stroke="#63B3ED"
          strokeWidth="1.5"
        />

        {/* ── Legs ── */}
        <rect x="22" y="88" width="13" height="10" rx="5" fill="#2D3F55" />
        <rect x="45" y="88" width="13" height="10" rx="5" fill="#2D3F55" />
      </svg>
    </div>
  );
});

export default Robot;

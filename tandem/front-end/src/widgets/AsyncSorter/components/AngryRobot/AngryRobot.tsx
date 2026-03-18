import styles from './AngryRobotAnimations.module.css';

export const AngryRobot = () => (
  <div className="robot-container">
    <svg width="160" height="160" viewBox="0 0 160 160">
      {/* АНТЕННА */}
      <line x1="80" y1="10" x2="80" y2="30" stroke="#6b7280" strokeWidth="3" />
      <circle cx="80" cy="8" r="5" fill="#ff0000" className={styles.robotAntennaTip} />

      {/* УШИ */}
      <rect x="10" y="60" width="20" height="40" rx="6" fill="#9ca3af" />
      <rect x="130" y="60" width="20" height="40" rx="6" fill="#9ca3af" />

      {/* ГОЛОВА */}
      <rect
        x="30"
        y="30"
        width="100"
        height="100"
        rx="15"
        fill="#d1d5db"
        stroke="#6b7280"
        strokeWidth="4"
      />

      {/* ГЛАЗА */}
      <circle cx="60" cy="70" r="10" fill="#ff0000" className={styles.robotEye} />
      <circle cx="100" cy="70" r="10" fill="#ff0000" className={styles.robotEye} />

      {/* БРОВИ */}
      <path d="M45 55 L75 65" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <path d="M115 55 L85 65" stroke="#374151" strokeWidth="4" strokeLinecap="round" />

      {/* РОТ */}
      <rect x="60" y="95" width="40" height="10" rx="3" fill="#374151" />

      {/* БОЛТЫ */}
      <circle cx="40" cy="50" r="3" fill="#6b7280" />
      <circle cx="120" cy="50" r="3" fill="#6b7280" />
    </svg>
  </div>
);

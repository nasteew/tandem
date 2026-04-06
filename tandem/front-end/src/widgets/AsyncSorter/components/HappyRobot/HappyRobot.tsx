import styles from './HappyRobotAnimations.module.css';

export const HappyRobot = () => (
  <div className="robot-container">
    <svg width="160" height="160" viewBox="0 0 160 160">
      <line x1="80" y1="10" x2="80" y2="30" stroke="#6b7280" strokeWidth="3" />
      <circle cx="80" cy="8" r="5" fill="#22c55e" className={styles.robotAntennaTip} />

      <rect x="10" y="60" width="20" height="40" rx="6" fill="#9ca3af" />
      <rect x="130" y="60" width="20" height="40" rx="6" fill="#9ca3af" />

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

      <circle cx="60" cy="70" r="10" fill="#3b82f6" className={styles.robotEye} />
      <circle cx="100" cy="70" r="10" fill="#3b82f6" className={styles.robotEye} />

      <circle cx="56" cy="66" r="3" fill="white" />
      <circle cx="96" cy="66" r="3" fill="white" />

      <path d="M45 60 Q60 50 75 60" stroke="#6b7280" strokeWidth="3" fill="none" />
      <path d="M85 60 Q100 50 115 60" stroke="#6b7280" strokeWidth="3" fill="none" />

      <path
        d="M55 95 Q80 115 105 95"
        fill="none"
        stroke="#374151"
        strokeWidth="4"
        className="robot-mouth"
      />

      <circle cx="40" cy="50" r="3" fill="#6b7280" />
      <circle cx="120" cy="50" r="3" fill="#6b7280" />
    </svg>
  </div>
);

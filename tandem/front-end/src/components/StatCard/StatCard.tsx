import { type ReactNode } from 'react';
import styles from './StatCard.module.css';
import clsx from 'clsx';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

export const StatCard = ({ icon, title, value, subtitle, className }: StatCardProps) => {
  return (
    <div className={clsx(styles.statCard, className)}>
      <div className={styles.statHeader}>
        <div className={styles.statIconWrapper}>{icon}</div>
        <span className={styles.statTitle}>{title}</span>
      </div>
      <div className={styles.statValue}>{value}</div>
      {subtitle && <div className={styles.statSubtitle}>{subtitle}</div>}
    </div>
  );
};

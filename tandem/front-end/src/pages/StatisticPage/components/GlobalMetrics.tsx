import { Card } from '@/components/Card/Card';
import styles from './GlobalMetrics.module.css';
import type { GlobalStatsUser } from '@/types/statistic.types';

interface GlobalMetricsProps {
  data: GlobalStatsUser[];
}

export const GlobalMetrics = ({ data }: GlobalMetricsProps) => {
  const totalPlayers = data.length;
  const totalCompleted = data.reduce((sum, u) => sum + u.completedLevelsCount, 0);
  const avgStreak = totalPlayers
    ? Math.round(data.reduce((sum, u) => sum + u.streakDays, 0) / totalPlayers)
    : 0;
  const bestTime = data.reduce(
    (best, u) => {
      if (u.bestTimeMs === null) return best;
      return best === null || u.bestTimeMs < best ? u.bestTimeMs : best;
    },
    null as number | null
  );

  return (
    <div className={styles.container}>
      <Card className={styles.metricCard}>
        <div className={styles.metricValue}>{totalPlayers}</div>
        <div className={styles.metricLabel}>Total Players</div>
      </Card>
      <Card className={styles.metricCard}>
        <div className={styles.metricValue}>{avgStreak}</div>
        <div className={styles.metricLabel}>Avg. Streak</div>
      </Card>
      <Card className={styles.metricCard}>
        <div className={styles.metricValue}>
          {bestTime !== null ? (bestTime / 1000).toFixed(2) : '-'}
        </div>
        <div className={styles.metricLabel}>Best Time (sec)</div>
      </Card>
      <Card className={styles.metricCard}>
        <div className={styles.metricValue}>{totalCompleted}</div>
        <div className={styles.metricLabel}>Total Levels</div>
      </Card>
    </div>
  );
};

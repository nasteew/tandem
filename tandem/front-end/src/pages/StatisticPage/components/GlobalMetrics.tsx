import { Card } from '@/components/Card/Card';
import { useTranslation } from 'react-i18next';
import styles from './GlobalMetrics.module.css';
import type { GlobalStatsUser } from '@/types/statistic.types';

interface GlobalMetricsProps {
  data: GlobalStatsUser[];
}

export const GlobalMetrics = ({ data }: GlobalMetricsProps) => {
  const { t } = useTranslation('statistic');
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
        <div className={styles.metricLabel}>{t('metrics.totalPlayers')}</div>
      </Card>
      <Card className={styles.metricCard}>
        <div className={styles.metricValue}>{avgStreak}</div>
        <div className={styles.metricLabel}>{t('metrics.avgStreak')}</div>
      </Card>
      <Card className={styles.metricCard}>
        <div className={styles.metricValue}>
          {bestTime !== null ? (bestTime / 1000).toFixed(2) : '-'}
        </div>
        <div className={styles.metricLabel}>{t('metrics.bestTime')}</div>
      </Card>
      <Card className={styles.metricCard}>
        <div className={styles.metricValue}>{totalCompleted}</div>
        <div className={styles.metricLabel}>{t('metrics.totalLevels')}</div>
      </Card>
    </div>
  );
};

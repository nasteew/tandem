import { useState } from 'react';
import { useGlobalStats } from '@/hooks/statistic/useGlobalStats';
import { LoadingScreen } from '@/components/Loading/Loading';
import { GlobalMetrics } from './components/GlobalMetrics';
import { LeaderboardHighlights } from './components/LeaderboardHighlights';
import { StatsTable } from './components/StatsTable';
import styles from './StatisticPage.module.css';
import type { SortBy } from '@/types/statistic.types';

export const StatisticPage = () => {
  const [sortBy, setSortBy] = useState<SortBy>('levels');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const { data, isLoading, error } = useGlobalStats(sortBy, order);

  const handleSort = (newSortBy: SortBy) => {
    if (newSortBy === sortBy) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(newSortBy);
      setOrder('desc');
    }
  };

  if (isLoading && !data) return <LoadingScreen />;
  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error loading statistics</h2>
        <p>{error.message}</p>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>No data yet</h2>
        <p>Start playing to see statistics!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Global Statistics</h1>
        <p className={styles.subtitle}>See how you rank against other players</p>
      </div>

      <GlobalMetrics data={data} />
      <LeaderboardHighlights data={data} />
      <StatsTable data={data} onSort={handleSort} currentSort={sortBy} currentOrder={order} />
    </div>
  );
};

export default StatisticPage;

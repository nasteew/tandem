import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalStats } from '@/hooks/statistic/useGlobalStats';
import { LoadingScreen } from '@/components/Loading/Loading';
import { GlobalMetrics } from './components/GlobalMetrics';
import { LeaderboardHighlights } from './components/LeaderboardHighlights';
import { StatsTable } from './components/StatsTable';
import styles from './StatisticPage.module.css';
import type { SortBy } from '@/types/statistic.types';
import { ErrorBlock } from '@/components/ErrorComponent/ErrorComponent';

export const StatisticPage = () => {
  const [sortBy, setSortBy] = useState<SortBy>('levels');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const { data, isLoading, error } = useGlobalStats(sortBy, order);
  const { t } = useTranslation('statistic');

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
    return <ErrorBlock message={error.message} />;
  }
  if (!data || data.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>{t('empty.title')}</h2>
        <p>{t('empty.subtitle')}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('header.title')}</h1>
        <p className={styles.subtitle}>{t('header.subtitle')}</p>
      </div>

      <GlobalMetrics data={data} />
      <LeaderboardHighlights data={data} />
      <StatsTable data={data} onSort={handleSort} currentSort={sortBy} currentOrder={order} />
    </div>
  );
};

export default StatisticPage;

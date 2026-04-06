import { UserCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './StatsTable.module.css';
import type { GlobalStatsUser, SortBy } from '@/types/statistic.types';

interface StatsTableProps {
  data: GlobalStatsUser[];
  onSort: (sortBy: SortBy) => void;
  currentSort: SortBy;
  currentOrder: 'asc' | 'desc';
}

export const StatsTable = ({ data, onSort, currentSort, currentOrder }: StatsTableProps) => {
  const { t } = useTranslation('statistic');

  const formatBestTime = (ms: number | null): string => {
    if (ms === null) return '-';
    return t('table.formatTime', { time: (ms / 1000).toFixed(2) });
  };

  const getSortIcon = (column: SortBy) => {
    if (currentSort !== column) return '↕';
    return currentOrder === 'desc' ? '↓' : '↑';
  };

  const handleSort = (column: SortBy) => {
    onSort(column);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t('table.user')}</th>
            <th onClick={() => handleSort('streak')} className={styles.sortable}>
              {t('table.streak')} {getSortIcon('streak')}
            </th>
            <th onClick={() => handleSort('time')} className={styles.sortable}>
              {t('table.bestTime')} {getSortIcon('time')}
            </th>
            <th onClick={() => handleSort('levels')} className={styles.sortable}>
              {t('table.levelsCompleted')} {getSortIcon('levels')}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.userId}>
              <td data-label={t('table.user')} className={styles.userCell}>
                {user.user.avatarUrl ? (
                  <img src={user.user.avatarUrl} alt={user.user.name} className={styles.avatar} />
                ) : (
                  <UserCircle size={40} className={styles.avatarPlaceholder} />
                )}
                <span>{user.user.name}</span>
              </td>
              <td data-label={t('table.streak')}>{user.streakDays}</td>
              <td data-label={t('table.bestTime')}>{formatBestTime(user.bestTimeMs)}</td>
              <td data-label={t('table.levelsCompleted')}>{user.completedLevelsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

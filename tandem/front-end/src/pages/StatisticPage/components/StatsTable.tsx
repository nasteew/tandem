import { useState } from 'react';
import { UserCircle } from 'lucide-react';
import styles from './StatsTable.module.css';
import type { GlobalStatsUser, SortBy } from '@/types/statistic.types';

interface StatsTableProps {
  data: GlobalStatsUser[];
  onSort: (sortBy: SortBy) => void;
  currentSort: SortBy;
}

const formatBestTime = (ms: number | null): string => {
  if (ms === null) return '-';
  return (ms / 1000).toFixed(2) + ' sec';
};

export const StatsTable = ({ data, onSort, currentSort }: StatsTableProps) => {
  const [sortColumn, setSortColumn] = useState<SortBy>(currentSort);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: SortBy) => {
    const newSortOrder = sortColumn === column && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
    onSort(column); // серверная сортировка
  };

  const getSortIcon = (column: SortBy) => {
    if (sortColumn !== column) return '↕️';
    return sortOrder === 'desc' ? '↓' : '↑';
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User</th>
            <th onClick={() => handleSort('streak')} className={styles.sortable}>
              Streak {getSortIcon('streak')}
            </th>
            <th onClick={() => handleSort('time')} className={styles.sortable}>
              Best Time {getSortIcon('time')}
            </th>
            <th onClick={() => handleSort('levels')} className={styles.sortable}>
              Levels Completed {getSortIcon('levels')}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.userId}>
              <td className={styles.userCell}>
                {user.user.avatarUrl ? (
                  <img src={user.user.avatarUrl} alt={user.user.name} className={styles.avatar} />
                ) : (
                  <UserCircle size={40} className={styles.avatarPlaceholder} />
                )}
                <span>{user.user.name}</span>
              </td>
              <td>{user.streakDays}</td>
              <td>{formatBestTime(user.bestTimeMs)}</td>
              <td>{user.completedLevelsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

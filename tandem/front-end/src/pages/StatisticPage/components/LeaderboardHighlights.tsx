import { Card } from '@/components/Card/Card';
import { UserCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './LeaderboardHighlights.module.css';
import type { GlobalStatsUser } from '@/types/statistic.types';

interface LeaderboardHighlightsProps {
  data: GlobalStatsUser[];
}

const TopList = ({
  title,
  users,
  valueFormatter,
}: {
  title: string;
  users: GlobalStatsUser[];
  valueFormatter: (user: GlobalStatsUser) => string;
}) => (
  <div className={styles.list}>
    <h3 className={styles.listTitle}>{title}</h3>
    <div className={styles.listItems}>
      {users.map((user, idx) => (
        <div key={user.userId} className={styles.listItem}>
          <span className={styles.rank}>{idx + 1}</span>
          {user.user.avatarUrl ? (
            <img src={user.user.avatarUrl} alt={user.user.name} className={styles.avatar} />
          ) : (
            <UserCircle size={32} className={styles.avatarPlaceholder} />
          )}
          <span className={styles.name}>{user.user.name}</span>
          <span className={styles.value}>{valueFormatter(user)}</span>
        </div>
      ))}
    </div>
  </div>
);

export const LeaderboardHighlights = ({ data }: LeaderboardHighlightsProps) => {
  const { t } = useTranslation('statistic');
  const topByStreak = [...data].sort((a, b) => b.streakDays - a.streakDays).slice(0, 3);
  const topByLevels = [...data]
    .sort((a, b) => b.completedLevelsCount - a.completedLevelsCount)
    .slice(0, 3);

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <TopList
          title={t('leaderboard.streakLeaders')}
          users={topByStreak}
          valueFormatter={(u) => t('leaderboard.days', { count: u.streakDays })}
        />
      </Card>
      <Card className={styles.card}>
        <TopList
          title={t('leaderboard.levelMasters')}
          users={topByLevels}
          valueFormatter={(u) => t('leaderboard.levels', { count: u.completedLevelsCount })}
        />
      </Card>
    </div>
  );
};

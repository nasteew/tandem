import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import {
  useUserStats,
  useUserGames,
  useContinueGame,
  useUpdateStreak,
} from '../../hooks/dashboard/useDashboard';
import { LoadingScreen } from '@/components/Loading/Loading';
import { Button } from './../../components/ui/Button/Button';
import { Card } from '@/components/Card/Card';
import { StreakIcon } from '../../components/icons/StreakIcon';
import { ClockIcon } from '../../components/icons/ClockIcon';
import { TrophyIcon } from '../../components/icons/TrophyIcon';
import styles from './DashboardPage.module.css';
import cardStyles from '@/components/Card/Card.module.css';
import buttonStyles from '../../components/ui/Button/Button.module.css';
import clsx from 'clsx';

export const DashboardPage = () => {
  const { user } = useAuthStore();

  const { data: stats, isLoading: statsLoading, error: statsError } = useUserStats();

  const { data: games, isLoading: gamesLoading, error: gamesError } = useUserGames();

  const continueGameMutation = useContinueGame();
  const updateStreakMutation = useUpdateStreak();

  useEffect(() => {
    if (user?.id) {
      updateStreakMutation.mutate();
    }
  }, [user?.id, updateStreakMutation]);

  const isLoading = statsLoading || gamesLoading;
  const error = statsError || gamesError;

  const handleContinueGame = (gameId: string) => {
    continueGameMutation.mutate(gameId);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingScreen />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Error Loading Dashboard</h2>
        <p className={styles.errorMessage}>{error.message}</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Welcome Section */}
      <section className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>Welcome back, {user?.name || 'Player'}!</h1>
        <p className={styles.welcomeSubtitle}>Ready to practice today?</p>
      </section>

      {/* Stats Grid */}
      {stats && (
        <div className={styles.statsGrid}>
          {/* Streak Card - используем Card с кастомными стилями */}
          <Card
            className={clsx(cardStyles.card, styles.statCard)}
            icon={<StreakIcon className={cardStyles.iconWrapper} />}
            title="Streak"
            description={`${stats.streak} days`}
          >
            <div className={styles.statSubtitle}>Current streak</div>
          </Card>

          {/* Last Session Card */}
          {stats.lastSession && (
            <Card
              className={clsx(cardStyles.card, styles.statCard)}
              icon={<ClockIcon className={cardStyles.iconWrapper} />}
              title="Last Session"
            >
              {stats.lastSession.time && (
                <div className={styles.statTime}>{stats.lastSession.time}</div>
              )}
              <div className={styles.statDate}>{stats.lastSession.date}</div>
            </Card>
          )}

          {/* Best Time Card */}
          <Card
            className={clsx(cardStyles.card, styles.statCard)}
            icon={<TrophyIcon className={cardStyles.iconWrapper} />}
            title="Best Time"
          >
            <div className={styles.statValue}>
              {stats.bestTime.minutes}:{stats.bestTime.seconds.toString().padStart(2, '0')}
            </div>
            <div className={styles.statSubtitle}>Personal record</div>
          </Card>
        </div>
      )}

      {/* Games Section */}
      {games && games.length > 0 && (
        <section className={styles.gameSection}>
          <h2 className={styles.gameTitle}>Continue Learning</h2>
          {games.map((game) => (
            <Card key={game.id} className={clsx(cardStyles.card, styles.gameCard)}>
              <div className={styles.gameHeader}>
                <div className={styles.gameName}>{game.name}</div>
                <div className={styles.gameLevels}>
                  Levels completed: {game.levelsCompleted} / {game.totalLevels}
                </div>
              </div>

              <div className={styles.progressSection}>
                <div className={styles.progressLabel}>
                  <span>Progress</span>
                  <span>{game.progress}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${game.progress}%` }} />
                </div>
              </div>

              <div className={styles.gameFooter}>
                <div className={styles.currentLevel}>
                  Current level: <span>{game.currentLevel}</span>
                </div>
                <Button
                  variant="primary"
                  onClick={() => handleContinueGame(game.id)}
                  disabled={continueGameMutation.isPending}
                  className={buttonStyles.btn}
                >
                  {continueGameMutation.isPending ? 'Loading...' : 'Continue Game'}
                </Button>
              </div>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
};

export default DashboardPage;

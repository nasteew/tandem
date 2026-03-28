import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
import { ErrorBlock } from '@/components/ErrorComponent/ErrorComponent';

export const DashboardPage = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation(['dashboard', 'widgets']);

  const { data: stats, isLoading: statsLoading, error: statsError } = useUserStats();

  const { data: games, isLoading: gamesLoading, error: gamesError } = useUserGames();

  const continueGameMutation = useContinueGame();
  const updateStreakMutation = useUpdateStreak();
  const hasUpdatedStreak = useRef(false);
  const statsLoaded = useRef(false);

  useEffect(() => {
    if (stats) {
      statsLoaded.current = true;
    }
  }, [stats]);

  useEffect(() => {
    if (user?.id && statsLoaded.current && !hasUpdatedStreak.current) {
      hasUpdatedStreak.current = true;
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
    return <ErrorBlock message={error.message} />;
  }

  return (
    <div className={styles.container}>
      {/* Welcome Section */}
      <section className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>{t('welcome.title', { name: user?.name || t('welcome.player') })}</h1>
        <p className={styles.welcomeSubtitle}>{t('welcome.subtitle')}</p>
      </section>

      {/* Stats Grid */}
      {stats && (
        <div className={styles.statsGrid}>
          {/* Streak Card - используем Card с кастомными стилями */}
          <Card
            className={clsx(cardStyles.card, styles.statCard)}
            icon={<StreakIcon className={cardStyles.iconWrapper} />}
            title={t('stats.streak.title')}
            description={t('stats.streak.days', { count: stats.streak })}
          >
            <div className={styles.statSubtitle}>{t('stats.streak.subtitle')}</div>
          </Card>

          {/* Last Session Card */}
          {stats.lastSession && (
            <Card
              className={clsx(cardStyles.card, styles.statCard)}
              icon={<ClockIcon className={cardStyles.iconWrapper} />}
              title={t('stats.lastSession.title')}
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
            title={t('stats.bestTime.title')}
          >
            <div className={styles.statValue}>
              {stats.bestTime.minutes}:{stats.bestTime.seconds.toString().padStart(2, '0')}
            </div>
            <div className={styles.statSubtitle}>{t('stats.bestTime.subtitle')}</div>
          </Card>
        </div>
      )}

      {/* Games Section */}
      {games && games.length > 0 && (
        <section className={styles.gameSection}>
          <h2 className={styles.gameTitle}>{t('games.title')}</h2>
          {games.map((game) => (
            <Card key={game.id} className={clsx(cardStyles.card, styles.gameCard)}>
              <div className={styles.gameHeader}>
                <div className={styles.gameName}>{t(`meta.${game.id}.label`, { ns: 'widgets', defaultValue: game.name })}</div>
                <div className={styles.gameLevels}>
                  {t('games.levelsCompleted', { completed: game.levelsCompleted, total: game.totalLevels })}
                </div>
              </div>

              <div className={styles.progressSection}>
                <div className={styles.progressLabel}>
                  <span>{t('games.progress')}</span>
                  <span>{game.progress}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${game.progress}%` }} />
                </div>
              </div>

              <div className={styles.gameFooter}>
                <div className={styles.currentLevel}>
                  {t('games.currentLevel')} <span>{game.currentLevel}</span>
                </div>
                <Button
                  variant="primary"
                  onClick={() => handleContinueGame(game.id)}
                  disabled={continueGameMutation.isPending}
                  className={buttonStyles.btn}
                >
                  {continueGameMutation.isPending ? t('games.loading') : t('games.continue')}
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

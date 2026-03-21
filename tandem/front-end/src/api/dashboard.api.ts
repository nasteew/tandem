import type { DashboardData, UserStats, GameSession } from '@/types/dashboard.types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Искусственная задержка для эмуляции сети
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () => delay(300 + Math.random() * 500); // 300-800ms

// ========== MOCK DATA ==========
const MOCK_USER_STATS: UserStats = {
  streak: 5,
  lastSession: {
    date: '2026-03-18',
    time: '14:32',
  },
  bestTime: {
    minutes: 0,
    seconds: 42,
  },
  levelsCompleted: 7,
  totalLevels: 30,
  currentLevel: 8,
  progress: 23,
};

const MOCK_GAMES: GameSession[] = [
  {
    id: 'async-sorter-1',
    name: 'Async Sorter',
    levelsCompleted: 7,
    totalLevels: 30,
    currentLevel: 8,
    progress: 23,
  },
  {
    id: 'code-quest-1',
    name: 'Code Quest',
    levelsCompleted: 3,
    totalLevels: 20,
    currentLevel: 4,
    progress: 15,
  },
];

const MOCK_DASHBOARD_DATA: DashboardData = {
  userStats: MOCK_USER_STATS,
  games: MOCK_GAMES,
};

// ========== DATA MAPPERS (для реального API) ==========
// Если бэкенд возвращает данные в snake_case, маппим в camelCase

interface RawUserStats {
  streak: number;
  last_session?: {
    date: string;
    time?: string;
  };
  best_time: {
    minutes: number;
    seconds: number;
  };
  levels_completed: number;
  total_levels: number;
  current_level: number;
  progress: number;
}

interface RawGameSession {
  id: string;
  name: string;
  levels_completed: number;
  total_levels: number;
  current_level: number;
  progress: number;
}

interface RawDashboardData {
  user_stats: RawUserStats;
  games: RawGameSession[];
}

const mapUserStats = (raw: RawUserStats): UserStats => ({
  streak: raw.streak,
  lastSession: raw.last_session
    ? {
        date: raw.last_session.date,
        time: raw.last_session.time,
      }
    : undefined,
  bestTime: {
    minutes: raw.best_time.minutes,
    seconds: raw.best_time.seconds,
  },
  levelsCompleted: raw.levels_completed,
  totalLevels: raw.total_levels,
  currentLevel: raw.current_level,
  progress: raw.progress,
});

const mapGameSession = (raw: RawGameSession): GameSession => ({
  id: raw.id,
  name: raw.name,
  levelsCompleted: raw.levels_completed,
  totalLevels: raw.total_levels,
  currentLevel: raw.current_level,
  progress: raw.progress,
});

const mapDashboardData = (raw: RawDashboardData): DashboardData => ({
  userStats: mapUserStats(raw.user_stats),
  games: raw.games.map(mapGameSession),
});

// ========== PUBLIC API ==========

/**
 * Получить данные для дашборда
 */
export const getDashboardData = async (): Promise<DashboardData> => {
  // MOCK MODE
  if (USE_MOCK) {
    console.log('⚠️ [MOCK] getDashboardData');
    await randomDelay();
    return MOCK_DASHBOARD_DATA;
  }

  // REAL MODE
  try {
    const response = await fetch('/api/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Добавляем токен авторизации если нужно
        // 'Authorization': `Bearer ${getToken()}`
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const raw: RawDashboardData = await response.json();
    return mapDashboardData(raw);
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    throw new Error('Failed to load dashboard data');
  }
};

/**
 * Получить только статистику пользователя
 */
export const getUserStats = async (): Promise<UserStats> => {
  if (USE_MOCK) {
    console.log('⚠️ [MOCK] getUserStats');
    await randomDelay();
    return MOCK_USER_STATS;
  }

  try {
    const response = await fetch('/api/dashboard/stats');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const raw: RawUserStats = await response.json();
    return mapUserStats(raw);
  } catch (error) {
    console.error('Failed to fetch user stats:', error);
    throw new Error('Failed to load user stats');
  }
};

/**
 * Получить список игр/сессий
 */
export const getUserGames = async (): Promise<GameSession[]> => {
  if (USE_MOCK) {
    console.log('⚠️ [MOCK] getUserGames');
    await randomDelay();
    return MOCK_GAMES;
  }

  try {
    const response = await fetch('/api/dashboard/games');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const raw: RawGameSession[] = await response.json();
    return raw.map(mapGameSession);
  } catch (error) {
    console.error('Failed to fetch user games:', error);
    throw new Error('Failed to load games');
  }
};

/**
 * Продолжить игру
 */
export const continueGame = async (gameId: string): Promise<{ redirectUrl: string }> => {
  if (USE_MOCK) {
    console.log('⚠️ [MOCK] continueGame', gameId);
    await randomDelay();
    return { redirectUrl: `/game/${gameId}` };
  }

  try {
    const response = await fetch(`/api/games/${gameId}/continue`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to continue game:', error);
    throw new Error('Failed to continue game');
  }
};

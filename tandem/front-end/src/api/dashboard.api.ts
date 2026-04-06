import { axiosInstance } from './axiosConfig';
import type { UserStats, GameSession } from '@/types/dashboard.types';
import { AxiosError } from 'axios';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Искусственная задержка для эмуляции сети
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () => delay(300 + Math.random() * 500);

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
    id: 'async-sorter',
    name: 'Async Sorter',
    levelsCompleted: 7,
    totalLevels: 30,
    currentLevel: 8,
    progress: 23,
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    levelsCompleted: 5,
    totalLevels: 20,
    currentLevel: 6,
    progress: 25,
  },
];

// ========== ТИПЫ ДЛЯ ОТВЕТОВ API ==========

interface GlobalStatsResponse {
  streakDays: number;
  lastVisit: string;
  bestTimeMs: number | null;
  completedLevelsCount: number;
}

interface WidgetStatsResponse {
  widget: string;
  lastLevel: string | null;
  totalCompleted: number;
  byDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
}

interface WidgetInfo {
  name: string;
  displayName?: string;
}

// ========== ПУБЛИЧНЫЕ API ==========

export const getAllWidgets = async (): Promise<WidgetInfo[]> => {
  if (USE_MOCK) {
    await randomDelay();
    return [
      { name: 'async-sorter', displayName: 'Async Sorter' },
      { name: 'memory-match', displayName: 'Memory Match' },
    ];
  }

  try {
    const response = await axiosInstance.get('/widgets/all');
    const widgets: string[] = response.data;

    return widgets.map((name) => ({
      name,
      displayName: name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    }));
  } catch (error) {
    console.error('Failed to fetch widgets list:', error);
    throw new Error('Failed to load widgets');
  }
};

export const getTotalLevels = async (widget: string): Promise<number> => {
  if (USE_MOCK) return 30;

  try {
    const response = await axiosInstance.get(`/widgets/${widget}/total`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch total levels for ${widget}:`, error);
    return 30;
  }
};

export const getUserStats = async (userId: number): Promise<UserStats> => {
  if (USE_MOCK) {
    console.log('⚠️ [MOCK] getUserStats');
    await randomDelay();
    return MOCK_USER_STATS;
  }

  try {
    const response = await axiosInstance.get<GlobalStatsResponse>(`/stats/global/${userId}`);
    const data = response.data;

    // Вычисляем прогресс (нужно получить общее количество уровней)
    // TODO: получить из конфига или агрегировать по всем виджетам
    const totalLevels = 30;
    const completedLevels = data.completedLevelsCount || 0;

    return {
      streak: data.streakDays || 0,
      lastSession: data.lastVisit
        ? {
            date: new Date(data.lastVisit).toISOString().split('T')[0],
            time: new Date(data.lastVisit).toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          }
        : undefined,
      bestTime: {
        minutes: Math.floor((data.bestTimeMs || 0) / 60000),
        seconds: Math.floor(((data.bestTimeMs || 0) % 60000) / 1000),
      },
      levelsCompleted: completedLevels,
      totalLevels: totalLevels,
      currentLevel: 1, // TODO: получить из последнего уровня
      progress: Math.round((completedLevels / totalLevels) * 100),
    };
  } catch (error) {
    console.error('Failed to fetch user stats:', error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to load user stats');
    }
    throw new Error('Failed to load user stats');
  }
};

export const getWidgetStats = async (
  userId: number,
  widget: string
): Promise<WidgetStatsResponse> => {
  if (USE_MOCK) {
    await randomDelay();
    return {
      widget,
      lastLevel: 'easy-8',
      totalCompleted: 7,
      byDifficulty: { easy: 7, medium: 0, hard: 0 },
    };
  }

  try {
    const response = await axiosInstance.get<WidgetStatsResponse>(
      `/stats/widget/${userId}/${widget}`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch stats for widget ${widget}:`, error);
    return {
      widget,
      lastLevel: null,
      totalCompleted: 0,
      byDifficulty: { easy: 0, medium: 0, hard: 0 },
    };
  }
};

export const getUserGames = async (userId: number): Promise<GameSession[]> => {
  if (USE_MOCK) {
    console.log('⚠️ [MOCK] getUserGames');
    await randomDelay();
    return MOCK_GAMES;
  }

  try {
    const widgets = await getAllWidgets();
    const games: GameSession[] = [];

    for (const widget of widgets) {
      const stats = await getWidgetStats(userId, widget.name);
      const totalLevels = await getTotalLevels(widget.name);

      const total =
        totalLevels && typeof totalLevels === 'number' && totalLevels > 0 ? totalLevels : 1;
      const completed = typeof stats.totalCompleted === 'number' ? stats.totalCompleted : 0;
      const currentLevel = stats.lastLevel ? parseInt(stats.lastLevel.split('-')[1]) || 1 : 1;

      games.push({
        id: widget.name,
        name: widget.displayName || widget.name,
        levelsCompleted: completed,
        totalLevels: total,
        currentLevel: currentLevel,
        progress: Math.round((completed / total) * 100),
      });
    }

    return games.sort((a, b) => b.progress - a.progress);
  } catch (error) {
    console.error('Failed to fetch user games:', error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to load games');
    }
    throw new Error('Failed to load games');
  }
};

export const continueGame = async (
  userId: number,
  gameId: string
): Promise<{ redirectUrl: string }> => {
  if (USE_MOCK) {
    await randomDelay();
    return { redirectUrl: `/widgets/${gameId}/easy/1` };
  }

  try {
    const stats = await getWidgetStats(userId, gameId);
    let difficulty = 'easy';
    let level = 1;
    if (stats.lastLevel) {
      const [diff, lvl] = stats.lastLevel.split('-');
      difficulty = diff;
      level = parseInt(lvl, 10);
    }
    return { redirectUrl: `/widgets/${gameId}/${difficulty}/${level}` };
  } catch (error) {
    console.error('Failed to continue game:', error);
    throw new Error('Failed to continue game');
  }
};

export const updateStreak = async (userId: number): Promise<void> => {
  if (USE_MOCK) {
    console.log('⚠️ [MOCK] updateStreak');
    await randomDelay();
    return;
  }

  try {
    await axiosInstance.post(`/stats/global/${userId}/streak`);
  } catch (error) {
    console.error('Failed to update streak:', error);
  }
};

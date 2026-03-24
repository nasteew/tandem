export interface GlobalStatsUser {
  userId: number;
  streakDays: number;
  bestTimeMs: number | null;
  completedLevelsCount: number;
  lastVisit: string;
  user: {
    name: string;
    avatarUrl: string | null;
  };
}

export type SortBy = 'streak' | 'levels' | 'time';

export interface UserStats {
  streak: number;
  lastSession?: {
    date: string; // ISO format: "2026-03-18"
    time?: string; // "14:32"
  };
  bestTime: {
    minutes: number;
    seconds: number;
  };
  levelsCompleted: number;
  totalLevels: number;
  currentLevel: number;
  progress: number; // процент (0-100)
}

export interface GameSession {
  id: string;
  name: string;
  levelsCompleted: number;
  totalLevels: number;
  currentLevel: number;
  progress: number;
}

export interface DashboardData {
  userStats: UserStats;
  games: GameSession[];
}

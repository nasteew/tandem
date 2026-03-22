// remove?
export interface UserStats {
  streak: number;
  lastSession?: {
    date: string;
    time?: string;
  };
  bestTime: {
    minutes: number;
    seconds: number;
  };
  levelsCompleted: number;
  totalLevels: number;
  currentLevel: number;
  progress: number;
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

export type WidgetStatsResponse = {
  widget: string;
  lastLevel: string | null;
  totalCompleted: number;
  byDifficulty: Record<string, number>;
};

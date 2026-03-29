export type InterviewLevel = 'junior' | 'middle' | 'senior';

export const INTERVIEW_LEVELS: InterviewLevel[] = ['junior', 'middle', 'senior'];

export const INTERVIEW_LEVEL_STORAGE_KEY = 'tandem_interview_level';

export function readStoredInterviewLevel(): InterviewLevel | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = localStorage.getItem(INTERVIEW_LEVEL_STORAGE_KEY);
    if (v === 'junior' || v === 'middle' || v === 'senior') return v;
    return null;
  } catch {
    return null;
  }
}

export function writeStoredInterviewLevel(level: InterviewLevel): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(INTERVIEW_LEVEL_STORAGE_KEY, level);
  } catch {
    return;
  }
}

export function deleteStoredInterviewLevel(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(INTERVIEW_LEVEL_STORAGE_KEY);
  } catch {
    return;
  }
}

export function interviewIntroMessage(level: InterviewLevel, lang: string = 'en'): string {
  const labels: Record<InterviewLevel, string> = {
    junior: 'Junior',
    middle: 'Middle',
    senior: 'Senior',
  };
  
  if (lang.startsWith('ru')) {
    return `Вы находитесь в режиме интервью для уровня **${labels[level]}**. Я буду задавать короткие технические вопросы, по одному за раз. Напишите что-нибудь, когда будете готовы начать.`;
  }
  
  return `You are in **${labels[level]} interview mode**. I will ask short questions, one at a time, like in a real technical interview. Type when you're ready to start.`;
}

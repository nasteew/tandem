import { Bot } from 'lucide-react';
import type { InterviewLevel } from '../../types/interviewLevel';
import { INTERVIEW_LEVELS } from '../../types/interviewLevel';

const LEVEL_LABELS: Record<InterviewLevel, string> = {
  junior: 'Junior',
  middle: 'Middle',
  senior: 'Senior',
};

interface InterviewLevelOverlayProps {
  onSelect: (level: InterviewLevel) => void;
}

export const InterviewLevelOverlay = ({ onSelect }: InterviewLevelOverlayProps) => {
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="interview-level-title"
    >
      <div className="max-w-md w-full rounded-2xl border border-indigo-500/30 bg-slate-900/95 p-8 shadow-xl shadow-indigo-500/10">
        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot className="w-9 h-9 text-white" aria-hidden />
          </div>
          <h2 id="interview-level-title" className="text-xl font-semibold text-white">
            Choose your interview level
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            The agent will ask short questions like in a real interview. You can change your mind
            later by deleting the site's storage or starting a new conversation.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {INTERVIEW_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onSelect(level)}
              className="w-full py-3.5 px-4 rounded-xl font-medium text-white bg-slate-800 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800/80 hover:cursor-pointer transition-colors"
            >
              {LEVEL_LABELS[level]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

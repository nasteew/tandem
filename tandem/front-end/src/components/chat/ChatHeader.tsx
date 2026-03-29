import { Bot, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ChatHeaderProps {
  voiceEnabled?: boolean;
  onVoiceToggle?: () => void;
  onRestart?: () => void; // 👈 nueva prop
}

export const ChatHeader = ({ voiceEnabled, onVoiceToggle, onRestart }: ChatHeaderProps) => {
  const { t } = useTranslation('agent');
  const showVoiceToggle = voiceEnabled !== undefined && onVoiceToggle !== undefined;

  return (
    <header className="h-16 border-b border-[var(--color-border-light)] bg-[var(--ai-blocks-color)] backdrop-blur-xl px-4 flex items-center gap-4 sticky top-0 z-10">

      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="font-semibold text-[var(--color-text-white)]">{t('header.title')}</h1>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-400">{t('header.status')}</span>
          </div>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* 🔁 Restart button */}
        {onRestart && (
          <button
            type="button"
            onClick={onRestart}
            aria-label={t('header.ariaRestart')}
            className="p-2 text-slate-400 hover:text-white hover:cursor-pointer hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}

        {/* 🔊 Voice toggle */}
        {showVoiceToggle && (
          <button
            type="button"
            onClick={onVoiceToggle}
            aria-pressed={voiceEnabled}
            aria-label={voiceEnabled ? t('header.ariaMute') : t('header.ariaUnmute')}
            className="p-2 text-slate-400 hover:text-white hover:cursor-pointer hover:bg-slate-800 rounded-lg transition-colors"
          >
            {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        )}
      </div>
    </header>
  );
};

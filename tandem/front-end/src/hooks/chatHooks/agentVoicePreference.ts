const STORAGE_KEY = 'tandem_agent_voice_enabled';

export function readAgentVoiceEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'false') return false;
    return true;
  } catch {
    return true;
  }
}

export function writeAgentVoiceEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');
  } catch {
    /* ignore */
  }
}

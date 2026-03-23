import { useCallback, useState } from 'react';
import { useChat } from '../../hooks/chatHooks/useChat';
import { ChatHeader } from '../../components/chat/ChatHeader';
import { ChatMessageList } from '../../components/chat/ChatMessageList';
import { ChatInput } from '../../components/chat/ChatInput';
import { InterviewLevelOverlay } from '../../components/chat/InterviewLevelOverlay';
import {
  readAgentVoiceEnabled,
  writeAgentVoiceEnabled,
} from '../../hooks/chatHooks/agentVoicePreference';
import type { InterviewLevel } from '../../types/interviewLevel';
import { readStoredInterviewLevel, writeStoredInterviewLevel } from '../../types/interviewLevel';

export const AgentPage = () => {
  const [interviewLevel, setInterviewLevel] = useState<InterviewLevel | null>(() =>
    readStoredInterviewLevel()
  );

  const {
    messages,
    input,
    setInput,
    loading,
    latestAssistantStreamDone,
    bottomRef,
    send,
    beginInterviewSession,
  } = useChat(interviewLevel);

  const [voiceEnabled, setVoiceEnabled] = useState(readAgentVoiceEnabled);

  const toggleVoice = useCallback(() => {
    setVoiceEnabled((prev) => {
      const next = !prev;
      writeAgentVoiceEnabled(next);
      return next;
    });
  }, []);

  const handleSelectInterviewLevel = useCallback(
    (level: InterviewLevel) => {
      writeStoredInterviewLevel(level);
      if (interviewLevel === null) {
        beginInterviewSession(level);
      }
      setInterviewLevel(level);
    },
    [interviewLevel, beginInterviewSession]
  );

  return (
    <div className="relative bg-slate-950 flex flex-col overflow-hidden w-full h-[calc(100vh-94px)] mt-[34px] min-[481px]:mt-[24px] md:mt-[32px] md:h-[calc(100vh-112px)]">
      {interviewLevel === null ? (
        <InterviewLevelOverlay onSelect={handleSelectInterviewLevel} />
      ) : null}
      <ChatHeader voiceEnabled={voiceEnabled} onVoiceToggle={toggleVoice} />
      <ChatMessageList
        messages={messages}
        bottomRef={bottomRef}
        loading={loading}
        latestAssistantStreamDone={latestAssistantStreamDone}
        voiceEnabled={voiceEnabled}
      />
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={send}
        loading={loading}
        disabled={interviewLevel === null}
      />
    </div>
  );
};

export default AgentPage;

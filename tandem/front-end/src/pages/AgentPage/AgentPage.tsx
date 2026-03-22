import { useCallback, useState } from 'react';
import { useChat } from '../../hooks/chatHooks/useChat';
import { ChatHeader } from '../../components/chat/ChatHeader';
import { ChatMessageList } from '../../components/chat/ChatMessageList';
import { ChatInput } from '../../components/chat/ChatInput';
import {
  readAgentVoiceEnabled,
  writeAgentVoiceEnabled,
} from '../../hooks/chatHooks/agentVoicePreference';

export const AgentPage = () => {
  const { messages, input, setInput, loading, latestAssistantStreamDone, bottomRef, send } =
    useChat();

  const [voiceEnabled, setVoiceEnabled] = useState(readAgentVoiceEnabled);

  const toggleVoice = useCallback(() => {
    setVoiceEnabled((prev) => {
      const next = !prev;
      writeAgentVoiceEnabled(next);
      return next;
    });
  }, []);

  return (
    <div className="bg-slate-950 flex flex-col overflow-hidden w-full h-[calc(100vh-94px)] mt-[34px] min-[481px]:mt-[24px] md:mt-[32px] md:h-[calc(100vh-112px)]">
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
      />
    </div>
  );
};

export default AgentPage;

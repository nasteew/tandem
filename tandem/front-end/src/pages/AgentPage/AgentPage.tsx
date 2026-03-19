import { useChat } from '../../hooks/chatHooks/useChat';
import { ChatHeader } from '../../components/chat/ChatHeader';
import { ChatMessageList } from '../../components/chat/ChatMessageList';
import { ChatInput } from '../../components/chat/ChatInput';

export const AgentPage = () => {
  const { messages, input, setInput, loading, bottomRef, send } = useChat();

  return (
    <div className="bg-slate-950 flex flex-col overflow-hidden w-full h-[calc(100vh-94px)] mt-[34px] min-[481px]:mt-[24px] md:mt-[32px] md:h-[calc(100vh-112px)]">
      <ChatHeader />
      <ChatMessageList
        messages={messages}
        bottomRef={bottomRef}
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

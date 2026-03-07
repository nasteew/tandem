import { useChat } from '../../hooks/useChat';
import { ChatHeader } from '../../components/chat/ChatHeader';
import { ChatMessageList } from '../../components/chat/ChatMessageList';
import { ChatInput } from '../../components/chat/ChatInput';

export const AgentPage = () => {
  const { messages, input, setInput, loading, bottomRef, send } = useChat();

  return (
    <div className="h-screen bg-slate-950 flex flex-col overflow-hidden">
      <ChatHeader />
      <ChatMessageList
        messages={messages}
        loading={loading}
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

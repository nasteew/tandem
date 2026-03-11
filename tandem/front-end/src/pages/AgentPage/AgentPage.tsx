import { useChat } from '../../hooks/chatHooks/useChat';
import { ChatHeader } from '../../components/Chat/ChatHeader';
import { ChatMessageList } from '../../components/Chat/ChatMessageList';
import { ChatInput } from '../../components/Chat/ChatInput';

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

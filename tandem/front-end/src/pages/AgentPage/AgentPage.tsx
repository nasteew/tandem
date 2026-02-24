import { ArrowLeft, Send, Sparkles, Bot, User } from 'lucide-react';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';

import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/Card/Card';
import { Input } from '../../components/ui/Input/Input';


import { useEffect, useRef, useState } from 'react';


const TypingMessage = ({ content, onUpdate }: { content: string; onUpdate?: () => void }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (content.length <= displayed.length) {
      setDisplayed('');
    }

    let idx = displayed.length;
    if (idx >= content.length) return;

    const timer = setInterval(() => {
      idx += 1;
      setDisplayed(content.slice(0, idx));
      onUpdate?.();
      if (idx >= content.length) clearInterval(timer);
    }, 12);

    return () => clearInterval(timer);
  }, [content]);

  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-5 mb-2">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-5 mb-2">{children}</ol>,
        li: ({ children }) => <li className="mb-1">{children}</li>,
        code: ({ children, className }) => {
          const isBlock = className?.includes('language-');
          return isBlock ? (
            <pre className="bg-slate-800 rounded-lg p-3 my-2 overflow-x-auto">
              <code className={`text-sm text-emerald-400 ${className ?? ''}`}>{children}</code>
            </pre>
          ) : (
            <code className="bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">{children}</code>
          );
        },
        pre: ({ children }) => <>{children}</>,
        h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-base font-semibold mb-1">{children}</h3>,
        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noreferrer" className="text-indigo-400 underline hover:text-indigo-300">{children}</a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-indigo-500 pl-3 italic text-slate-400 my-2">{children}</blockquote>
        ),
      }}
    >
      {displayed || ' '}
    </ReactMarkdown>
  );
};

export const AgentPage = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI pair programmer...",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const handleSend = async () => {
  if (!input.trim() || loading) return;

  // Cancel previous request if exists
  abortRef.current?.abort();

  const controller = new AbortController();
  abortRef.current = controller;

  const userMessage = { role: 'user' as const, content: input };
  setMessages((prev) => [...prev, userMessage]);

  const currentInput = input;
  setInput('');
  setLoading(true);

  try {
    const response = await fetch(`http://localhost:3001/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: currentInput }),
      signal: controller.signal,
    });

    if (!response.ok || !response.body) {
      throw new Error('Failed to fetch AI response');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let accumulated = '';

    // Insert assistant placeholder once
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: '' },
    ]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      accumulated += decoder.decode(value);

      // Update only last message
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: accumulated,
        };
        return updated;
      });
    }

  } catch (error: unknown) {
    if (error instanceof Error && error.name !== 'AbortError') {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ Something went wrong. Please try again.',
        },
      ]);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="h-screen bg-slate-950 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl px-4 flex items-center gap-4 sticky top-0 z-10">
        <Link
          to="/library"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-white">Tandem AI Agent</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-400">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full flex flex-col gap-6 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            {msg.role === 'assistant' ? (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 flex-shrink-0 flex items-center justify-center mt-1">
                <Bot className="w-5 h-5 text-white" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-slate-700 flex-shrink-0 flex items-center justify-center mt-1">
                <User className="w-5 h-5 text-slate-300" />
              </div>
            )}

            {/* Message Bubble */}
            {msg.role === 'assistant' ? (
              <Card className="bg-slate-900 border-indigo-500/20 max-w-2xl">
                <div className="text-slate-300 leading-relaxed prose-sm">
                  <TypingMessage content={msg.content} onUpdate={scrollToBottom} />
                </div>
              </Card>
            ) : (
              <div className="bg-indigo-600 rounded-xl p-4 max-w-2xl text-white shadow-lg shadow-indigo-500/10">
                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 flex-shrink-0 flex items-center justify-center mt-1">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <Card className="bg-slate-900 border-indigo-500/20">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </Card>
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto relative">
          <Input 
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          placeholder="Ask anything about your code..." className="pr-24 py-4 text-base" />
          <div className="absolute right-2 top-2 flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 rounded-full hover:bg-slate-800 text-slate-400"
            >
              <Sparkles className="w-4 h-4" />
            </Button>
            <Button size="sm" className="h-8 px-3" onClick={handleSend}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-2">
          AI can make mistakes. Please review generated code.
        </p>
      </div>
    </div>
  );
};
export default AgentPage;




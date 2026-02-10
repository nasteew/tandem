import { ArrowLeft, Send, Sparkles, Bot, User } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export const AgentPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
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
        {/* Welcome Message */}
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 flex-shrink-0 flex items-center justify-center mt-1">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <Card className="bg-slate-900 border-indigo-500/20 max-w-2xl">
            <p className="text-slate-300 leading-relaxed">
              Hello! I'm your AI pair programmer. I can help you with:
            </p>
            <ul className="mt-2 space-y-1 text-slate-400 list-disc list-inside">
              <li>Code reviews and refactoring</li>
              <li>Debugging complex issues</li>
              <li>Generating test cases</li>
              <li>Architecture discussions</li>
            </ul>
            <p className="mt-3 text-slate-300">How can I assist you today?</p>
          </Card>
        </div>

        {/* User Message */}
        <div className="flex gap-4 flex-row-reverse">
          <div className="w-8 h-8 rounded-lg bg-slate-700 flex-shrink-0 flex items-center justify-center mt-1">
            <User className="w-5 h-5 text-slate-300" />
          </div>
          <div className="bg-indigo-600 rounded-xl p-4 max-w-2xl text-white shadow-lg shadow-indigo-500/10">
            <p className="leading-relaxed">
              I'm trying to optimize a React component that's re-rendering too often. Can you help
              me look at it?
            </p>
          </div>
        </div>

        {/* AI Response with Code */}
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 flex-shrink-0 flex items-center justify-center mt-1">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 max-w-3xl space-y-4">
            <Card className="bg-slate-900 border-indigo-500/20">
              <p className="text-slate-300 mb-3">
                Absolutely! To prevent unnecessary re-renders, we should look at `React.memo` and
                ensuring your props are stable. Here is a quick example pattern:
              </p>
              <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-slate-300 border border-slate-800 overflow-x-auto">
                <pre>{`import { memo, useCallback } from 'react';

const ExpensiveComponent = memo(({ onClick, data }) => {
  console.log("Rendered!");
  return <div onClick={onClick}>{data}</div>;
});

// In parent:
const handleClick = useCallback(() => { ... }, []);`}</pre>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto relative">
          <Input placeholder="Ask anything about your code..." className="pr-24 py-4 text-base" />
          <div className="absolute right-2 top-2 flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 rounded-full hover:bg-slate-800 text-slate-400"
            >
              <Sparkles className="w-4 h-4" />
            </Button>
            <Button size="sm" className="h-8 px-3">
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

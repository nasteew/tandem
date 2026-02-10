import Editor from '@monaco-editor/react';
import { ArrowLeft, Play, RotateCw, Code2, Terminal } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const TrainingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl px-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link
            to="/library"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h1 className="font-semibold text-white">JavaScript Basics: Array Manipulation</h1>
              <span className="text-xs text-slate-400">Chapter 1 • Duration: 15m</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RotateCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Play className="w-4 h-4 mr-2" />
            Run Code
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-64px)] overflow-hidden">
        {/* Helper/Instructions Panel */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Challenge Description</h2>
            <div className="prose prose-invert max-w-none text-slate-300">
              <p>
                Write a function called `filterEvenNumbers` that takes an array of numbers and
                returns a new array containing only the even numbers.
              </p>
              <h3 className="text-lg font-medium text-white mt-4 mb-2">Example:</h3>
              <pre className="bg-slate-950 p-3 rounded-lg text-sm border border-slate-800">
                {`Input: [1, 2, 3, 4, 5, 6]
Output: [2, 4, 6]`}
              </pre>
              <h3 className="text-lg font-medium text-white mt-4 mb-2">Requirements:</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Do not modify the original array.</li>
                <li>Use `filter` method if possible.</li>
              </ul>
            </div>
          </Card>

          <Card className="flex-1 p-0 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-300">Console Output</span>
            </div>
            <div className="flex-1 p-4 font-mono text-sm space-y-2 overflow-y-auto bg-slate-950">
              <div className="text-slate-500">{`> Waiting for execution...`}</div>
            </div>
          </Card>
        </div>

        {/* Editor Panel */}
        <Card className="p-0 overflow-hidden flex flex-col h-full border-slate-800 bg-[#1e1e1e]">
          <div className="p-2 border-b border-slate-800 flex items-center justify-between bg-[#1e1e1e]">
            <span className="text-sm text-slate-400 px-2">solution.js</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Auto-saved</span>
            </div>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue="// Write your solution here
function filterEvenNumbers(arr) {
  // Your code goes here
  
}"
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default TrainingPage;

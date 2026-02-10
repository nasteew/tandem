import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950">
      <div className="absolute top-8 left-8">
        <Link
          to="/"
          className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <Card className="w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-3xl border-slate-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-400">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                className="rounded bg-slate-800 border-slate-700 text-indigo-500 focus:ring-indigo-500"
              />
              Remember me
            </label>
            <a href="#" className="text-indigo-400 hover:text-indigo-300">
              Forgot password?
            </a>
          </div>

          <Button type="submit" fullWidth size="lg">
            Sign In
          </Button>

          <div className="text-center text-sm text-slate-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign up
            </Link>
          </div>
        </form>
      </Card>

      {/* Background decoration */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
    </div>
  );
};

export default AuthPage;

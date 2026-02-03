import { Link } from "react-router";
import { ArrowRight, LayoutDashboard, User, BookOpen, Bot, Code2, Lock } from "lucide-react";
import { Card } from "../components/ui/Card";

export const LandingPage = () => {
  const pages = [
    {
      title: "Authentication",
      description: "Login and Registration page mockup.",
      path: "/auth",
      icon: <Lock className="w-8 h-8 text-pink-500" />,
    },
    {
      title: "Dashboard",
      description: "Main dashboard with stats and sidebar.",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-8 h-8 text-indigo-500" />,
    },
    {
      title: "Library",
      description: "Resource library grid layout.",
      path: "/library",
      icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
    },
    {
      title: "Profile",
      description: "User settings and profile management.",
      path: "/profile",
      icon: <User className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "AI Agent",
      description: "AI chat interface mock.",
      path: "/library/agent",
      icon: <Bot className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "Training",
      description: "Coding challenge interface mock.",
      path: "/library/training",
      icon: <Code2 className="w-8 h-8 text-orange-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500 mb-6">
            Tandem Pages
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Directory of all available application views.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Link to={page.path} key={page.path} className="block group">
              <Card hoverEffect className="h-full flex flex-col p-6 border-slate-800 bg-slate-900/50">
                <div className="mb-6 bg-slate-800/50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {page.icon}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{page.title}</h2>
                <p className="text-slate-400 mb-6 flex-1">{page.description}</p>
                <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-white transition-colors mt-auto">
                  View Page <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

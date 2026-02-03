import { Link } from "react-router";
import { BarChart, Users, BookOpen, Settings, LogOut, Bell, Code2 } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950 p-4 hidden md:flex flex-col">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center">
            <span className="font-bold text-white">T</span>
          </div>
          <span className="text-xl font-bold text-white">Tandem</span>
        </div>

        <nav className="space-y-1 flex-1">
          <NavItem icon={<BarChart size={20} />} label="Overview" to="/dashboard" active />
          <NavItem icon={<Code2 size={20} />} label="Projects" to="#" />
          <NavItem icon={<Users size={20} />} label="Team" to="#" />
          <NavItem icon={<BookOpen size={20} />} label="Resources" to="/library" />
          <NavItem icon={<Settings size={20} />} label="Settings" to="/profile" />
        </nav>

        <div className="pt-4 border-t border-slate-800">
          <NavItem icon={<LogOut size={20} />} label="Sign Out" to="/" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-10 px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Dashboard</h1>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block w-64">
              <Input placeholder="Search..." className="bg-slate-900 border-none h-9" />
            </div>
            <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
              <Bell size={20} />
            </Button>
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-medium">
              JD
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Active Projects" value="12" change="+2.5%" trend="up" />
            <StatCard title="Total Time" value="48h" change="+12%" trend="up" />
            <StatCard title="Team Members" value="8" change="0%" trend="neutral" />
            <StatCard title="Tasks Completed" value="128" change="+18%" trend="up" />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2" title="Recent Projects">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 cursor-pointer transition-colors border border-transparent hover:border-indigo-500/20"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <Code2 size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Project Alpha {i}</h4>
                        <p className="text-sm text-slate-400">Updated 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="h-full" title="Quick Actions">
              <div className="space-y-3">
                <Button fullWidth variant="outline" className="justify-start">
                  <span className="mr-2">+</span> New Project
                </Button>
                <Button fullWidth variant="outline" className="justify-start">
                  <span className="mr-2">+</span> Invite Member
                </Button>
                <Button fullWidth variant="outline" className="justify-start">
                  <span className="mr-2">#</span> Create Channel
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, to = "#" }: { icon: React.ReactNode; label: string; active?: boolean; to?: string }) => (
  <Link
    to={to}
    className={`
    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
    ${active ? "bg-indigo-500/10 text-indigo-400" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}
  `}
  >
    {icon}
    {label}
  </Link>
);

const StatCard = ({ title, value, change, trend }: { title: string; value: string; change: string; trend: "up" | "down" | "neutral" }) => (
  <Card className="p-5">
    <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
    <div className="flex items-end justify-between">
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          trend === "up"
            ? "bg-emerald-500/10 text-emerald-400"
            : trend === "down"
              ? "bg-red-500/10 text-red-400"
              : "bg-slate-500/10 text-slate-400"
        }`}
      >
        {change}
      </span>
    </div>
  </Card>
);

export default DashboardPage;

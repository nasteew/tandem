import { Link } from "react-router";
import { ArrowLeft, Camera, User, Mail, Bell, Shield, Moon } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";

export const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-slate-400 mt-2">Manage your account information and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <Card className="md:col-span-1 h-fit p-4">
            <nav className="space-y-1">
              <NavButton icon={<User size={18} />} label="General" active />
              <NavButton icon={<Bell size={18} />} label="Notifications" />
              <NavButton icon={<Shield size={18} />} label="Security" />
              <NavButton icon={<Moon size={18} />} label="Appearance" />
            </nav>
          </Card>

          {/* Main Settings Area */}
          <div className="md:col-span-2 space-y-6">
            {/* Profile Avatar Section */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Profile Picture</h2>
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white w-6 h-6" />
                  </button>
                </div>
                <div>
                  <div className="flex gap-3 mb-2">
                    <Button size="sm">Upload New</Button>
                    <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                      Delete
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">Recommended: 400x400px, JPG or PNG.</p>
                </div>
              </div>
            </Card>

            {/* Personal Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="First Name" defaultValue="John" />
                  <Input label="Last Name" defaultValue="Doe" />
                </div>
                <Input label="Email Address" defaultValue="john.doe@example.com" icon={<Mail className="w-4 h-4" />} />
                <div className="pt-4">
                  <label className="block text-sm font-medium text-slate-400 mb-1.5">Bio</label>
                  <textarea
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white resize-none h-32 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                    defaultValue="Full-stack developer passionate about building great user experiences."
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <button
    className={`
    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
    ${active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800"}
  `}
  >
    {icon}
    {label}
  </button>
);

export default ProfilePage;

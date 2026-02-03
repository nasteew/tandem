import { Link } from "react-router";
import { BookOpen, Video, FileText, ArrowLeft } from "lucide-react";
import { Card } from "../components/ui/Card";

export const LibraryPage = () => {
  const resources = [
    {
      title: "Getting Started with Tandem",
      type: "guide",
      description: "Learn the basics of pair programming and setting up your environment.",
      icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
      link: "/library/training",
    },
    {
      title: "AI Agent Interaction",
      type: "video",
      description: "Master the art of communicating with your AI pair programmer.",
      icon: <Video className="w-6 h-6 text-pink-400" />,
      link: "/library/agent",
    },
    {
      title: "Best Practices",
      type: "article",
      description: "Tips and tricks for efficient collaborative coding sessions.",
      icon: <FileText className="w-6 h-6 text-emerald-400" />,
      link: "#",
    },
    {
      title: "Advanced Features",
      type: "guide",
      description: "Deep dive into advanced features like custom workflows and integrations.",
      icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Resource Library</h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Explore our collection of guides, tutorials, and reference materials to help you get the most out of Tandem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Link to={resource.link} key={index}>
              <Card hoverEffect className="h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6">{resource.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                <p className="text-slate-400 mb-6 flex-1">{resource.description}</p>
                <div className="flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300">
                  Read more <span className="ml-1">→</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;

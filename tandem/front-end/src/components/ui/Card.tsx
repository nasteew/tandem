import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  hoverEffect?: boolean;
}

export const Card = ({ children, className = "", title, hoverEffect = false }: CardProps) => {
  return (
    <div
      className={`
        bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6
        ${hoverEffect ? "hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10" : ""}
        ${className}
      `}
    >
      {title && <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>}
      {children}
    </div>
  );
};

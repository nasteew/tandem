import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, icon, className = "", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-400 mb-1.5">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">{icon}</div>}
        <input
          ref={ref}
          className={`
              w-full py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white
              placeholder:text-slate-600 outline-none transition-all duration-200
              focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
              disabled:opacity-50 disabled:cursor-not-allowed
              ${icon ? "pl-10 pr-4" : "px-4"}
              ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
              ${className}
            `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

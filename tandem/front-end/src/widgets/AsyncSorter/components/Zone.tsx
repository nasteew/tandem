import React from 'react';
import type { ZoneType } from '../types/ComponentTypes';

interface ZoneProps {
  type: ZoneType;
  title: string;
  subtitle?: string;
  horizontal?: boolean;
  children: React.ReactNode;
  isHighlighted?: boolean;
}

const zoneColors: Record<ZoneType, string> = {
  pool: 'border-blue-400/40 bg-blue-400/5',
  callStack: 'border-purple-400/40 bg-purple-400/5',
  microtasks: 'border-pink-400/40 bg-pink-400/5',
  macrotasks: 'border-yellow-400/40 bg-yellow-400/5',
};

export function Zone({
  type,
  title,
  subtitle,
  horizontal = false,
  children,
  isHighlighted,
}: ZoneProps) {
  return (
    <div
      data-zone={type}
      className={`p-4 rounded-xl relative overflow-hidden transition-all ${
        isHighlighted ? 'ring-2 ring-blue-400 bg-blue-500/10' : ''
      } ${zoneColors[type]}`}
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--border-medium)',
        backdropFilter: 'var(--glass-blur)',
        minHeight: '135px',
      }}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(90deg,transparent_0%,rgba(96,165,250,0.05)_50%,transparent_100%)]" />
      <div className="text-base font-semibold mb-1" style={{ color: 'var(--accent-blue)' }}>
        {title}
      </div>
      {subtitle && (
        <div className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
          {subtitle}
        </div>
      )}
      <div className={horizontal ? 'flex flex-row flex-wrap gap-2' : 'flex flex-col gap-2'}>
        {children}
      </div>
    </div>
  );
}

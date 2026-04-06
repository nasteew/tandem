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
        isHighlighted ? 'ring-2 ring-[var(--color-primary)] bg-[var(--color-primary)]' : ''
      }`}
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--border-medium)',
        backdropFilter: 'var(--glass-blur)',
        minHeight: '135px',
      }}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(90deg,transparent_0%,rgba(96,165,250,0.05)_50%,transparent_100%)]" />
      <div className="text-base font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
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

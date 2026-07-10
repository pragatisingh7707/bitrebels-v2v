import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/* Shared visual language for dashboard pages. Keep this in one place so every dashboard stays visually consistent. */

export const surface = 'bg-white border border-slate-100 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)] rounded-2xl';
export const surfaceHover = 'hover:-translate-y-1 hover:shadow-[0_16px_45px_-18px_rgba(236,72,153,0.28)] transition-all duration-300';

export function Eyebrow({ children, action }) {
  return (
    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#EC4899] to-[#8B5CF6]" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">{children}</p>
      </div>
      {action}
    </div>
  );
}

export function ViewAll({ to, children = 'View all' }) {
  return (
    <Link to={to} className="text-sm font-semibold text-[#EC4899] hover:text-[#d9467f] flex items-center gap-1 transition-colors">
      {children} <ChevronRight className="h-3.5 w-3.5" />
    </Link>
  );
}
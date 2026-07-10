import React from 'react';

type StatusBadgeProps = Readonly<{
  status: string;
}>;

export default function StatusBadge({ status }: StatusBadgeProps) {
  const tones: Record<string, string> = {
    Pending: 'bg-secondary-50 text-secondary-700 border-secondary-200',
    Accepted: 'bg-primary-50 text-primary-700 border-primary-200',
    Upcoming: 'bg-primary-50 text-primary-700 border-primary-200',
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Cancelled: 'bg-slate-50 text-slate-600 border-slate-200',
    Rejected: 'bg-slate-50 text-slate-600 border-slate-200',
  };

  const toneClass = tones[status] ?? 'bg-slate-50 text-slate-600 border-slate-200';

  return <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold tracking-wide ${toneClass}`}>{status}</span>;
}

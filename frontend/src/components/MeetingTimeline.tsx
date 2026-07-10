import React from 'react';
import { Clock3, Video } from 'lucide-react';
import { Card } from './Card';
import StatusBadge from './StatusBadge';
import type { SessionItem } from '../types/mentorship';

interface MeetingTimelineProps {
  readonly items: SessionItem[];
  readonly emptyLabel: string;
}

export default function MeetingTimeline({ items, emptyLabel }: MeetingTimelineProps) {
  if (!items.length) {
    return <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-6 text-sm text-slate-500">{emptyLabel}</div>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card key={item.id} className="p-4 bg-white/80 backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Video className="h-4 w-4 text-primary-500" />
                {item.topic}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="flex items-center gap-1"><Clock3 className="h-4 w-4" /> {item.date} · {item.time}</span>
                <span>{item.mode}</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <StatusBadge status={item.status} />
              <a href={item.link} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary-600 hover:text-primary-700">Open link</a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

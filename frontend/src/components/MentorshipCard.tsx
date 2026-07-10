import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export type MentorshipCardProps = Readonly<{
  title: string;
  description: string;
  actionLabel: string;
  href: string;
}>;

export default function MentorshipCard({ title, description, actionLabel, href }: MentorshipCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
        <Sparkles className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <a href={href} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
        {actionLabel} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareText, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { communities } from '../data/dummyData';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

export default function Communities() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[28px] bg-gradient-to-r from-primary-600 via-fuchsia-600 to-secondary-600 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm text-white/80">
              <Sparkles className="h-4 w-4" /> Women-first community spaces
            </div>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Find your next conversation</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
              Browse alumni-led communities focused on product, AI, career prep, and strategic growth.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/80">
            <div className="flex items-center gap-2 font-semibold text-white">
              <MessageSquareText className="h-4 w-4" /> 24 active discussions
            </div>
            <p className="mt-1">Fresh questions posted by mentors and students every day.</p>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {communities.map((group) => (
          <Card key={group.id} className="flex h-full flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="primary">{group.category}</Badge>
                <span className="text-xs font-medium text-slate-500">{group.membersCount} members</span>
              </div>
              <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold text-slate-900">
                {group.name}
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{group.description}</p>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Users className="h-4 w-4" /> Active {group.lastActive}
              </div>
              <Button as={Link} to={`/communities/${group.id}`} variant="primary" size="sm" className="mt-4">
                Open community
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
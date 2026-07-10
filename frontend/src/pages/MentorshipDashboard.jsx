import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock3, Link2, Sparkles, BookOpen } from 'lucide-react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import StatusBadge from '../components/StatusBadge';
import MeetingTimeline from '../components/MeetingTimeline';
import RequestCard from '../components/RequestCard';
import { initialStudentRequests, mentorshipSessions } from '../data/mentorshipData';

export default function MentorshipDashboard() {
  const [requests] = useState(initialStudentRequests);
  const stats = useMemo(() => [
    { label: 'Upcoming sessions', value: requests.filter((request) => request.status === 'Accepted').length, icon: CalendarDays },
    { label: 'Pending requests', value: requests.filter((request) => request.status === 'Pending').length, icon: Clock3 },
    { label: 'Completed sessions', value: requests.filter((request) => request.status === 'Completed').length, icon: BookOpen },
    { label: 'Meeting links', value: requests.filter((request) => request.meetingLink).length, icon: Link2 },
  ], [requests]);

  const upcoming = mentorshipSessions.filter((session) => session.status === 'Upcoming');
  const completed = mentorshipSessions.filter((session) => session.status === 'Completed');
  const cancelled = mentorshipSessions.filter((session) => session.status === 'Cancelled');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-gradient-to-r from-primary-600 via-fuchsia-600 to-secondary-600 p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur"><Sparkles className="h-4 w-4" /> Student dashboard</div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your mentorship dashboard</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">Stay on top of every upcoming call, pending request, and completed session with calm clarity.</p>
          </div>
          <Badge variant="secondary" className="bg-white/15 text-white border-white/20">{requests.length} total requests</Badge>
        </div>
      </motion.section>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
              </div>
              <div className="rounded-2xl bg-primary-50 p-3 text-primary-600"><stat.icon className="h-5 w-5" /></div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Upcoming sessions</h2>
              <Badge variant="primary">Live</Badge>
            </div>
            <MeetingTimeline items={upcoming} emptyLabel="No upcoming sessions yet." />
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Pending requests</h2>
              <Badge variant="secondary">Needs review</Badge>
            </div>
            <div className="space-y-3">
              {requests.filter((request) => request.status === 'Pending').length ? requests.filter((request) => request.status === 'Pending').map((request) => <RequestCard key={request.id} request={request} mode="student" />) : <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-6 text-sm text-slate-500">No pending requests right now.</div>}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Accepted requests</h2>
              <StatusBadge status="Accepted" />
            </div>
            <div className="space-y-3">
              {requests.filter((request) => request.status === 'Accepted').length ? requests.filter((request) => request.status === 'Accepted').map((request) => <RequestCard key={request.id} request={request} mode="student" />) : <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-6 text-sm text-slate-500">No accepted requests yet.</div>}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Completed sessions</h2>
              <StatusBadge status="Completed" />
            </div>
            <MeetingTimeline items={completed} emptyLabel="No completed sessions yet." />
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Cancelled requests</h2>
              <StatusBadge status="Cancelled" />
            </div>
            <MeetingTimeline items={cancelled} emptyLabel="No cancelled sessions." />
          </section>
        </div>
      </div>
    </div>
  );
}

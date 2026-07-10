import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock3, Sparkles, Star, Users2 } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import RequestCard from '../components/RequestCard';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabaseclient';

export default function MentorDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from('mentorship_requests')
        .select('*')
        .eq('mentor_id', user.id);

      console.log('MentorDashboard fetched mentorship_requests', { mentorId: user.id, data, error });

      if (error) {
        console.error('Error fetching mentorship requests:', error);
        return;
      }

      setRequests(data || []);
    };

    fetchRequests();
  }, [user]);

  const stats = useMemo(
    () => [
      { label: 'Students mentored', value: 24, icon: Users2 },
      { label: 'Hours contributed', value: 86, icon: Clock3 },
      { label: 'Active requests', value: requests.filter((request) => request.status === 'Pending').length, icon: Sparkles },
      { label: 'Rating', value: '4.9/5', icon: Star },
    ],
    [requests],
  );

  const handleAction = (id, status) => {
    setRequests((prev) => prev.map((request) => (request.id === id ? { ...request, status } : request)));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-gradient-to-r from-primary-600 via-fuchsia-600 to-secondary-600 p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
              <Sparkles className="h-4 w-4" /> Alumni dashboard
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Mentorship dashboard for alumni</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">Review requests, accept meaningful conversations, and keep your mentoring workload balanced.</p>
          </div>
          <Badge variant="secondary" className="border-white/20 bg-white/15 text-white">
            {requests.filter((request) => request.status === 'Pending').length} pending
          </Badge>
        </div>
      </motion.section>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
                </div>
                <div className="rounded-2xl bg-primary-50 p-3 text-primary-600">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Pending requests</h2>
            <Badge variant="secondary">Needs action</Badge>
          </div>
          <div className="space-y-3">
            {requests.filter((request) => request.status === 'Pending').length ? (
              requests.filter((request) => request.status === 'Pending').map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  mode="alumni"
                  onAccept={() => handleAction(request.id, 'Accepted')}
                  onReject={() => handleAction(request.id, 'Rejected')}
                  onSuggest={() => handleAction(request.id, 'Accepted')}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-6 text-sm text-slate-500">No pending requests today.</div>
            )}
          </div>
        </section>

        <div className="space-y-8">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Accepted meetings</h2>
              <Badge variant="primary">Ready</Badge>
            </div>
            <div className="space-y-3">
              {requests.filter((request) => request.status === 'Accepted').length ? (
                requests.filter((request) => request.status === 'Accepted').map((request) => (
                  <Card key={request.id} className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{request.studentName}</p>
                        <p className="text-sm text-slate-500">{request.topic}</p>
                      </div>
                      <Badge variant="primary">Accepted</Badge>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-6 text-sm text-slate-500">No accepted meetings yet.</div>
              )}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Completed meetings</h2>
              <Badge variant="emerald">Completed</Badge>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-6 text-sm text-slate-500">
              No completed meetings yet. After each session, update your notes and close the loop.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

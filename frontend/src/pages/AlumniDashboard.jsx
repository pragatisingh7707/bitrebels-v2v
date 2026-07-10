import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, CalendarCheck, Star, FileUp, Check, X, MessageCircle, UploadCloud,
  Trophy, ChevronLeft, ChevronRight, Inbox, ThumbsUp, MessageSquare,
  Video, Clock, Sparkles, ArrowRight
} from 'lucide-react';

import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Eyebrow, ViewAll, surface, surfaceHover } from '../components/DashboardUI';

import {
  alumniProfile, pendingMentorshipRequests, studentRequests, acceptedSessions,
  upcomingMeetings, communityContributions, uploadedResources, quickStatistics,
  recentMessages, availabilitySlots, calendarHighlights, leaderboard
} from '../data/dummyData';

const statIcons = { Users, CalendarCheck, Star, FileUp };
const contributionIcons = { Answered: MessageCircle, Posted: MessageSquare };
const statAccent = {
  Users: 'bg-[#FDF2F8] text-[#EC4899]',
  CalendarCheck: 'bg-[#F5EFFF] text-[#8B5CF6]',
  Star: 'bg-amber-50 text-amber-500',
  FileUp: 'bg-emerald-50 text-emerald-600'
};

function MiniCalendar({ highlights = [] }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthLabel = today.toLocaleString('default', { month: 'long' });
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Card className={`p-5 ${surface}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{monthLabel} {year}</h3>
          <p className="text-xs text-slate-500 mt-0.5">Your mentor calendar</p>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <ChevronLeft className="h-3.5 w-3.5" />
          <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {weekdayLabels.map((d, i) => (
          <span key={i} className="text-[10px] font-semibold text-slate-400">{d}</span>
        ))}
        {cells.map((day, i) => {
          const isToday = day === today.getDate();
          const hasMeeting = day && highlights.includes(day);
          return (
            <div key={i} className="flex items-center justify-center">
              {day && (
                <span
                  className={`relative flex items-center justify-center h-7 w-7 rounded-full text-xs
                    ${isToday ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white font-semibold' : hasMeeting ? 'bg-pink-50 text-slate-700 font-medium' : 'text-slate-400'}`}
                >
                  {day}
                  {hasMeeting && !isToday && <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#EC4899]" />}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function AvailabilityToggle({ slots }) {
  const [available, setAvailable] = useState(true);
  return (
    <Card className={`p-5 ${surface}`}>
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Mentor availability</h3>
          <p className="text-xs text-slate-500 mt-0.5">Keep your schedule visible</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={available}
          onClick={() => setAvailable(v => !v)}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:ring-offset-2 ${available ? 'bg-emerald-500' : 'bg-slate-200'}`}
        >
          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200 ${available ? 'translate-x-[18px]' : 'translate-x-1'}`} />
        </button>
      </div>
      <p className={`text-xs font-medium mb-3 ${available ? 'text-emerald-600' : 'text-slate-500'}`}>
        {available ? 'Currently accepting new requests' : 'Not accepting new requests'}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {slots.map(slot => (
          <Badge key={slot} className="bg-[#FDF2F8] text-[#BE185D] border-[#FBCFE8]">{slot}</Badge>
        ))}
      </div>
    </Card>
  );
}

export default function AlumniDashboard() {
  const [requests, setRequests] = useState(pendingMentorshipRequests);
  const rankedLeaderboard = useMemo(() => [...leaderboard].sort((a, b) => a.rank - b.rank), []);

  const handleRequest = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.12),_transparent_30%),linear-gradient(135deg,_#fdf2f8_0%,_#ffffff_45%,_#f5ebff_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-[28px] border border-pink-100/80 bg-white/95 p-6 sm:p-8 shadow-[0_24px_80px_-30px_rgba(236,72,153,0.28)]"
        >
          <div className="pointer-events-none absolute -top-20 -right-10 h-48 w-48 rounded-full bg-gradient-to-br from-[#F9A8D4]/50 to-[#C4B5FD]/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-[#F3E8FF]/70 blur-3xl" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar name={alumniProfile.name} className="h-16 w-16 text-lg ring-4 ring-[#FDF2F8] shadow-lg" />
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#64748B]">
                  <Sparkles className="h-3.5 w-3.5 text-[#EC4899]" /> Alumni Dashboard
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-1">Welcome back, {alumniProfile.name.split(' ')[0]}</h1>
                <p className="text-slate-600 text-sm mt-2">{alumniProfile.role} at {alumniProfile.company} · {alumniProfile.memberSince}</p>
                <p className="text-sm text-slate-500 mt-3 max-w-2xl">Keep building meaningful connections and help shape the next generation of women in tech.</p>
              </div>
            </div>
            <Button as={Link} to="/mentors" className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#EC4899,#8B5CF6)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition-all hover:translate-y-[-1px] hover:shadow-xl">
              View Public Profile <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}>
          <Eyebrow>Quick statistics</Eyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {quickStatistics.map((stat, index) => {
              const Icon = statIcons[stat.icon];
              return (
                <motion.div key={stat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 * index }} className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_16px_50px_-24px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_-20px_rgba(236,72,153,0.28)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${statAccent[stat.icon] || 'bg-[#FDF2F8] text-[#EC4899]'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#EC4899] to-[#8B5CF6]" />
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <section>
              <Eyebrow action={<Badge className="rounded-full bg-[#FDF2F8] text-[#BE185D] border-[#FBCFE8]">{requests.length} pending</Badge>}>
                Pending mentorship requests
              </Eyebrow>
              {requests.length === 0 ? (
                <Card className={`p-8 text-center ${surface}`}>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF2F8] text-[#EC4899]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-900">You’re all caught up</p>
                  <p className="mt-1 text-sm text-slate-500">No mentorship requests are waiting for your response right now.</p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {requests.map(req => (
                    <motion.div key={req.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                      <Card className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 ${surface} ${surfaceHover}`}>
                        <Avatar name={req.studentName} className="h-11 w-11 text-sm ring-2 ring-[#FDF2F8]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900">{req.studentName} <span className="text-slate-500 font-normal">· {req.year}</span></p>
                          <p className="text-sm text-slate-500">{req.topic} · {req.requestedAgo}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                          <Button size="sm" onClick={() => handleRequest(req.id)} className="rounded-full bg-emerald-500 text-white border-0 shadow-sm hover:bg-emerald-600">
                            <Check className="h-3.5 w-3.5 mr-1" /> Accept
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRequest(req.id)} className="rounded-full border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                            <X className="h-3.5 w-3.5 mr-1" /> Decline
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <Eyebrow>Upcoming sessions</Eyebrow>
              <Card className={`divide-y divide-slate-100 ${surface} p-0`}>
                {acceptedSessions.map(session => (
                  <div key={session.id} className="p-4 flex items-center gap-4 hover:bg-[#FDF2F8]/70 transition-colors duration-200">
                    <Avatar name={session.studentName} className="h-10 w-10 text-xs ring-2 ring-[#FDF2F8]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{session.topic}</p>
                      <p className="text-xs text-slate-500">with {session.studentName}</p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end text-xs text-slate-500 gap-1">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#EC4899]" /> {session.date} · {session.time}</span>
                      <span className="flex items-center gap-1 text-[#8B5CF6] font-medium"><Video className="h-3.5 w-3.5" /> {session.mode}</span>
                    </div>
                  </div>
                ))}
              </Card>
            </section>

            <section>
              <Eyebrow action={<ViewAll to="/communities">Explore</ViewAll>}>Community contributions</Eyebrow>
              <div className="space-y-3">
                {communityContributions.map(item => {
                  const Icon = contributionIcons[item.type] || MessageSquare;
                  return (
                    <Card key={item.id} className={`p-4 flex gap-3 ${surface} ${surfaceHover}`}>
                      <div className="h-10 w-10 rounded-2xl bg-[#FDF2F8] text-[#EC4899] flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">{item.type} in <span className="text-slate-600">{item.community}</span></p>
                        <p className="text-sm font-semibold text-slate-900 mt-0.5 leading-snug">{item.title}</p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                          <ThumbsUp className="h-3.5 w-3.5 text-[#8B5CF6]" /> {item.engagement} · {item.time}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>

            <section>
              <Eyebrow action={<Button size="sm" className="rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"><UploadCloud className="h-3.5 w-3.5 mr-1.5" /> Upload new</Button>}>
                Resources shared
              </Eyebrow>
              <Card className={`divide-y divide-slate-100 ${surface} p-0`}>
                {uploadedResources.map(res => (
                  <div key={res.id} className="p-4 sm:p-5 flex items-center gap-4 hover:bg-[#FDF2F8]/70 transition-colors duration-200">
                    <div className="h-10 w-10 rounded-2xl bg-[#F5EFFF] text-[#8B5CF6] flex items-center justify-center shrink-0">
                      <FileUp className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{res.title}</p>
                      <p className="text-xs text-slate-500">{res.uploadedAgo}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge className="bg-[#F5EFFF] text-[#7C3AED] border-[#E9D5FF]">{res.type}</Badge>
                      <span className="text-xs text-slate-500 tabular-nums">{res.downloads} downloads</span>
                    </div>
                  </div>
                ))}
              </Card>
            </section>
          </div>

          <div className="space-y-8">
            <AvailabilityToggle slots={availabilitySlots} />
            <MiniCalendar highlights={calendarHighlights} />

            <Card className={`p-5 ${surface}`}>
              <h3 className="text-sm font-semibold text-slate-900 mb-3.5 flex items-center gap-1.5"><CalendarCheck className="h-4 w-4 text-[#EC4899]" /> Notifications</h3>
              <div className="space-y-3">
                {upcomingMeetings.map(meeting => (
                  <div key={meeting.id} className="flex items-center gap-3 hover:bg-[#FDF2F8]/70 -mx-2 px-2 py-1.5 rounded-xl transition-colors duration-200">
                    <div className="h-10 w-10 rounded-2xl bg-[#FDF2F8] border border-[#FBCFE8] flex flex-col items-center justify-center text-[#BE185D] shrink-0">
                      <span className="text-[10px] font-semibold leading-none">{meeting.date.split(' ')[1]}</span>
                      <span className="text-xs font-bold leading-none mt-0.5">{meeting.date.split(' ')[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, CalendarCheck, Star, FileUp, Check, X, MessageCircle, UploadCloud,
  Trophy, ChevronLeft, ChevronRight, Inbox, ThumbsUp, MessageSquare,
  Video, Clock, Sparkles, ArrowRight
} from 'lucide-react';

import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Eyebrow, ViewAll, surface, surfaceHover } from '../components/DashboardUI';

import {
  alumniProfile, pendingMentorshipRequests, studentRequests, acceptedSessions,
  upcomingMeetings, communityContributions, uploadedResources, quickStatistics,
  recentMessages, availabilitySlots, calendarHighlights, leaderboard
} from '../data/dummyData';

const statIcons = { Users, CalendarCheck, Star, FileUp };
const contributionIcons = { Answered: MessageCircle, Posted: MessageSquare };
const statAccent = {
  Users: 'bg-[#FDF2F8] text-[#EC4899]',
  CalendarCheck: 'bg-[#F5EFFF] text-[#8B5CF6]',
  Star: 'bg-amber-50 text-amber-500',
  FileUp: 'bg-emerald-50 text-emerald-600'
};

function MiniCalendar({ highlights = [] }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthLabel = today.toLocaleString('default', { month: 'long' });
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Card className={`p-5 ${surface}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{monthLabel} {year}</h3>
          <p className="text-xs text-slate-500 mt-0.5">Your mentor calendar</p>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <ChevronLeft className="h-3.5 w-3.5" />
          <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {weekdayLabels.map((d, i) => (
          <span key={i} className="text-[10px] font-semibold text-slate-400">{d}</span>
        ))}
        {cells.map((day, i) => {
          const isToday = day === today.getDate();
          const hasMeeting = day && highlights.includes(day);
          return (
            <div key={i} className="flex items-center justify-center">
              {day && (
                <span
                  className={`relative flex items-center justify-center h-7 w-7 rounded-full text-xs
                    ${isToday ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white font-semibold' : hasMeeting ? 'bg-pink-50 text-slate-700 font-medium' : 'text-slate-400'}`}
                >
                  {day}
                  {hasMeeting && !isToday && <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#EC4899]" />}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function AvailabilityToggle({ slots }) {
  const [available, setAvailable] = useState(true);
  return (
    <Card className={`p-5 ${surface}`}>
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Mentor availability</h3>
          <p className="text-xs text-slate-500 mt-0.5">Keep your schedule visible</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={available}
          onClick={() => setAvailable(v => !v)}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:ring-offset-2 ${available ? 'bg-emerald-500' : 'bg-slate-200'}`}
        >
          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200 ${available ? 'translate-x-[18px]' : 'translate-x-1'}`} />
        </button>
      </div>
      <p className={`text-xs font-medium mb-3 ${available ? 'text-emerald-600' : 'text-slate-500'}`}>
        {available ? 'Currently accepting new requests' : 'Not accepting new requests'}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {slots.map(slot => (
          <Badge key={slot} className="bg-[#FDF2F8] text-[#BE185D] border-[#FBCFE8]">{slot}</Badge>
        ))}
      </div>
    </Card>
  );
}

export default function AlumniDashboard() {
  const [requests, setRequests] = useState(pendingMentorshipRequests);
  const rankedLeaderboard = useMemo(() => [...leaderboard].sort((a, b) => a.rank - b.rank), []);

  const handleRequest = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.12),_transparent_30%),linear-gradient(135deg,_#fdf2f8_0%,_#ffffff_45%,_#f5ebff_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-[28px] border border-pink-100/80 bg-white/95 p-6 sm:p-8 shadow-[0_24px_80px_-30px_rgba(236,72,153,0.28)]"
        >
          <div className="pointer-events-none absolute -top-20 -right-10 h-48 w-48 rounded-full bg-gradient-to-br from-[#F9A8D4]/50 to-[#C4B5FD]/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-[#F3E8FF]/70 blur-3xl" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar name={alumniProfile.name} className="h-16 w-16 text-lg ring-4 ring-[#FDF2F8] shadow-lg" />
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#64748B]">
                  <Sparkles className="h-3.5 w-3.5 text-[#EC4899]" /> Alumni Dashboard
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-1">Welcome back, {alumniProfile.name.split(' ')[0]}</h1>
                <p className="text-slate-600 text-sm mt-2">{alumniProfile.role} at {alumniProfile.company} · {alumniProfile.memberSince}</p>
                <p className="text-sm text-slate-500 mt-3 max-w-2xl">Keep building meaningful connections and help shape the next generation of women in tech.</p>
              </div>
            </div>
            <Button as={Link} to="/mentors" className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#EC4899,#8B5CF6)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition-all hover:translate-y-[-1px] hover:shadow-xl">
              View Public Profile <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}>
          <Eyebrow>Quick statistics</Eyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {quickStatistics.map((stat, index) => {
              const Icon = statIcons[stat.icon];
              return (
                <motion.div key={stat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 * index }} className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_16px_50px_-24px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_-20px_rgba(236,72,153,0.28)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${statAccent[stat.icon] || 'bg-[#FDF2F8] text-[#EC4899]'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#EC4899] to-[#8B5CF6]" />
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <section>
              <Eyebrow action={<Badge className="rounded-full bg-[#FDF2F8] text-[#BE185D] border-[#FBCFE8]">{requests.length} pending</Badge>}>
                Pending mentorship requests
              </Eyebrow>
              {requests.length === 0 ? (
                <Card className={`p-8 text-center ${surface}`}>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF2F8] text-[#EC4899]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-900">You’re all caught up</p>
                  <p className="mt-1 text-sm text-slate-500">No mentorship requests are waiting for your response right now.</p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {requests.map(req => (
                    <motion.div key={req.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                      <Card className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 ${surface} ${surfaceHover}`}>
                        <Avatar name={req.studentName} className="h-11 w-11 text-sm ring-2 ring-[#FDF2F8]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900">{req.studentName} <span className="text-slate-500 font-normal">· {req.year}</span></p>
                          <p className="text-sm text-slate-500">{req.topic} · {req.requestedAgo}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                          <Button size="sm" onClick={() => handleRequest(req.id)} className="rounded-full bg-emerald-500 text-white border-0 shadow-sm hover:bg-emerald-600">
                            <Check className="h-3.5 w-3.5 mr-1" /> Accept
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRequest(req.id)} className="rounded-full border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                            <X className="h-3.5 w-3.5 mr-1" /> Decline
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <Eyebrow>Upcoming sessions</Eyebrow>
              <Card className={`divide-y divide-slate-100 ${surface} p-0`}>
                {acceptedSessions.map(session => (
                  <div key={session.id} className="p-4 flex items-center gap-4 hover:bg-[#FDF2F8]/70 transition-colors duration-200">
                    <Avatar name={session.studentName} className="h-10 w-10 text-xs ring-2 ring-[#FDF2F8]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{session.topic}</p>
                      <p className="text-xs text-slate-500">with {session.studentName}</p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end text-xs text-slate-500 gap-1">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#EC4899]" /> {session.date} · {session.time}</span>
                      <span className="flex items-center gap-1 text-[#8B5CF6] font-medium"><Video className="h-3.5 w-3.5" /> {session.mode}</span>
                    </div>
                  </div>
                ))}
              </Card>
            </section>

            <section>
              <Eyebrow action={<ViewAll to="/communities">Explore</ViewAll>}>Community contributions</Eyebrow>
              <div className="space-y-3">
                {communityContributions.map(item => {
                  const Icon = contributionIcons[item.type] || MessageSquare;
                  return (
                    <Card key={item.id} className={`p-4 flex gap-3 ${surface} ${surfaceHover}`}>
                      <div className="h-10 w-10 rounded-2xl bg-[#FDF2F8] text-[#EC4899] flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">{item.type} in <span className="text-slate-600">{item.community}</span></p>
                        <p className="text-sm font-semibold text-slate-900 mt-0.5 leading-snug">{item.title}</p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                          <ThumbsUp className="h-3.5 w-3.5 text-[#8B5CF6]" /> {item.engagement} · {item.time}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>

            <section>
              <Eyebrow action={<Button size="sm" className="rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"><UploadCloud className="h-3.5 w-3.5 mr-1.5" /> Upload new</Button>}>
                Resources shared
              </Eyebrow>
              <Card className={`divide-y divide-slate-100 ${surface} p-0`}>
                {uploadedResources.map(res => (
                  <div key={res.id} className="p-4 sm:p-5 flex items-center gap-4 hover:bg-[#FDF2F8]/70 transition-colors duration-200">
                    <div className="h-10 w-10 rounded-2xl bg-[#F5EFFF] text-[#8B5CF6] flex items-center justify-center shrink-0">
                      <FileUp className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{res.title}</p>
                      <p className="text-xs text-slate-500">{res.uploadedAgo}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge className="bg-[#F5EFFF] text-[#7C3AED] border-[#E9D5FF]">{res.type}</Badge>
                      <span className="text-xs text-slate-500 tabular-nums">{res.downloads} downloads</span>
                    </div>
                  </div>
                ))}
              </Card>
            </section>
          </div>

          <div className="space-y-8">
            <AvailabilityToggle slots={availabilitySlots} />
            <MiniCalendar highlights={calendarHighlights} />

            <Card className={`p-5 ${surface}`}>
              <h3 className="text-sm font-semibold text-slate-900 mb-3.5 flex items-center gap-1.5"><CalendarCheck className="h-4 w-4 text-[#EC4899]" /> Notifications</h3>
              <div className="space-y-3">
                {upcomingMeetings.map(meeting => (
                  <div key={meeting.id} className="flex items-center gap-3 hover:bg-[#FDF2F8]/70 -mx-2 px-2 py-1.5 rounded-xl transition-colors duration-200">
                    <div className="h-10 w-10 rounded-2xl bg-[#FDF2F8] border border-[#FBCFE8] flex flex-col items-center justify-center text-[#BE185D] shrink-0">
                      <span className="text-[10px] font-semibold leading-none">{meeting.date.split(' ')[1]}</span>
                      <span className="text-xs font-bold leading-none mt-0.5">{meeting.date.split(' ')[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{meeting.title}</p>
                      <p className="text-xs text-slate-500">{meeting.time} · {meeting.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className={`p-5 ${surface}`}>
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5"><Inbox className="h-4 w-4 text-[#8B5CF6]" /> Recent activity</h3>
                <Badge className="rounded-full bg-[#F5EFFF] text-[#7C3AED] border-[#E9D5FF]">{recentMessages.filter(m => m.unread).length} unread</Badge>
              </div>
              <div className="space-y-3.5">
                {recentMessages.map(msg => (
                  <div key={msg.id} className="flex items-start gap-2.5">
                    <Avatar name={msg.studentName} className="h-8 w-8 text-[10px] ring-2 ring-[#FDF2F8]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-700 leading-snug">
                        <span className="font-semibold text-slate-900">{msg.studentName}</span>
                        {msg.unread && <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[#EC4899] inline-block align-middle" />}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{msg.preview}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className={`p-5 ${surface}`}>
              <h3 className="text-sm font-semibold text-slate-900 mb-3.5 flex items-center gap-1.5"><Trophy className="h-4 w-4 text-amber-500" /> Leaderboard</h3>
              <div className="space-y-2.5">
                {rankedLeaderboard.map(entry => (
                  <div key={entry.id} className={`flex items-center gap-3 rounded-2xl px-2.5 py-2 ${entry.isYou ? 'bg-[#FDF2F8] border border-[#FBCFE8]' : 'bg-white'}`}>
                    <span className={`text-xs font-semibold w-4 text-center tabular-nums ${entry.rank <= 3 ? 'text-amber-500' : 'text-slate-400'}`}>{entry.rank}</span>
                    <Avatar name={entry.name} className="h-7 w-7 text-[10px]" />
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm truncate ${entry.isYou ? 'text-slate-900 font-semibold' : 'text-slate-700 font-medium'}`}>{entry.name}{entry.isYou && ' (You)'}</p>
                      <p className="text-xs text-slate-500">{entry.sessions} sessions</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 tabular-nums">{entry.points}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}p className="text-sm font-semibold text-slate-800 truncate">{meeting.title}</p>
                      <p className="text-xs text-slate-500">{meeting.time} · {meeting.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className={`p-5 ${surface}`}>
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5"><Inbox className="h-4 w-4 text-[#8B5CF6]" /> Recent activity</h3>
                <Badge className="rounded-full bg-[#F5EFFF] text-[#7C3AED] border-[#E9D5FF]">{recentMessages.filter(m => m.unread).length} unread</Badge>
              </div>
              <div className="space-y-3.5">
                {recentMessages.map(msg => (
                  <div key={msg.id} className="flex items-start gap-2.5">
                    <Avatar name={msg.studentName} className="h-8 w-8 text-[10px] ring-2 ring-[#FDF2F8]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-700 leading-snug">
                        <span className="font-semibold text-slate-900">{msg.studentName}</span>
                        {msg.unread && <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[#EC4899] inline-block align-middle" />}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{msg.preview}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className={`p-5 ${surface}`}>
              <h3 className="text-sm font-semibold text-slate-900 mb-3.5 flex items-center gap-1.5"><Trophy className="h-4 w-4 text-amber-500" /> Leaderboard</h3>
              <div className="space-y-2.5">
                {rankedLeaderboard.map(entry => (
                  <div key={entry.id} className={`flex items-center gap-3 rounded-2xl px-2.5 py-2 ${entry.isYou ? 'bg-[#FDF2F8] border border-[#FBCFE8]' : 'bg-white'}`}>
                    <span className={`text-xs font-semibold w-4 text-center tabular-nums ${entry.rank <= 3 ? 'text-amber-500' : 'text-slate-400'}`}>{entry.rank}</span>
                    <Avatar name={entry.name} className="h-7 w-7 text-[10px]" />
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm truncate ${entry.isYou ? 'text-slate-900 font-semibold' : 'text-slate-700 font-medium'}`}>{entry.name}{entry.isYou && ' (You)'}</p>
                      <p className="text-xs text-slate-500">{entry.sessions} sessions</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 tabular-nums">{entry.points}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
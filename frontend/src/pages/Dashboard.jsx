import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles, Quote, HeartHandshake, Clock, CheckCircle2, Timer, Calendar, Video,
  Users, BookOpen, PlayCircle, FileText, Briefcase, MapPin, ArrowRight,
  Bell, PartyPopper, Megaphone, AlertTriangle, Activity, TrendingUp, ChevronRight
} from 'lucide-react';

import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import MentorCard from '../components/MentorCard';

import {
  mentors, communities, motivationalQuotes, mentorshipStats, upcomingSessions,
  resources, internships, upcomingEvents, notifications, recentActivity, profileCompletion
} from '../data/dummyData';

const statIcons = { Handshake: HeartHandshake, Clock, CheckCircle2, Timer };
const statTones = {
  primary: 'bg-primary-50 text-primary-600 border-primary-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  secondary: 'bg-secondary-50 text-secondary-600 border-secondary-100'
};

const resourceIcons = { Guide: BookOpen, Article: FileText, Video: PlayCircle };

const notificationMeta = {
  success: { icon: PartyPopper, className: 'bg-emerald-50 text-emerald-600' },
  info: { icon: Megaphone, className: 'bg-secondary-50 text-secondary-600' },
  reminder: { icon: Bell, className: 'bg-primary-50 text-primary-600' },
  warning: { icon: AlertTriangle, className: 'bg-amber-50 text-amber-600' }
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 }
};

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export default function Dashboard() {
  const [quote] = useState(() => {
    const dayIndex = new Date().getDate() % motivationalQuotes.length;
    return motivationalQuotes[dayIndex];
  });
  const recommendedAlumni = useMemo(() => mentors.slice(0, 3), []);
  const trendingCommunities = useMemo(
    () => [...communities].sort((a, b) => b.membersCount - a.membersCount),
    []
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* 1. Welcome Banner */}
      <motion.section
        initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-fuchsia-600 to-secondary-600 text-white p-8"
      >
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute right-24 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar name="Demo User" className="h-16 w-16 text-lg ring-4 ring-white/30" />
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                <Sparkles className="h-4 w-4" /> Welcome back
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Hi Demo User 👋</h1>
              <p className="text-white/80 text-sm mt-1">You have <strong>{upcomingSessions.length} upcoming sessions</strong> and <strong>{notifications.length} new updates</strong> waiting for you.</p>
            </div>
          </div>
          <Button variant="outline" as={Link} to="/find-mentors" className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white shrink-0">
            Find a Mentor <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.section>

      {/* 2. Daily Motivation Quote */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.4 }}>
        <Card className="p-6 border-l-4 border-l-primary-500 bg-gradient-to-r from-primary-50/60 to-white flex items-start gap-4">
          <Quote className="h-6 w-6 text-primary-500 shrink-0 mt-1" />
          <div>
            <p className="text-slate-800 font-medium italic">"{quote.text}"</p>
            <p className="text-sm text-slate-500 mt-1">— {quote.author}</p>
          </div>
        </Card>
      </motion.section>

      {/* 5. Mentorship Status Cards */}
      <section>
        <SectionHeader title="Your Mentorship Snapshot" subtitle="A quick look at where things stand" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {mentorshipStats.map((stat, i) => {
            const Icon = statIcons[stat.icon];
            return (
              <motion.div key={stat.id} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.35, delay: i * 0.05 }}>
                <Card className="p-5 h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`h-10 w-10 rounded-lg border flex items-center justify-center mb-3 ${statTones[stat.tone]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-8">

          {/* 3. Recommended Alumni */}
          <section>
            <SectionHeader
              title="Recommended Alumni for You"
              subtitle="Based on your interests and career goals"
              action={<Link to="/mentors" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">View all <ChevronRight className="h-4 w-4" /></Link>}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {recommendedAlumni.map(mentor => <MentorCard key={mentor.id} mentor={mentor} />)}
            </div>
          </section>

          {/* 4. Upcoming Mentorship Sessions */}
          <section>
            <SectionHeader title="Upcoming Mentorship Sessions" subtitle="Don't miss your scheduled conversations" />
            <Card className="divide-y divide-slate-100">
              {upcomingSessions.map(session => (
                <div key={session.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors duration-200">
                  <Avatar name={session.mentorName} className="h-11 w-11" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{session.topic}</p>
                    <p className="text-xs text-slate-500">with {session.mentorName}</p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end text-xs text-slate-500 gap-1">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {session.date} · {session.time}</span>
                    <span className="flex items-center gap-1 text-primary-600 font-medium"><Video className="h-3.5 w-3.5" /> {session.mode}</span>
                  </div>
                </div>
              ))}
            </Card>
          </section>

          {/* 6. Trending Communities */}
          <section>
            <SectionHeader
              title="Trending Communities"
              subtitle="Where the conversation is happening right now"
              action={<Link to="/communities" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">Explore <ChevronRight className="h-4 w-4" /></Link>}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {trendingCommunities.map(group => (
                <Card key={group.id} className="p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{group.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold"><TrendingUp className="h-3.5 w-3.5" /> Active</span>
                  </div>
                  <h3 className="font-bold text-slate-900">{group.name}</h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{group.description}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-3"><Users className="h-3.5 w-3.5" /> {group.membersCount} members · Active {group.lastActive}</div>
                </Card>
              ))}
            </div>
          </section>

          {/* 7. Latest Resources */}
          <section>
            <SectionHeader title="Latest Resources" subtitle="Curated guides and articles from alumni" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {resources.map(res => {
                const Icon = resourceIcons[res.type] || FileText;
                return (
                  <Card key={res.id} className="p-5 flex gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <div className="h-10 w-10 rounded-lg bg-secondary-50 text-secondary-600 border border-secondary-100 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <Badge variant="slate" className="mb-1.5">{res.tag}</Badge>
                      <p className="font-semibold text-slate-900 leading-snug">{res.title}</p>
                      <p className="text-xs text-slate-500 mt-1">By {res.author} · {res.readTime}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* 8. Internship Opportunities */}
          <section>
            <SectionHeader title="Internship Opportunities" subtitle="Shared and verified by alumni recruiters" />
            <div className="space-y-3">
              {internships.map(job => (
                <Card key={job.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-all duration-300">
                  <div className="h-11 w-11 rounded-lg bg-primary-50 text-primary-600 border border-primary-100 flex items-center justify-center shrink-0">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">{job.title}</p>
                    <p className="text-sm text-slate-500">{job.company} <span className="mx-1">·</span> <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span></p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant="primary">{job.tag}</Badge>
                    <span className="text-xs text-amber-600 font-medium">{job.deadline}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar column */}
        <div className="space-y-8">

          {/* 12. Profile Completion Progress */}
          <section>
            <Card className="p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-slate-900 text-sm">Profile Completion</h3>
                <span className="text-sm font-bold text-primary-600">{profileCompletion.percent}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${profileCompletion.percent}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                />
              </div>
              <p className="text-xs text-slate-500 mb-3">Complete your profile to get better mentor matches.</p>
              <div className="flex flex-wrap gap-1.5">
                {profileCompletion.missing.map(item => (
                  <Badge key={item} variant="slate">{item}</Badge>
                ))}
              </div>
              <Button variant="primary" size="sm" className="w-full mt-4">Complete Profile</Button>
            </Card>
          </section>

          {/* 10. Notifications Widget */}
          <section>
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5"><Bell className="h-4 w-4 text-primary-500" /> Notifications</h3>
                <Badge variant="primary">{notifications.length} new</Badge>
              </div>
              <div className="space-y-3">
                {notifications.map(n => {
                  const meta = notificationMeta[n.type] || notificationMeta.info;
                  const Icon = meta.icon;
                  return (
                    <div key={n.id} className="flex items-start gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${meta.className}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-slate-700 leading-snug">{n.message}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </section>

          {/* 9. Upcoming Events */}
          <section>
            <Card className="p-5">
              <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5"><Calendar className="h-4 w-4 text-secondary-500" /> Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-3 hover:bg-slate-50 -mx-2 px-2 py-1.5 rounded-lg transition-colors duration-200">
                    <div className="h-10 w-10 rounded-lg bg-secondary-50 border border-secondary-100 flex flex-col items-center justify-center text-secondary-600 shrink-0">
                      <span className="text-[10px] font-semibold leading-none">{event.date.split(' ')[1]}</span>
                      <span className="text-xs font-bold leading-none mt-0.5">{event.date.split(' ')[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{event.title}</p>
                      <p className="text-xs text-slate-400">{event.time} · {event.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* 11. Recent Activity Timeline */}
          <section>
            <Card className="p-5">
              <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-1.5"><Activity className="h-4 w-4 text-primary-500" /> Recent Activity</h3>
              <ol className="relative border-l border-slate-200 ml-2 space-y-5">
                {recentActivity.map(item => (
                  <li key={item.id} className="ml-4">
                    <div className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-primary-500 ring-4 ring-primary-100" />
                    <p className="text-sm text-slate-700 leading-snug">{item.action}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                  </li>
                ))}
              </ol>
            </Card>
          </section>

        </div>
      </div>
    </div>
  );
}
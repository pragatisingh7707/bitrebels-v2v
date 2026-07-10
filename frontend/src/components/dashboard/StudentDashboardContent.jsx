import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Calendar, Video, Users, BookOpen, PlayCircle, FileText, TrendingUp, ChevronRight, Bell } from 'lucide-react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Avatar } from '../Avatar';
import MentorCard from '../MentorCard';

const resourceIcons = { Guide: BookOpen, Article: FileText, Video: PlayCircle };

export function StudentDashboardContent({ recommendedAlumni = [], sessions = [], resources = [], internships = [], communities = [], notifications = [], profileCompletion = null }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recommended alumni for you</h2>
              <p className="text-sm text-slate-500">Based on your interests and career goals</p>
            </div>
            <Link to="/mentors" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">View all <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {recommendedAlumni.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Upcoming mentorship sessions</h2>
              <p className="text-sm text-slate-500">Don’t miss your scheduled conversations</p>
            </div>
          </div>
          <Card className="divide-y divide-slate-100">
            {sessions.map((session) => (
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

        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Trending communities</h2>
              <p className="text-sm text-slate-500">Where the conversation is happening right now</p>
            </div>
            <Link to="/communities" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">Explore <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {communities.map((group) => (
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

        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Latest resources</h2>
              <p className="text-sm text-slate-500">Curated guides and articles from alumni</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {resources.map((res) => {
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

        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Internship opportunities</h2>
              <p className="text-sm text-slate-500">Shared and verified by alumni recruiters</p>
            </div>
          </div>
          <div className="space-y-3">
            {internships.map((job) => (
              <Card key={job.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-all duration-300">
                <div className="h-11 w-11 rounded-lg bg-primary-50 text-primary-600 border border-primary-100 flex items-center justify-center shrink-0">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{job.title}</p>
                  <p className="text-sm text-slate-500">{job.company} <span className="mx-1">·</span> <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{job.location}</span></p>
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

      <div className="space-y-8">
        <section>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-900 text-sm">Profile Completion</h3>
              <span className="text-sm font-bold text-primary-600">{profileCompletion?.percent || 0}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
              <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" style={{ width: `${profileCompletion?.percent || 0}%` }} />
            </div>
            <p className="text-xs text-slate-500 mb-3">Complete your profile to get better mentor matches.</p>
            <div className="flex flex-wrap gap-1.5">
              {profileCompletion?.missing?.map((item) => <Badge key={item} variant="slate">{item}</Badge>)}
            </div>
            <Link to="/profile/create" className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700">Complete Profile</Link>
          </Card>
        </section>

        <section>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5"><Bell className="h-4 w-4 text-primary-500" /> Notifications</h3>
              <Badge variant="primary">{notifications.length} new</Badge>
            </div>
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${n.type === 'success' ? 'bg-emerald-50 text-emerald-600' : n.type === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-primary-50 text-primary-600'}`}>
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700 leading-snug">{n.message}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

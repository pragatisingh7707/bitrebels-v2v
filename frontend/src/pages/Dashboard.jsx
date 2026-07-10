import React, { useMemo, useState } from 'react';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { StatisticsCards } from '../components/dashboard/StatisticsCards';
import { StudentDashboardContent } from '../components/dashboard/StudentDashboardContent';
import { AlumniDashboardContent } from '../components/dashboard/AlumniDashboardContent';
import {
  mentors,
  communities,
  mentorshipStats,
  upcomingSessions,
  resources,
  internships,
  notifications,
  profileCompletion,
  alumniProfile,
  pendingMentorshipRequests,
  studentRequests,
  acceptedSessions,
  upcomingMeetings,
  communityContributions,
  uploadedResources,
  quickStatistics,
  recentMessages,
  availabilitySlots,
  calendarHighlights,
  leaderboard
} from '../data/dummyData';

export default function Dashboard() {
  const [quote] = useState(() => motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  const recommendedAlumni = useMemo(() => mentors.slice(0, 3), []);
  const trendingCommunities = useMemo(() => [...communities].sort((a, b) => b.membersCount - a.membersCount), []);

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
          <Button variant="outline" as={Link} to="/mentors" className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white shrink-0">
            Find a Mentor <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          {['student', 'alumni'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRole(option)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${role === option ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {option === 'student' ? 'Student' : 'Alumni'}
            </button>
          ))}
        </div>
      </div>

      <WelcomeBanner
        role={role}
        name={role === 'alumni' ? alumniProfile.name : 'Demo User'}
        subtitle={role === 'alumni' ? `${alumniProfile.role} at ${alumniProfile.company} · ${alumniProfile.memberSince}` : `You have ${upcomingSessions.length} upcoming sessions and ${notifications.length} new updates waiting for you.`}
        ctaLabel={role === 'alumni' ? 'View public profile' : 'Find a mentor'}
        ctaTo={role === 'alumni' ? '/mentors' : '/mentors'}
      />

      <StatisticsCards items={role === 'alumni' ? quickStatistics.map((stat) => ({ ...stat, tone: stat.id === 'qs1' ? 'primary' : stat.id === 'qs2' ? 'secondary' : stat.id === 'qs3' ? 'amber' : 'emerald', icon: stat.icon === 'Users' ? 'Handshake' : stat.icon === 'CalendarCheck' ? 'Clock' : stat.icon === 'Star' ? 'Timer' : 'CheckCircle2' })) : mentorshipStats} />

      {role === 'student' ? (
        <StudentDashboardContent
          recommendedAlumni={recommendedAlumni}
          sessions={upcomingSessions}
          resources={resources}
          internships={internships}
          communities={trendingCommunities}
          notifications={notifications}
          profileCompletion={profileCompletion}
        />
      ) : (
        <AlumniDashboardContent
          quickStats={quickStatistics.map((stat) => ({ ...stat, tone: stat.id === 'qs1' ? 'bg-[#FDF2F8] text-[#EC4899]' : stat.id === 'qs2' ? 'bg-[#F5EFFF] text-[#8B5CF6]' : stat.id === 'qs3' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-600' }))}
          requests={pendingMentorshipRequests}
          acceptedSessions={acceptedSessions}
          communityContributions={communityContributions}
          uploadedResources={uploadedResources}
          upcomingMeetings={upcomingMeetings}
          recentMessages={recentMessages}
          leaderboard={leaderboard}
          availabilitySlots={availabilitySlots}
          calendarHighlights={calendarHighlights}
        />
      )}
    </div>
  );
}
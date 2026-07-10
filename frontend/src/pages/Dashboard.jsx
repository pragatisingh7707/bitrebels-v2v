import React, { useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';
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
  const [role, setRole] = useState('student');

  const recommendedAlumni = useMemo(() => mentors.slice(0, 3), []);
  const trendingCommunities = useMemo(() => [...communities].sort((a, b) => b.membersCount - a.membersCount), []);

  const stats = useMemo(() => {
    if (role === 'alumni') {
      return quickStatistics.map((stat) => ({
        ...stat,
        tone: stat.id === 'qs1' ? 'primary' : stat.id === 'qs2' ? 'secondary' : stat.id === 'qs3' ? 'amber' : 'emerald',
        icon: stat.icon === 'Users' ? 'Handshake' : stat.icon === 'CalendarCheck' ? 'Clock' : stat.icon === 'Star' ? 'Timer' : 'CheckCircle2'
      }));
    }

    return mentorshipStats;
  }, [role]);

  const bannerName = role === 'alumni' ? alumniProfile.name : 'Demo User';
  const bannerSubtitle = role === 'alumni'
    ? `${alumniProfile.role} at ${alumniProfile.company} · ${alumniProfile.memberSince}`
    : `You have ${upcomingSessions.length} upcoming sessions and ${notifications.length} new updates waiting for you.`;
  const bannerCtaLabel = role === 'alumni' ? 'View public profile' : 'Find a mentor';
  const bannerCtaTo = role === 'alumni' ? '/mentor-dashboard' : '/find-mentors';

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Choose your experience</p>
            <p className="text-xs text-slate-500">Switch between the student and alumni mentorship journey.</p>
          </div>
        </div>
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
          {['student', 'alumni'].map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={role === option}
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
        name={bannerName}
        subtitle={bannerSubtitle}
        ctaLabel={bannerCtaLabel}
        ctaTo={bannerCtaTo}
      />

      <StatisticsCards items={stats} />

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
          quickStats={quickStatistics.map((stat) => ({
            ...stat,
            tone: stat.id === 'qs1' ? 'bg-[#FDF2F8] text-[#EC4899]' : stat.id === 'qs2' ? 'bg-[#F5EFFF] text-[#8B5CF6]' : stat.id === 'qs3' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-600'
          }))}
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

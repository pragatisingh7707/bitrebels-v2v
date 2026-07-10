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
  const [role, setRole] = useState('student');
  const recommendedAlumni = useMemo(() => mentors.slice(0, 3), []);
  const trendingCommunities = useMemo(() => [...communities].sort((a, b) => b.membersCount - a.membersCount), []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your dashboard</h1>
          <p className="text-sm text-slate-500">Switch between student and alumni views to explore the full experience.</p>
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
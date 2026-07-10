import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
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
  leaderboard,
} from '../data/dummyData';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role || 'student';
  const userName = user?.name || 'User';

  const recommendedAlumni = useMemo(() => mentors.slice(0, 3), []);
  const trendingCommunities = useMemo(
    () => [...communities].sort((a, b) => b.membersCount - a.membersCount),
    []
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-900 dark:text-slate-100">

      {/* Welcome Banner */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.4 }}
      >
        <WelcomeBanner
          role={role}
          name={userName}
          subtitle={
            role === 'alumni'
              ? `${user?.job_title || '—'} at ${user?.company || '—'} · ${user?.field || 'Professional'}`
              : `You have ${upcomingSessions.length} upcoming sessions and ${notifications.length} new updates waiting for you.`
          }
          ctaLabel={role === 'alumni' ? 'View public profile' : 'Find a mentor'}
          ctaTo="/find-mentors"
        />
      </motion.section>

      <StatisticsCards
        items={
          role === 'alumni'
            ? quickStatistics.map((stat) => ({
                ...stat,
                tone:
                  stat.id === 'qs1' ? 'primary' :
                  stat.id === 'qs2' ? 'secondary' :
                  stat.id === 'qs3' ? 'amber' : 'emerald',
                icon:
                  stat.icon === 'Users' ? 'Handshake' :
                  stat.icon === 'CalendarCheck' ? 'Clock' :
                  stat.icon === 'Star' ? 'Timer' : 'CheckCircle2',
              }))
            : mentorshipStats
        }
      />

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
            tone:
              stat.id === 'qs1' ? 'bg-[#FDF2F8] text-[#EC4899]' :
              stat.id === 'qs2' ? 'bg-[#F5EFFF] text-[#8B5CF6]' :
              stat.id === 'qs3' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-600',
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
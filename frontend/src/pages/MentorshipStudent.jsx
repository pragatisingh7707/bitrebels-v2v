import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, GraduationCap, MessageCircleMore, CalendarDays, Clock3, Link2, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import FilterSidebar from '../components/FilterSidebar';
import RequestModal from '../components/RequestModal';
import { mentorshipMentors, initialStudentRequests } from '../data/mentorshipData';

const studentSections = [
  { key: 'upcoming', title: 'Upcoming Sessions', status: 'Accepted' },
  { key: 'pending', title: 'Pending Requests', status: 'Pending' },
  { key: 'accepted', title: 'Accepted Requests', status: 'Accepted' },
  { key: 'completed', title: 'Completed Sessions', status: 'Completed' },
  { key: 'cancelled', title: 'Cancelled Requests', status: 'Cancelled' },
];

export default function MentorshipStudent() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requests, setRequests] = useState(initialStudentRequests);

  const filteredMentors = useMemo(() => {
    return mentorshipMentors.filter((mentor) => {
      const matchesQuery = `${mentor.name} ${mentor.role} ${mentor.company} ${mentor.domain} ${mentor.skills.join(' ')}`.toLowerCase().includes(search.toLowerCase());
      const matchesIndustry = !filters.industry || mentor.industry === filters.industry;
      const matchesCompany = !filters.company || mentor.company === filters.company;
      const matchesDomain = !filters.domain || mentor.domain === filters.domain;
      const matchesExperience = !filters.experience || mentor.experience >= Number(filters.experience);
      const matchesGraduationYear = !filters.graduationYear || mentor.graduationYear <= Number(filters.graduationYear);
      const matchesAvailability = !filters.availability || mentor.availability === filters.availability;
      return matchesQuery && matchesIndustry && matchesCompany && matchesDomain && matchesExperience && matchesGraduationYear && matchesAvailability;
    });
  }, [filters, search]);

  const groupedRequests = useMemo(() => {
    return studentSections.reduce((acc, section) => {
      acc[section.key] = requests.filter((request) => request.status === section.status || (section.key === 'upcoming' && request.status === 'Accepted'));
      return acc;
    }, {});
  }, [requests]);

  const handleOpenRequest = (mentor) => {
    setSelectedMentor(mentor);
    setSubmitted(false);
    setModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (!selectedMentor) return;
    window.setTimeout(() => {
      setRequests((prev) => [
        {
          id: `req-${Date.now()}`,
          mentorId: selectedMentor.id,
          mentorName: selectedMentor.name,
          status: 'Pending',
          createdAt: new Date().toISOString().slice(0, 10),
          ...values,
        },
        ...prev,
      ]);
      setSubmitted(true);
      window.setTimeout(() => {
        setModalOpen(false);
        navigate('/mentorship-dashboard');
      }, 1400);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-gradient-to-r from-primary-600 via-fuchsia-600 to-secondary-600 p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur"><Sparkles className="h-4 w-4" /> Mentorship module</div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Find mentors that fit your next move</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">Search by experience, domain, and skills, then request a conversation that feels personal and intentional.</p>
          </div>
          <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">Explore opportunities</Button>
        </div>
      </motion.section>

      <div className="mt-8 grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)]">
        <FilterSidebar filters={filters} onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))} onClear={() => setFilters({})} mentorCount={filteredMentors.length} />

        <div className="space-y-6">
          <Card className="p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, company, skill or domain" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100" />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <SlidersHorizontal className="h-4 w-4" /> {filteredMentors.length} results
              </div>
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2">
            {filteredMentors.map((mentor) => (
              <motion.article key={mentor.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={mentor.profilePhoto} alt={mentor.name} className="h-14 w-14 rounded-2xl object-cover" />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{mentor.name}</h3>
                      <p className="text-sm text-slate-500">{mentor.role} · {mentor.company}</p>
                    </div>
                  </div>
                  {mentor.verified ? <Badge variant="primary">LinkedIn verified</Badge> : <Badge variant="secondary">New mentor</Badge>}
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                  <span className="rounded-full bg-slate-100 px-3 py-1">{mentor.experience} yrs experience</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">{mentor.domain}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">Batch {mentor.graduationYear}</span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">{mentor.bio}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.skills.map((skill) => (
                    <Badge key={skill} variant="slate">{skill}</Badge>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-500"><CalendarDays className="h-4 w-4 text-primary-500" /> {mentor.availability}</div>
                  <div className="flex items-center gap-2 text-slate-500"><GraduationCap className="h-4 w-4 text-primary-500" /> {mentor.location}</div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2"><MessageCircleMore className="h-4 w-4" /> View profile</Button>
                  <Button variant="primary" size="sm" className="flex items-center gap-2" onClick={() => handleOpenRequest(mentor)}><Link2 className="h-4 w-4" /> Request mentorship</Button>
                </div>
              </motion.article>
            ))}
          </div>

          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Your mentorship activity</h2>
                <p className="text-sm text-slate-500">Track every request and session in one place.</p>
              </div>
              <Badge variant="primary">Live updates</Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {studentSections.map((section) => (
                <div key={section.key} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-primary-500" /> {section.title}
                  </div>
                  {groupedRequests[section.key]?.length ? (
                    <div className="space-y-2">
                      {groupedRequests[section.key].slice(0, 2).map((request) => {
                        let badgeVariant = 'emerald';
                        if (request.status === 'Pending') {
                          badgeVariant = 'secondary';
                        } else if (request.status === 'Accepted') {
                          badgeVariant = 'primary';
                        }

                        return (
                          <div key={request.id} className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium text-slate-900">{request.mentorName}</span>
                              <Badge variant={badgeVariant}>{request.status}</Badge>
                            </div>
                            <div className="mt-2 flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-primary-500" /> {request.preferredDate}</div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">Nothing here yet.</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <RequestModal mentor={selectedMentor} open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} submitted={submitted} />
    </div>
  );
}

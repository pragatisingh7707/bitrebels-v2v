import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { mentors } from '../data/dummyData';
import MentorCard from '../components/MentorCard';
import { Input } from '../components/Input';

export default function Mentors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  const filteredMentors = useMemo(() => {
    return mentors.filter(mentor => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) || mentor.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDomain = selectedDomain === 'All' || mentor.domain === selectedDomain;
      return matchesSearch && matchesDomain;
    });
  }, [searchTerm, selectedDomain]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find an Alumni Mentor</h1>
          <p className="text-slate-500">Connect with real industry experts from global organizations.</p>
        </div>
        <div className="w-full md:w-80 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input type="text" placeholder="Search parameters..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
      </div>
      <div className="flex gap-2">
        {['All', 'Engineering', 'Product', 'Finance'].map(domain => (
          <button key={domain} onClick={() => setSelectedDomain(domain)} className={`px-4 py-1.5 rounded-full text-sm font-medium border ${selectedDomain === domain ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-600'}`}>
            {domain}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredMentors.map(mentor => <MentorCard key={mentor.id} mentor={mentor} />)}
      </div>
    </div>
  );
}
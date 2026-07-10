import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Sparkles } from 'lucide-react';
import { Button } from '../Button';
import { Avatar } from '../Avatar';

export function WelcomeBanner({ role = 'student', name = 'Demo User', subtitle, ctaLabel, ctaTo }) {
  const isAlumni = role === 'alumni';

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-[28px] border p-6 sm:p-8 shadow-[0_24px_80px_-30px_rgba(236,72,153,0.28)] ${isAlumni ? 'border-pink-100/80 bg-white/95' : 'border-slate-100 bg-gradient-to-r from-primary-600 via-fuchsia-600 to-secondary-600 text-white'}`}
    >
      <div className={`pointer-events-none absolute -top-20 -right-10 h-48 w-48 rounded-full blur-3xl ${isAlumni ? 'bg-gradient-to-br from-[#F9A8D4]/50 to-[#C4B5FD]/50' : 'bg-white/10'}`} />
      <div className={`pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full blur-3xl ${isAlumni ? 'bg-[#F3E8FF]/70' : 'bg-white/10'}`} />
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar name={name} className={`h-16 w-16 text-lg ring-4 ${isAlumni ? 'ring-[#FDF2F8] shadow-lg' : 'ring-white/30'}`} />
          <div>
            <div className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${isAlumni ? 'text-[#64748B]' : 'text-white/80'}`}>
              {isAlumni ? <Briefcase className="h-3.5 w-3.5 text-[#EC4899]" /> : <Sparkles className="h-3.5 w-3.5" />}
              {isAlumni ? 'Alumni Dashboard' : 'Student Dashboard'}
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight mt-1 ${isAlumni ? 'text-slate-900' : 'text-white'}`}>
              Welcome back, {name.split(' ')[0]}
            </h1>
            <p className={`text-sm mt-2 ${isAlumni ? 'text-slate-600' : 'text-white/80'}`}>{subtitle}</p>
          </div>
        </div>
        <Button as={Link} to={ctaTo || '/mentors'} variant={isAlumni ? 'primary' : 'outline'} className={isAlumni ? 'rounded-full bg-[linear-gradient(90deg,#EC4899,#8B5CF6)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition-all hover:translate-y-[-1px] hover:shadow-xl' : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white shrink-0'}>
          {ctaLabel || (isAlumni ? 'View profile' : 'Find a mentor')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.section>
  );
}

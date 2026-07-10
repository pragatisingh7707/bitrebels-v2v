import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mentors, communities } from '../data/dummyData';
import MentorCard from '../components/MentorCard';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

export default function Home() {
  return (
    <div className="space-y-16 pb-12">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white py-20 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100,200 Q200,400 500,250 T1200,300" fill="none" stroke="url(#tg)" strokeWidth="3" className="animate-thread" />
            <defs><linearGradient id="tg"><stop offset="0%" stopColor="#ec4899" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
              <Badge variant="primary" className="px-3 py-1">Empowering Women in Tech</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                Bridge the Gap Between <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Ambition and Success</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">HerConnect links ambitious students with seasoned alumni mentors. Navigate your career paths with ease.</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" as={Link} to="/find-mentors" className="group">
                  Find a Mentor <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 border-l-4 border-l-primary-500"><Users className="h-8 w-8 text-primary-600 mb-2" /><div className="text-2xl font-bold">500+</div><div className="text-xs text-slate-500 dark:text-slate-400">Active Mentors</div></Card>
              <Card className="p-6 border-l-4 border-l-secondary-500"><BookOpen className="h-8 w-8 text-secondary-600 mb-2" /><div className="text-2xl font-bold">1.2k+</div><div className="text-xs text-slate-500">Students Guided</div></Card>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Alumni Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentors.slice(0, 3).map(mentor => <MentorCard key={mentor.id} mentor={mentor} />)}
        </div>
      </section>
    </div>
  );
}
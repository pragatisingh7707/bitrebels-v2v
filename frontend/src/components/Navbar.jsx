import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sparkles, Users, MessageSquare, LayoutDashboard, GraduationCap } from 'lucide-react';
import { Avatar } from './Avatar';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-1.5 text-sm font-medium transition-colors py-1 border-b-2 ${
      isActive ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-200'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
          <div className="bg-primary-600 text-white p-1.5 rounded-lg"><Sparkles className="h-5 w-5" /></div>
          <span>Her<span className="text-primary-600">Connect</span></span>
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/dashboard" className={navLinkClass}><LayoutDashboard className="h-4 w-4" /> Dashboard</NavLink>
          <NavLink to="/find-mentors" className={navLinkClass}><GraduationCap className="h-4 w-4" /> Mentorship</NavLink>
          <NavLink to="/communities" className={navLinkClass}><MessageSquare className="h-4 w-4" /> Communities</NavLink>
        </nav>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <NotificationBell />
          <Link to="/signup" className="inline-flex rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90">
            Sign Up
          </Link>
          <div className="hidden sm:block text-right">
            <div className="text-xs font-semibold text-slate-900">Demo User</div>
            <div className="text-[10px] text-slate-400 font-medium uppercase">Student Profile</div>
          </div>
          <Avatar name="Demo User" className="h-8 w-8 text-xs" />
        </div>
      </div>
    </header>
  );
}
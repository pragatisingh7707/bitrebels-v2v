import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Moon, Sun, Sparkles, Users, MessageSquare, LayoutDashboard, GraduationCap, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Avatar } from './Avatar';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const displayName = user?.name || 'User';

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 text-sm font-medium transition-colors py-1 border-b-2 ${
      isActive ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-200 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:border-slate-600'
    }`;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white">
            <div className="bg-primary-600 text-white p-1.5 rounded-lg"><Sparkles className="h-5 w-5" /></div>
            <span>Her<span className="text-primary-600">Connect</span></span>
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800 sm:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="hidden sm:flex sm:items-center sm:justify-between sm:flex-1 gap-6">
            <nav className="flex items-center gap-6">
              <NavLink to="/dashboard" className={navLinkClass}><LayoutDashboard className="h-4 w-4" /> Dashboard</NavLink>
              <NavLink to="/find-mentors" className={navLinkClass}><GraduationCap className="h-4 w-4" /> Mentorship</NavLink>
              <NavLink to="/communities" className={navLinkClass}><MessageSquare className="h-4 w-4" /> Communities</NavLink>
            </nav>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
              <button
                onClick={toggleTheme}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <NotificationBell />

              {isAuthenticated ? (
                <>
                  <div className="hidden sm:block text-right">
                    <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">{displayName}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-400 font-medium uppercase">{user?.role === 'alumni' ? 'Alumni Profile' : 'Student Profile'}</div>
                  </div>
                  <Avatar name={displayName} className="h-8 w-8 text-xs" />
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-slate-600 hover:text-primary-600 dark:text-slate-200 dark:hover:text-primary-400"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-primary-600 dark:text-slate-200 dark:hover:text-primary-400">
                    Log In
                  </Link>
                  <Link to="/signup" className="inline-flex rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {mobileOpen ? (
          <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:hidden">
            <nav className="space-y-2">
              <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMobileOpen(false)}><LayoutDashboard className="h-4 w-4" /> Dashboard</NavLink>
              <NavLink to="/find-mentors" className={navLinkClass} onClick={() => setMobileOpen(false)}><GraduationCap className="h-4 w-4" /> Mentorship</NavLink>
              <NavLink to="/communities" className={navLinkClass} onClick={() => setMobileOpen(false)}><MessageSquare className="h-4 w-4" /> Communities</NavLink>
            </nav>
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <button
                onClick={toggleTheme}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              >
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{displayName}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-400 uppercase">{user?.role === 'alumni' ? 'Alumni Profile' : 'Student Profile'}</div>
                    </div>
                    <Avatar name={displayName} className="h-8 w-8 text-xs" />
                  </div>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-primary-600 dark:text-slate-200 dark:hover:text-primary-400"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
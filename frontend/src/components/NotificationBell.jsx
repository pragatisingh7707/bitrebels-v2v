import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { notifications as initialNotifications } from '../data/dummyData';
import { Card } from './Card';
import { Avatar } from './Avatar';

const categoryMeta = {
  mentorship: { label: 'Mentorship', tone: 'bg-primary-50 text-primary-600' },
  community: { label: 'Community Replies', tone: 'bg-secondary-50 text-secondary-600' },
  accepted: { label: 'Accepted Requests', tone: 'bg-emerald-50 text-emerald-600' },
  rejected: { label: 'Rejected Requests', tone: 'bg-amber-50 text-amber-600' },
  resources: { label: 'Resources Uploaded', tone: 'bg-fuchsia-50 text-fuchsia-600' },
  internships: { label: 'Internships', tone: 'bg-slate-100 text-slate-700' }
};

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(initialNotifications);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = useMemo(() => items.filter((item) => !item.read).length, [items]);
  const recentItems = useMemo(() => items.slice(0, 5), [items]);

  const markOneAsRead = (notificationId) => {
    setItems((current) => current.map((item) => (item.id === notificationId ? { ...item, read: true } : item)));
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        aria-label="Open notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <Card className="absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
          <div className="border-b border-slate-100 bg-gradient-to-r from-primary-50 to-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Notifications</p>
                <p className="text-xs text-slate-500">{unreadCount} unread</p>
              </div>
              <Link to="/notifications" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-primary-600">
                View all
              </Link>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {recentItems.length === 0 ? (
              <div className="p-4 text-sm text-slate-500">You are all caught up.</div>
            ) : (
              recentItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => markOneAsRead(item.id)}
                  className={`flex w-full items-start gap-3 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50 ${!item.read ? 'bg-primary-50/60' : 'bg-white'}`}
                >
                  <div className={`mt-0.5 rounded-full p-2 ${categoryMeta[item.category]?.tone || 'bg-slate-100 text-slate-600'}`}>
                    <Bell className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-800">{item.message}</p>
                      {!item.read && <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <span>{categoryMeta[item.category]?.label || item.category}</span>
                      <span>•</span>
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                  <ChevronRight className="mt-1 h-4 w-4 text-slate-400" />
                </button>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

import React, { useMemo, useState } from 'react';
import { Bell, BookOpen, Briefcase, CheckCheck, MessageSquareQuote, Sparkles, Users, XCircle } from 'lucide-react';
import { notifications as initialNotifications } from '../data/dummyData';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';

const categoryConfig = {
  mentorship: { title: 'Mentorship', icon: Sparkles },
  community: { title: 'Community Replies', icon: MessageSquareQuote },
  accepted: { title: 'Accepted Requests', icon: CheckCheck },
  rejected: { title: 'Rejected Requests', icon: XCircle },
  resources: { title: 'Resources Uploaded', icon: BookOpen },
  internships: { title: 'Internships', icon: Briefcase }
};

export default function NotificationCenter() {
  const [items, setItems] = useState(initialNotifications);

  const groupedItems = useMemo(() => {
    const groups = Object.keys(categoryConfig).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});

    items.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });

    return groups;
  }, [items]);

  const markAsRead = (id) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const markAllAsRead = () => {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[28px] bg-gradient-to-r from-primary-600 via-fuchsia-600 to-secondary-600 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm text-white/80">
              <Bell className="h-4 w-4" /> Activity center
            </div>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Notifications</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
              Keep up with mentor replies, community conversations, and new opportunities from alumni.
            </p>
          </div>
          <Button onClick={markAllAsRead} variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white">
            Mark all as read
          </Button>
        </div>
      </section>

      <div className="mt-8 space-y-6">
        {Object.entries(categoryConfig).map(([key, config]) => {
          const categoryItems = groupedItems[key] || [];
          const Icon = config.icon;

          return (
            <section key={key}>
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-full bg-primary-50 p-2 text-primary-600">
                  <Icon className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">{config.title}</h2>
                <Badge variant="slate">{categoryItems.length}</Badge>
              </div>

              {categoryItems.length === 0 ? (
                <Card className="p-4 text-sm text-slate-500">No new updates here yet</Card>
              ) : (
                <Card className="divide-y divide-slate-100">
                  {categoryItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => markAsRead(item.id)}
                      className={`flex w-full items-start gap-3 px-4 py-4 text-left transition hover:bg-slate-50 ${!item.read ? 'bg-primary-50/50' : 'bg-white'}`}
                    >
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                        {item.actorName ? <Avatar name={item.actorName} className="h-10 w-10 text-xs" /> : <Users className="h-4 w-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-slate-800">{item.message}</p>
                          {!item.read && <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />}
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{item.timestamp}</p>
                      </div>
                    </button>
                  ))}
                </Card>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

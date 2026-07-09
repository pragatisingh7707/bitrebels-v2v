import React, { useState } from 'react';
import { Users, ShieldCheck } from 'lucide-react';
import { communities } from '../data/dummyData';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

export default function Communities() {
  const [joined, setJoined] = useState({});
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-gradient-to-r from-secondary-900 to-indigo-900 text-white p-8 rounded-2xl">
        <h1 className="text-3xl font-bold">Interest Channels</h1>
        <p className="text-indigo-100 mt-2">Join global spaces curated by experienced alumni network members.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {communities.map(group => (
          <Card key={group.id} className="p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between"><Badge>{group.category}</Badge><span className="text-xs text-slate-500">{group.membersCount} members</span></div>
              <h3 className="text-xl font-bold flex items-center gap-2">{group.name} <ShieldCheck className="h-4 w-4 text-emerald-500" /></h3>
              <p className="text-slate-600 text-sm">{group.description}</p>
            </div>
            <div className="border-t mt-6 pt-4 flex justify-between items-center">
              <span className="text-xs text-slate-400">Active: {group.lastActive}</span>
              <Button variant={joined[group.id] ? 'outline' : 'primary'} size="sm" onClick={() => setJoined(p => ({...p, [group.id]: !p[group.id]}))}>
                {joined[group.id] ? 'Leave Channel' : 'Join Channel'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
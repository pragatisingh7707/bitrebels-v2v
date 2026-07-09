import React from 'react';
import { Card } from './Card';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';
import { Briefcase, Calendar } from 'lucide-react';

export default function MentorCard({ mentor }) {
  return (
    <Card className="p-6 flex flex-col justify-between h-full hover:shadow-md transition-all">
      <div className="space-y-4">
        <div className="flex gap-4 items-start">
          <Avatar name={mentor.name} className="h-12 w-12" />
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">{mentor.name}</h3>
            <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
              <Briefcase className="h-3.5 w-3.5 text-slate-400" />
              <span>{mentor.role} at <span className="text-slate-900 font-semibold">{mentor.company}</span></span>
            </div>
          </div>
        </div>
        <p className="text-slate-600 text-sm line-clamp-3">{mentor.bio}</p>
        <div className="flex flex-wrap gap-1.5">
          {mentor.skills.map((skill) => (
            <Badge key={skill} variant="slate">{skill}</Badge>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-100 mt-6 pt-4 space-y-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar className="h-3.5 w-3.5 text-primary-500" />
          <span>Available: <strong className="text-slate-700">{mentor.availability}</strong></span>
        </div>
        <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => alert(`Connection requested with ${mentor.name}`)}>
          Request Mentorship Connection
        </Button>
      </div>
    </Card>
  );
}
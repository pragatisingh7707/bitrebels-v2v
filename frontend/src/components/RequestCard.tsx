import React from 'react';
import { CalendarDays, Clock3, MessageSquareText, Video, Link2, GraduationCap } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import StatusBadge from './StatusBadge';
import type { AlumniRequest, StudentRequestRecord } from '../types/mentorship';

interface RequestCardProps {
  request: StudentRequestRecord | AlumniRequest;
  mode: 'student' | 'alumni';
  onAccept?: () => void;
  onReject?: () => void;
  onSuggest?: () => void;
}

export default function RequestCard({ request, mode, onAccept, onReject, onSuggest }: RequestCardProps) {
  const isAlumni = mode === 'alumni';
  const studentRequest = request as StudentRequestRecord;
  const alumniRequest = request as AlumniRequest;

  return (
    <Card className="p-5 bg-white/80 backdrop-blur">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* show student avatar when available (mapped by MentorDashboard) */}
              {((alumniRequest as any).studentProfile?.photoPreview || (alumniRequest as any).studentProfile?.photo_url) ? (
                <img src={(alumniRequest as any).studentProfile.photoPreview || (alumniRequest as any).studentProfile.photo_url} alt={(alumniRequest as any).studentProfile?.name || alumniRequest.studentName} className="h-12 w-12 rounded-xl object-cover" />
              ) : (
                <div className="h-12 w-12 rounded-xl bg-slate-100" />
              )}

              <div>
                <h3 className="font-semibold text-slate-900">
                  {isAlumni ? alumniRequest.studentName : studentRequest.mentorName}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {isAlumni ? `${alumniRequest.college} · ${alumniRequest.branch}` : studentRequest.topic}
                </p>
              </div>
            </div>
          <StatusBadge status={request.status} />
        </div>

        <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
          {isAlumni ? (
            <>
              <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary-500" /> <span>Batch {alumniRequest.graduationYear}</span></div>
              <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary-500" /> <span>{alumniRequest.requestedDate}</span></div>
              <div className="flex items-center gap-2"><MessageSquareText className="h-4 w-4 text-primary-500" /> <span>{alumniRequest.topic}</span></div>
              <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-primary-500" /> <span>Requested for guidance</span></div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary-500" /> <span>{studentRequest.preferredDate}</span></div>
              <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-primary-500" /> <span>{studentRequest.preferredTime}</span></div>
              <div className="flex items-center gap-2"><Video className="h-4 w-4 text-primary-500" /> <span>{studentRequest.mode}</span></div>
              <div className="flex items-center gap-2"><Link2 className="h-4 w-4 text-primary-500" /> <span>{studentRequest.meetingLink ?? 'Awaiting confirmation'}</span></div>
            </>
          )}
        </div>

        <p className="text-sm text-slate-600 leading-6">
          {isAlumni ? alumniRequest.message : studentRequest.message}
        </p>

        {isAlumni && request.status === 'Pending' && (
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="sm" onClick={onAccept}>Accept</Button>
            <Button variant="outline" size="sm" onClick={onReject}>Reject</Button>
            <Button variant="secondary" size="sm" onClick={onSuggest}>Suggest Another Time</Button>
          </div>
        )}
      </div>
    </Card>
  );
}

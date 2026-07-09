import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Briefcase, Calendar, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MentorCard({ mentor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const slots = ["10:00 AM", "2:30 PM", "5:00 PM"];

  return (
    <>
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
          <Button 
            variant={booked ? "outline" : "primary"} 
            size="sm" 
            className="w-full text-xs" 
            onClick={() => booked ? null : setIsOpen(true)}
          >
            {booked ? "✓ Connection Requested" : "Request Mentorship Connection"}
          </Button>
        </div>
      </Card>

      {/* Booking Dialog Modal Popup Layer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white max-w-md w-full p-6 rounded-xl shadow-xl relative border border-slate-100">
              <button onClick={() => setIsOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Book a Session</h3>
              <p className="text-sm text-slate-500 mb-4">Select an upcoming open slot with <strong>{mentor.name}</strong>.</p>
              <div className="space-y-2 mb-6">
                {slots.map(slot => (
                  <button key={slot} onClick={() => { setBooked(true); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-colors">
                    {mentor.availability.split(" ")[0]} — {slot}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
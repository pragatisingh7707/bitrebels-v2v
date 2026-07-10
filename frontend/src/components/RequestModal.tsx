import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import type { Mentor, RequestFormValues } from '../types/mentorship';

interface RequestModalProps {
  readonly mentor: Mentor | null;
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (values: RequestFormValues) => void;
  readonly submitted: boolean;
  readonly submitting?: boolean;
}

const initialValues: RequestFormValues = {
  purpose: '',
  topic: '',
  message: '',
  preferredDate: '',
  preferredTime: '',
  duration: '45 min',
  mode: 'Google Meet',
};

export default function RequestModal({ mentor, open, onClose, onSubmit, submitted, submitting = false }: RequestModalProps) {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (!open) {
      setValues(initialValues);
    }
  }, [open]);

  if (!mentor) return null;

  const updateField = (field: keyof RequestFormValues, value: string) => setValues((prev) => ({ ...prev, [field]: value }));

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.97, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97, y: 10 }} className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Request mentorship</h3>
                <p className="mt-1 text-sm text-slate-500">with {mentor.name}</p>
              </div>
              <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center text-emerald-700">
                <CheckCircle2 className="mx-auto mb-3 h-10 w-10" />
                <h4 className="text-lg font-semibold">Your request is on its way</h4>
                <p className="mt-2 text-sm">The mentor will review it shortly and you will be redirected to your dashboard.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); onSubmit(values); }}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="mentorship-purpose" className="mb-1.5 block text-sm font-medium text-slate-700">Purpose</label>
                    <input id="mentorship-purpose" value={values.purpose} onChange={(event) => updateField('purpose', event.target.value)} required className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100" placeholder="Career growth" />
                  </div>
                  <div>
                    <label htmlFor="mentorship-topic" className="mb-1.5 block text-sm font-medium text-slate-700">Topic</label>
                    <input id="mentorship-topic" value={values.topic} onChange={(event) => updateField('topic', event.target.value)} required className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100" placeholder="System design prep" />
                  </div>
                </div>

                <div>
                  <label htmlFor="mentorship-message" className="mb-1.5 block text-sm font-medium text-slate-700">Message</label>
                  <textarea id="mentorship-message" value={values.message} onChange={(event) => updateField('message', event.target.value)} required rows={4} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100" placeholder="Tell the mentor what you want to discuss." />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label htmlFor="mentorship-date" className="mb-1.5 block text-sm font-medium text-slate-700">Preferred date</label>
                    <input id="mentorship-date" type="date" value={values.preferredDate} onChange={(event) => updateField('preferredDate', event.target.value)} required className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100" />
                  </div>
                  <div>
                    <label htmlFor="mentorship-time" className="mb-1.5 block text-sm font-medium text-slate-700">Preferred time</label>
                    <input id="mentorship-time" type="time" value={values.preferredTime} onChange={(event) => updateField('preferredTime', event.target.value)} required className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100" />
                  </div>
                  <div>
                    <label htmlFor="mentorship-duration" className="mb-1.5 block text-sm font-medium text-slate-700">Duration</label>
                    <select id="mentorship-duration" value={values.duration} onChange={(event) => updateField('duration', event.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100">
                      <option>30 min</option>
                      <option>45 min</option>
                      <option>60 min</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="mentorship-mode" className="mb-1.5 block text-sm font-medium text-slate-700">Mode</label>
                  <select id="mentorship-mode" value={values.mode} onChange={(event) => updateField('mode', event.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100">
                    <option>Google Meet</option>
                    <option>Zoom</option>
                    <option>Phone</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={onClose} disabled={submitting} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">Cancel</button>
                  <button type="submit" disabled={submitting} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                    {submitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      'Submit request'
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../Card';
import { HeartHandshake, Clock, CheckCircle2, Timer } from 'lucide-react';

const statIcons = { Handshake: HeartHandshake, Clock, CheckCircle2, Timer };
const statTones = {
  primary: 'bg-primary-50 text-primary-600 border-primary-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  secondary: 'bg-secondary-50 text-secondary-600 border-secondary-100'
};

export function StatisticsCards({ items = [] }) {
  return (
    <section>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Your Mentorship Snapshot</h2>
          <p className="text-sm text-slate-500">A quick look at where things stand</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((stat, i) => {
          const Icon = statIcons[stat.icon];
          return (
            <motion.div key={stat.id} initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.35, delay: i * 0.05 }}>
              <Card className="p-5 h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className={`h-10 w-10 rounded-lg border flex items-center justify-center mb-3 ${statTones[stat.tone]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

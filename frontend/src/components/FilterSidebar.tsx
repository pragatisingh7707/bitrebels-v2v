import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';

interface FilterSidebarProps {
  readonly filters: Record<string, string>;
  readonly onChange: (key: string, value: string) => void;
  readonly onClear: () => void;
  readonly mentorCount: number;
}

export default function FilterSidebar({ filters, onChange, onClear, mentorCount }: FilterSidebarProps) {
  const options = {
    industry: ['Technology', 'Finance', 'Research'],
    company: ['Google', 'Microsoft', 'Meta AI', 'Goldman Sachs'],
    domain: ['Engineering', 'Product', 'Research', 'Finance'],
    experience: ['5', '6', '8', '10'],
    graduationYear: ['2015', '2017', '2019', '2020'],
    availability: ['Available now', 'This week', 'Weekends', 'Limited'],
  };

  return (
    <Card className="p-5 bg-white/80 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">Filters</h3>
          <p className="text-sm text-slate-500">{mentorCount} mentors match</p>
        </div>
        <div className="rounded-full bg-primary-50 p-2 text-primary-600"><SlidersHorizontal className="h-4 w-4" /></div>
      </div>

      <div className="mt-5 space-y-5">
        {Object.entries(options).map(([key, values]) => (
          <div key={key}>
            <label className="mb-2 block text-sm font-medium text-slate-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
            <div className="flex flex-wrap gap-2">
              {values.map((value) => {
                const active = filters[key] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onChange(key, active ? '' : value)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition ${active ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-700'}`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button type="button" onClick={onClear} className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Clear all</button>
        <Badge variant="primary">Refined matches</Badge>
      </div>
    </Card>
  );
}

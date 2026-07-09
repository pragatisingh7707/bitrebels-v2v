import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export default function Dashboard() {
  return (
    <div className="min-h-[70vh] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Card className="p-8 sm:p-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
                Overview
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
              <p className="text-lg text-slate-600">
                Your personalized dashboard is coming soon.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button>Explore Mentors</Button>
              <Button variant="outline">Join Communities</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

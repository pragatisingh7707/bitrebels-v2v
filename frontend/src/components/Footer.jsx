import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-6 dark:bg-slate-950 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
        <div>&copy; {new Date().getFullYear()} <strong>HerConnect</strong>. Built for Women Empowerment Network.</div>
        <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-2 py-0.5 dark:bg-emerald-900 dark:text-emerald-200 dark:border-emerald-700">Frontend Active</span>
      </div>
    </footer>
  );
}
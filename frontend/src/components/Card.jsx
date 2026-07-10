import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={twMerge(clsx('overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900', className))}
      {...props}
    >
      {children}
    </div>
  );
}
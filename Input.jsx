import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Input({ className, type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={twMerge(clsx('w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500', className))}
      {...props}
    />
  );
}
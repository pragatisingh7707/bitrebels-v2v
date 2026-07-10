import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({ children, variant = 'slate', className = '', ...props }) {
  const baseStyles = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold tracking-wide border';
  const variants = {
    slate: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    primary: 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-slate-800 dark:text-primary-300 dark:border-primary-700',
    secondary: 'bg-secondary-50 text-secondary-700 border-secondary-200 dark:bg-slate-800 dark:text-secondary-300 dark:border-secondary-700',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-slate-800 dark:text-emerald-200 dark:border-emerald-700'
  };
  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], className))} {...props}>
      {children}
    </span>
  );
}
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({ children, variant = 'slate', className, ...props }) {
  const baseStyles = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold tracking-wide border';
  const variants = {
    slate: 'bg-slate-50 text-slate-600 border-slate-200',
    primary: 'bg-primary-50 text-primary-700 border-primary-200',
    secondary: 'bg-secondary-50 text-secondary-700 border-secondary-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };
  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], className))} {...props}>
      {children}
    </span>
  );
}
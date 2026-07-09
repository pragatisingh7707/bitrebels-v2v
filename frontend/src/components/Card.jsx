import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({ children, className, ...props }) {
  return (
    <div className={twMerge(clsx('bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden', className))} {...props}>
      {children}
    </div>
  );
}
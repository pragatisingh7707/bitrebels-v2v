import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={twMerge(clsx('overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm', className))}
      {...props}
    >
      {children}
    </div>
  );
}
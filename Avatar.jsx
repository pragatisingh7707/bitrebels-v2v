import React from 'react';
import { getDeterministicAvatar } from '../utils/avatar';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Avatar({ name, className }) {
  const { initials, gradientClass } = getDeterministicAvatar(name);
  return (
    <div className={twMerge(clsx(`flex items-center justify-center rounded-full text-white font-bold bg-gradient-to-br shadow-inner shrink-0 select-none`, gradientClass, className || 'h-10 w-10 text-sm'))}>
      {initials}
    </div>
  );
}
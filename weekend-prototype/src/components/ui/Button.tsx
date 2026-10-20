'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger' | 'success' | 'amber' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  is3D?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  is3D = true,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none tracking-wide cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-extrabold',
  }[size];

  // Simulated 3D vs Standard Flat styles
  const variantStyles = is3D
    ? {
        primary: 'btn-3d btn-3d-indigo',
        secondary: 'btn-3d btn-3d-white text-brand-700',
        accent: 'btn-3d btn-3d-coral',
        success: 'btn-3d btn-3d-emerald',
        amber: 'btn-3d btn-3d-amber',
        purple: 'btn-3d btn-3d-purple',
        outline: 'border-2 border-slate-200 hover:border-brand-500 hover:text-brand-600 text-slate-700 bg-white shadow-soft-sm',
        ghost: 'text-slate-600 hover:text-brand-600 hover:bg-indigo-50/60 shadow-none',
        danger: 'bg-rose-500 hover:bg-rose-600 text-white focus:ring-rose-400 border-b-4 border-rose-800 shadow-rose-500/25 btn-3d',
      }[variant]
    : {
        primary: 'bg-brand-600 hover:bg-brand-700 text-white focus:ring-brand-500 shadow-indigo-500/20',
        secondary: 'bg-indigo-50 hover:bg-indigo-100 text-brand-700 focus:ring-brand-400',
        accent: 'bg-accent-coral hover:bg-orange-600 text-white focus:ring-orange-500 shadow-orange-500/25',
        success: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-400',
        amber: 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400',
        purple: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-400',
        outline: 'border-2 border-slate-200 hover:border-brand-500 hover:text-brand-600 text-slate-700 bg-white',
        ghost: 'text-slate-600 hover:text-brand-600 hover:bg-indigo-50/60 shadow-none',
        danger: 'bg-rose-500 hover:bg-rose-600 text-white focus:ring-rose-400',
      }[variant];

  return (
    <motion.button
      whileTap={disabled ? undefined : { y: is3D ? 3 : 0, scale: is3D ? 1 : 0.98 }}
      whileHover={disabled ? undefined : { y: is3D ? -1 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </motion.button>
  );
};

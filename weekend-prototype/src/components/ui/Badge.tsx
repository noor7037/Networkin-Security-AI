import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'success' | 'warning' | 'neutral' | 'danger' | 'purple';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'brand',
  size = 'md',
  icon,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
  }[size];

  const variantStyles = {
    brand: 'bg-indigo-50 text-brand-700 border border-indigo-100 font-medium',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200 font-medium',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-100',
    purple: 'bg-purple-50 text-purple-700 border border-purple-100',
  }[variant];

  return (
    <span className={`inline-flex items-center font-semibold rounded-full select-none ${sizeStyles} ${variantStyles} ${className}`}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

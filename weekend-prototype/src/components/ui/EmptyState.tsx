'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  ctaText?: string;
  onCtaClick?: () => void;
  iconEmoji?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  ctaText,
  onCtaClick,
  iconEmoji = '🌱',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-100 shadow-soft-sm ${className}`}>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="w-16 h-16 mb-4 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-3xl shadow-soft-sm"
      >
        {iconEmoji}
      </motion.div>
      <h3 className="text-base font-bold text-slate-800 mb-1.5">{title}</h3>
      <p className="text-xs text-slate-500 max-w-xs mb-5 leading-relaxed">{description}</p>
      {ctaText && onCtaClick && (
        <Button size="sm" variant="secondary" onClick={onCtaClick}>
          {ctaText}
        </Button>
      )}
    </div>
  );
};

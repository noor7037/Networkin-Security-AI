'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  is3D?: boolean;
  glass?: boolean;
  bordered?: boolean;
  subjectBorder?: 'math' | 'science' | 'english' | 'sst' | 'hindi';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  is3D = true,
  glass = false,
  bordered = true,
  subjectBorder,
  onClick,
}) => {
  const subject3DClasses = {
    math: 'card-3d card-3d-math',
    science: 'card-3d card-3d-science',
    english: 'card-3d card-3d-english',
    sst: 'card-3d card-3d-sst',
    hindi: 'card-3d card-3d-hindi',
  };

  const subjectBorderClasses = {
    math: 'border-l-4 border-l-subject-math',
    science: 'border-l-4 border-l-subject-science',
    english: 'border-l-4 border-l-subject-english',
    sst: 'border-l-4 border-l-subject-sst',
    hindi: 'border-l-4 border-l-subject-hindi',
  };

  const cardStyleClass = is3D
    ? subjectBorder
      ? subject3DClasses[subjectBorder]
      : 'card-3d'
    : `bg-white rounded-3xl shadow-soft-md ${bordered ? 'border border-slate-100' : ''} ${
        subjectBorder ? subjectBorderClasses[subjectBorder] : ''
      }`;

  const glassClass = glass ? 'glass-panel' : '';

  const baseClasses = `rounded-3xl overflow-hidden ${glassClass || cardStyleClass} ${className}`;

  if (hoverEffect || onClick) {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.008 }}
        whileTap={onClick ? { scale: 0.98, y: 1 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`${baseClasses} cursor-pointer`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{children}</div>;
};

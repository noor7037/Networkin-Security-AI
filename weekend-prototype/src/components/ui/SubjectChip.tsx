'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export type SubjectType = 'math' | 'science' | 'english' | 'sst' | 'hindi' | 'general';

interface SubjectChipProps {
  subject: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const SubjectChip: React.FC<SubjectChipProps> = ({
  subject,
  className = '',
  size = 'md',
}) => {
  const { locale } = useApp();
  const isHi = locale === 'hi';

  const norm = subject.toLowerCase();
  let type: SubjectType = 'general';
  if (norm.includes('math') || norm.includes('गणित')) type = 'math';
  else if (norm.includes('sci') || norm.includes('physic') || norm.includes('chem') || norm.includes('bio') || norm.includes('विज्ञान')) type = 'science';
  else if (norm.includes('eng') || norm.includes('अंग्रेज़')) type = 'english';
  else if (norm.includes('social') || norm.includes('sst') || norm.includes('history') || norm.includes('geog') || norm.includes('सामाजिक')) type = 'sst';
  else if (norm.includes('hindi') || norm.includes('हिंदी')) type = 'hindi';

  const config = {
    math: {
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      dot: 'bg-blue-600',
      label: isHi ? 'गणित (Mathematics)' : 'Mathematics',
    },
    science: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-600',
      label: isHi ? 'विज्ञान (Science)' : 'Science',
    },
    english: {
      bg: 'bg-purple-50 text-purple-700 border-purple-200',
      dot: 'bg-purple-600',
      label: isHi ? 'अंग्रेज़ी (English)' : 'English',
    },
    sst: {
      bg: 'bg-orange-50 text-orange-700 border-orange-200',
      dot: 'bg-orange-600',
      label: isHi ? 'सामाजिक विज्ञान (SST)' : 'Social Science',
    },
    hindi: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-600',
      label: isHi ? 'हिंदी (Hindi)' : 'Hindi',
    },
    general: {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-500',
      label: subject,
    },
  }[type];

  const sizeCls = size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${config.bg} ${sizeCls} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{isHi ? config.label : subject || config.label}</span>
    </span>
  );
};

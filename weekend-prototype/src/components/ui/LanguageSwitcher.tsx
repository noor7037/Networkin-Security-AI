'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { locale, setLocale } = useApp();

  return (
    <div className={`inline-flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/80 ${className}`}>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`relative px-3 py-1 rounded-full text-xs font-semibold transition-all ${
          locale === 'en' ? 'text-brand-900 shadow-soft-sm' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        {locale === 'en' && (
          <motion.div
            layoutId="lang-active-pill"
            className="absolute inset-0 bg-white rounded-full -z-10"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        EN
      </button>

      <button
        type="button"
        onClick={() => setLocale('hi')}
        className={`relative px-3 py-1 rounded-full text-xs font-semibold font-devanagari transition-all ${
          locale === 'hi' ? 'text-brand-900 shadow-soft-sm' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        {locale === 'hi' && (
          <motion.div
            layoutId="lang-active-pill"
            className="absolute inset-0 bg-white rounded-full -z-10"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        हिंदी
      </button>
    </div>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, HelpCircle, Trophy } from 'lucide-react';

interface MascotProps {
  mood?: 'happy' | 'thinking' | 'celebrating' | 'teaching';
  message?: string;
  message_hi?: string;
  subMessage?: string;
  locale?: 'en' | 'hi';
  onActionClick?: () => void;
  actionText?: string;
}

export const MascotSaathi: React.FC<MascotProps> = ({
  mood = 'happy',
  message = "Ready to master today's concept? I'm your Doubt Saathi!",
  message_hi = 'आज का पाठ समझने के लिए तैयार हैं? मैं आपका डाउट साथी हूँ!',
  subMessage,
  locale = 'en',
  onActionClick,
  actionText,
}) => {
  const isHi = locale === 'hi';

  const mascotEmojis = {
    happy: '🤖',
    thinking: '🧐',
    celebrating: '🎉',
    teaching: '💡',
  };

  const badgeTexts = {
    happy: isHi ? 'डाउट साथी AI' : 'Doubt Saathi AI',
    thinking: isHi ? 'सोच विचार...' : 'Analyzing Question...',
    celebrating: isHi ? 'शानदार उपलब्धि!' : 'Awesome Milestone!',
    teaching: isHi ? 'महत्वपूर्ण सूत्र' : 'Key Concept Insight',
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 border-2 border-amber-300/60 shadow-soft-md backdrop-blur-md">
      {/* 3D Simulated Mascot Token */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'easeInOut',
        }}
        className="relative shrink-0 select-none"
      >
        {/* Glow Ring */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 blur-lg opacity-40 animate-pulse" />

        {/* 3D Body Orb */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-300 border-b-4 border-orange-600 shadow-[0_10px_20px_rgba(245,158,11,0.4)] flex items-center justify-center text-3xl sm:text-4xl">
          <span>{mascotEmojis[mood]}</span>

          {/* Little 3D Sparkle Pin */}
          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
        </div>
      </motion.div>

      {/* Speech Bubble Card */}
      <div className="flex-1 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] uppercase font-extrabold tracking-wider mb-1.5">
          <MessageCircle className="w-3 h-3 text-amber-600" />
          <span>{badgeTexts[mood]}</span>
        </div>

        <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug">
          {isHi ? message_hi : message}
        </p>

        {subMessage && (
          <p className="text-xs text-slate-600 mt-1 font-medium">
            {subMessage}
          </p>
        )}

        {actionText && (
          <button
            type="button"
            onClick={onActionClick}
            className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-700 hover:text-brand-900 hover:underline cursor-pointer"
          >
            <span>{actionText}</span>
            <span>→</span>
          </button>
        )}
      </div>
    </div>
  );
};

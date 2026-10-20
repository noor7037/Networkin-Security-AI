'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, Trophy, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { useApp } from '@/context/AppContext';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  score: number;
  totalQuestions: number;
  starsEarned: number;
  streakDays: number;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  title,
  score,
  totalQuestions,
  starsEarned,
  streakDays,
}) => {
  const { locale } = useApp();
  const isHi = locale === 'hi';

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4F46E5', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6'],
        });
      } catch (e) {
        // Fallback gracefully
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const displayTitle =
    title || (isHi ? 'शानदार दक्षता! 🌟' : 'Outstanding Mastery! 🌟');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-sm bg-white rounded-4xl shadow-2xl overflow-hidden p-6 text-center border-4 border-amber-200"
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-100 rounded-full blur-2xl -z-10" />

          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 400 }}
            className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-amber-400 to-amber-200 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/25 border-4 border-white"
          >
            <Trophy className="w-10 h-10 text-amber-900" />
          </motion.div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">{displayTitle}</h2>
          <p className="text-sm text-slate-500 mb-6">
            {isHi
              ? 'आपने अवधारणा की बेहतरीन समझ प्रदर्शित की है!'
              : 'You demonstrated sharp concept understanding!'}
          </p>

          <div className="grid grid-cols-3 gap-2.5 mb-6">
            <div className="bg-amber-50/80 border border-amber-100 rounded-2xl p-2.5">
              <span className="block text-xs font-semibold text-amber-700">
                {isHi ? 'अंक' : 'Score'}
              </span>
              <span className="text-lg font-extrabold text-amber-900">
                {score}/{totalQuestions}
              </span>
            </div>
            <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-2.5">
              <span className="block text-xs font-semibold text-indigo-700">
                {isHi ? 'सितारे XP' : 'Stars XP'}
              </span>
              <span className="text-lg font-extrabold text-indigo-900 flex items-center justify-center gap-1">
                +{starsEarned} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </span>
            </div>
            <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-2.5">
              <span className="block text-xs font-semibold text-emerald-700">
                {isHi ? 'निरंतरता' : 'Streak'}
              </span>
              <span className="text-lg font-extrabold text-emerald-900">
                {streakDays} {isHi ? 'दिन 🔥' : 'Days 🔥'}
              </span>
            </div>
          </div>

          <Button fullWidth size="lg" variant="accent" onClick={onClose} rightIcon={<ArrowRight className="w-4 h-4" />}>
            {isHi ? 'अध्ययन योजना पर आगे बढ़ें' : 'Continue to Study Plan'}
          </Button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

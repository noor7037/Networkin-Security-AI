'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Check, Lock, Gift, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface JourneyNode {
  id: string;
  number: number;
  title: string;
  title_hi?: string;
  subject: 'Science' | 'Math' | 'English' | 'Social Studies' | 'Hindi';
  status: 'completed' | 'active' | 'locked';
  starsEarned?: number;
  xpReward?: number;
  href: string;
}

interface JourneyPathProps {
  nodes?: JourneyNode[];
  locale?: 'en' | 'hi';
  currentStreak?: number;
}

export const GamifiedJourneyPath: React.FC<JourneyPathProps> = ({
  nodes,
  locale = 'en',
  currentStreak = 12,
}) => {
  const isHi = locale === 'hi';

  const defaultNodes: JourneyNode[] = [
    {
      id: 'n1',
      number: 1,
      title: 'Motion & Velocity Basics',
      title_hi: 'गति और वेग के मूल नियम',
      subject: 'Science',
      status: 'completed',
      starsEarned: 3,
      xpReward: 50,
      href: '/explain?topic=motion',
    },
    {
      id: 'n2',
      number: 2,
      title: 'Acceleration & Bumrah Analogy',
      title_hi: 'त्वरण और जसप्रीत बुमराह सूत्र',
      subject: 'Science',
      status: 'active',
      starsEarned: 2,
      xpReward: 60,
      href: '/explain?topic=motion',
    },
    {
      id: 'n3',
      number: 3,
      title: 'Equations of Motion (v=u+at)',
      title_hi: 'गति के तीन प्रमुख समीकरण',
      subject: 'Science',
      status: 'locked',
      starsEarned: 0,
      xpReward: 75,
      href: '/quiz',
    },
    {
      id: 'n4',
      number: 4,
      title: 'Graphical Representation of Motion',
      title_hi: 'ग्राफ द्वारा गति का निरूपण',
      subject: 'Science',
      status: 'locked',
      starsEarned: 0,
      xpReward: 100,
      href: '/explain?topic=motion',
    },
  ];

  const pathNodes = nodes && nodes.length > 0 ? nodes : defaultNodes;

  return (
    <div className="relative py-6 px-4 bg-gradient-to-b from-indigo-50/60 via-amber-50/40 to-slate-50/80 rounded-4xl border-2 border-indigo-100 shadow-soft-sm overflow-hidden">
      {/* Decorative Path Line SVG */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {isHi ? 'गेमीफाइड अधिगम यात्रा' : 'Gamified Learning Journey'}
          </span>
          <h3 className="text-lg font-black text-slate-900 tracking-tight mt-0.5">
            {isHi ? 'टर्म-1 पाठ्यक्रम पथ (Roadmap)' : 'Term 1 Mastery Path'}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-100/90 border border-amber-300 text-amber-900 px-3 py-1 rounded-full text-xs font-black shadow-sm">
          <span>🔥</span>
          <span>{currentStreak} {isHi ? 'दिन स्ट्रीक' : 'Days'}</span>
        </div>
      </div>

      {/* Node Path Column */}
      <div className="relative flex flex-col items-center gap-6 my-2">
        {pathNodes.map((node, index) => {
          const isCompleted = node.status === 'completed';
          const isActive = node.status === 'active';
          const isLocked = node.status === 'locked';

          // Zig-zag offset for a playful winding path
          const offsetClass = index % 2 === 0 ? '-translate-x-6 sm:-translate-x-12' : 'translate-x-6 sm:translate-x-12';

          return (
            <div key={node.id} className={`flex items-center gap-3 transition-transform ${offsetClass}`}>
              <Link href={isLocked ? '#' : node.href} className="group flex items-center gap-3">
                {/* 3D Tactile Node Button */}
                <motion.div
                  whileHover={!isLocked ? { scale: 1.1, y: -4 } : undefined}
                  whileTap={!isLocked ? { scale: 0.95 } : undefined}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center select-none cursor-pointer transition-all ${
                    isCompleted
                      ? 'bg-gradient-to-tr from-emerald-500 to-green-400 border-b-4 border-emerald-700 text-white shadow-lg shadow-emerald-500/30'
                      : isActive
                      ? 'bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-500 border-b-4 border-amber-700 text-white shadow-xl shadow-orange-500/40 ring-4 ring-amber-300/60 animate-pulse'
                      : 'bg-gradient-to-tr from-slate-200 to-slate-300 border-b-4 border-slate-400 text-slate-500 shadow-sm cursor-not-allowed opacity-80'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <Check className="w-7 h-7 stroke-[3]" />
                      <div className="flex gap-0.5 mt-0.5">
                        {[...Array(node.starsEarned || 3)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                        ))}
                      </div>
                    </>
                  ) : isActive ? (
                    <>
                      <span className="text-xl font-black">★</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-tight">
                        {isHi ? 'सक्रिय' : 'Active'}
                      </span>
                    </>
                  ) : (
                    <Lock className="w-6 h-6 text-slate-400" />
                  )}

                  {/* Level Pill Badge */}
                  <span className="absolute -bottom-2 px-2 py-0.5 bg-slate-900 text-white text-[9px] font-mono font-bold rounded-full border border-white/40">
                    Lvl {node.number}
                  </span>
                </motion.div>

                {/* Node Detail Card */}
                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 shadow-soft-sm max-w-[200px] sm:max-w-xs group-hover:border-brand-300 transition-colors">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    {node.subject} • +{node.xpReward} XP
                  </div>
                  <div className="text-xs sm:text-sm font-black text-slate-800 leading-tight mt-0.5">
                    {isHi && node.title_hi ? node.title_hi : node.title}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}

        {/* Milestone Treasure Chest at End of Path */}
        <div className="mt-4 flex flex-col items-center text-center">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 border-b-4 border-purple-900 shadow-xl shadow-purple-500/30 flex items-center justify-center text-3xl cursor-pointer hover:scale-105 transition-transform"
          >
            🎁
          </motion.div>
          <div className="text-xs font-black text-purple-900 mt-2">
            {isHi ? 'अध्याय 8 पूर्णता खजाना (+250 XP)' : 'Chapter 8 Mastery Chest (+250 XP)'}
          </div>
          <p className="text-[11px] text-slate-500">
            {isHi ? 'सभी 4 स्तर पार करने पर अनलॉक होगा' : 'Unlocks after mastering all 4 levels'}
          </p>
        </div>
      </div>
    </div>
  );
};

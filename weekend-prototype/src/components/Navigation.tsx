'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { SiblingSwitcher } from './ui/SiblingSwitcher';
import { LanguageSwitcher } from './ui/LanguageSwitcher';
import { NotificationDrawer } from './ui/NotificationDrawer';
import {
  Home,
  Calendar,
  Sparkles,
  HelpCircle,
  Award,
  Building2,
  Menu,
  X,
  Video,
  FileText,
  Clock,
  ShieldCheck,
  TrendingUp,
  Camera,
  Bell,
  Languages,
  Compass,
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { t, themeVariant, activeChild, unreadCount, openNotificationDrawer, locale } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isJunior = themeVariant === 'junior';

  const mainNav = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/explain', label: t('nav.understand'), icon: Sparkles },
    { href: '/plan', label: t('nav.plan'), icon: Calendar },
    { href: '/quiz', label: t('nav.quiz'), icon: Award },
    { href: '/doubt-saathi', label: t('nav.doubt'), icon: HelpCircle },
    { href: '/english', label: t('nav.english'), icon: Languages },
    { href: '/careers', label: t('nav.careers'), icon: Compass },
    { href: '/opportunities', label: t('nav.opportunities'), icon: Award },
    { href: '/school-connect', label: t('nav.school'), icon: Building2 },
  ];

  const secondaryNav = [
    { href: '/scan', label: t('nav.scan'), icon: Camera },
    { href: '/videos', label: t('nav.videos'), icon: Video },
    { href: '/vault', label: t('nav.vault'), icon: ShieldCheck },
    { href: '/toolkit', label: t('nav.toolkit'), icon: Clock },
    { href: '/insight', label: t('nav.insight'), icon: TrendingUp },
    { href: '/homework-helper', label: t('nav.homework'), icon: FileText },
  ];

  return (
    <>
      {/* Top Header */}
      <header
        className={`sticky top-0 z-30 backdrop-blur-md border-b shadow-soft-sm transition-colors ${
          isJunior
            ? 'bg-amber-50/90 border-amber-200/60'
            : 'bg-white/95 border-slate-100'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-soft-sm font-extrabold text-lg transition-all ${
                isJunior
                  ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 shadow-amber-500/25'
                  : 'bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-400 shadow-brand-500/20'
              }`}
            >
              N
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
                <span>NetCyberAI</span>
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full border ${
                    isJunior
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-brand-50 text-brand-700 border-brand-200'
                  }`}
                >
                  {isJunior
                    ? locale === 'hi'
                      ? 'जूनियर'
                      : 'Junior'
                    : locale === 'hi'
                    ? 'बोर्ड प्रो'
                    : 'Consumer'}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {t('app.tagline')}
              </span>
            </div>
          </Link>

          {/* Sibling Switcher, Language Switcher & Notifications */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Live 3D Streak & XP Chips in Top Header */}
            {activeChild && (
              <div className="hidden md:flex items-center gap-1.5 mr-1">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-300 text-amber-900 text-xs font-black shadow-sm">
                  <span className="text-sm">🔥</span>
                  <span>{activeChild.streak_days}</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-300 text-amber-950 text-xs font-black shadow-sm">
                  <span className="text-sm">⭐</span>
                  <span>{activeChild.stars_xp}</span>
                </div>
              </div>
            )}

            <SiblingSwitcher />
            <LanguageSwitcher />

            {/* Notification Bell with Live Unread Badge */}
            <button
              type="button"
              onClick={openNotificationDrawer}
              aria-label="Notification Center"
              className="relative p-2 rounded-2xl text-slate-700 hover:text-brand-600 hover:bg-slate-100 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer"
            >
              <Bell className="w-5 h-5 text-slate-700" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 text-[10px] font-extrabold text-white bg-rose-500 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 ml-2">
              {mainNav.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isActive
                        ? isJunior
                          ? 'bg-amber-100 text-amber-900 font-bold'
                          : 'bg-brand-50 text-brand-700 font-bold'
                        : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              aria-label={locale === 'hi' ? 'मेनू खोलें' : 'Toggle Menu'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-slate-600 hover:bg-slate-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-white shadow-2xl p-6 z-50 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm font-bold text-slate-800">
                    {locale === 'hi' ? 'सभी अध्ययन सुविधाएँ' : 'All Learning Surfaces'}
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full text-slate-400 hover:text-slate-600 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {[...mainNav, ...secondaryNav].map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold min-h-[44px] ${
                          isActive
                            ? 'bg-brand-50 text-brand-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-brand-500" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center mt-4">
                <div className="text-[11px] font-bold text-slate-700">
                  {locale === 'hi' ? 'NetCyberAI लर्निंग ऐप' : 'NetCyberAI Learning App'}
                </div>
                <div className="text-[10px] text-slate-500">
                  {t('profile.grade')} {activeChild?.grade_level || 9} • {activeChild?.board || 'CBSE'}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Floating 3D Navigation Bar on Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-3 py-1.5 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] flex items-center justify-around">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-bold transition-all min-h-[44px] min-w-[50px] ${
            pathname === '/' || pathname === '/family'
              ? 'text-brand-600 font-black scale-105'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className={`w-4 h-4 mb-0.5 ${pathname === '/' || pathname === '/family' ? 'text-brand-600 stroke-[2.5]' : 'text-slate-400'}`} />
          <span>{t('nav.home')}</span>
        </Link>

        {/* 2. Plan */}
        <Link
          href="/plan"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-bold transition-all min-h-[44px] min-w-[50px] ${
            pathname === '/plan' ? 'text-brand-600 font-black scale-105' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className={`w-4 h-4 mb-0.5 ${pathname === '/plan' ? 'text-brand-600 stroke-[2.5]' : 'text-slate-400'}`} />
          <span>{t('nav.plan')}</span>
        </Link>

        {/* 3. Center Elevated 3D "Understand / समझें" Action Button */}
        <Link
          href="/explain"
          className="relative -top-4 flex flex-col items-center justify-center group focus:outline-none"
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all transform group-active:translate-y-1 ${
              pathname === '/explain'
                ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 border-b-4 border-amber-700 shadow-lg shadow-orange-500/40 ring-4 ring-amber-200/80'
                : 'bg-gradient-to-tr from-brand-600 via-indigo-600 to-indigo-700 border-b-4 border-brand-900 shadow-lg shadow-indigo-500/35'
            }`}
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[10px] font-black text-slate-800 tracking-tight mt-1">
            {locale === 'hi' ? 'समझें' : 'Understand'}
          </span>
        </Link>

        {/* 4. Quiz */}
        <Link
          href="/quiz"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-bold transition-all min-h-[44px] min-w-[50px] ${
            pathname === '/quiz' ? 'text-brand-600 font-black scale-105' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Award className={`w-4 h-4 mb-0.5 ${pathname === '/quiz' ? 'text-brand-600 stroke-[2.5]' : 'text-slate-400'}`} />
          <span>{t('nav.quiz')}</span>
        </Link>

        {/* 5. Doubt Saathi */}
        <Link
          href="/doubt-saathi"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-bold transition-all min-h-[44px] min-w-[50px] ${
            pathname === '/doubt-saathi' ? 'text-brand-600 font-black scale-105' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <HelpCircle className={`w-4 h-4 mb-0.5 ${pathname === '/doubt-saathi' ? 'text-brand-600 stroke-[2.5]' : 'text-slate-400'}`} />
          <span>{t('nav.doubt')}</span>
        </Link>
      </div>

      {/* Responsive Notification Drawer / Bottom Sheet */}
      <NotificationDrawer />
    </>
  );
};

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, AppNotification } from '@/context/AppContext';
import {
  Bell,
  X,
  Clock,
  Shield,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import { Button } from './Button';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationOpen,
    closeNotificationDrawer,
    notifications,
    markAllAsRead,
    markNotificationRead,
    childrenList,
    cappedEventsCount,
    t,
    locale,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'alerts' | 'digest'>('alerts');
  const [filterChild, setFilterChild] = useState<'all' | string>('all');

  const isHi = locale === 'hi';

  const filteredNotifications = notifications.filter((n) => {
    if (filterChild === 'all') return true;
    return n.childId === filterChild;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeBadge = (type: AppNotification['type']) => {
    switch (type) {
      case 'daily_plan':
        return (
          <span className="text-[10px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-bold">
            {isHi ? 'अध्ययन योजना' : 'Study Plan'}
          </span>
        );
      case 'quiz_reminder':
        return (
          <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-bold">
            {isHi ? 'क्विज़ देय' : 'Quiz Due'}
          </span>
        );
      case 'scheme_match':
        return (
          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
            {isHi ? 'छात्रवृत्ति अवसर' : 'Opportunity'}
          </span>
        );
      case 'milestone':
        return (
          <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-bold">
            {isHi ? 'उपलब्धि' : 'Milestone'}
          </span>
        );
      case 'school_update':
        return (
          <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">
            {isHi ? 'स्कूल सूचना' : 'School'}
          </span>
        );
    }
  };

  if (!isNotificationOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeNotificationDrawer}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Responsive Sheet (Desktop: Right Drawer, Mobile: Bottom Sheet) */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <motion.div
            initial={{ x: '100%', y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: '100%', y: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden sm:rounded-l-4xl border-l border-slate-100"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-soft-sm">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-extrabold text-slate-900">{t('notif.title')}</h2>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-extrabold bg-rose-500 text-white px-2 py-0.5 rounded-full">
                        {unreadCount} {t('notif.unread')}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {t('notif.cap_notice')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                aria-label={isHi ? 'बंद करें' : 'Close'}
                onClick={closeNotificationDrawer}
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* View Selector Tabs & Actions */}
            <div className="px-5 pt-3 pb-2 bg-white space-y-2 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="inline-flex p-1 bg-slate-100 rounded-full border border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => setActiveTab('alerts')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      activeTab === 'alerts'
                        ? 'bg-white text-brand-700 shadow-soft-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {t('notif.tray_tab')} ({filteredNotifications.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('digest')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'digest'
                        ? 'bg-white text-emerald-800 shadow-soft-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <MessageCircle className="w-3 h-3 text-emerald-600" />
                    <span>{t('notif.digest_tab')}</span>
                  </button>
                </div>

                {activeTab === 'alerts' && unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    {t('notif.mark_all_read')}
                  </button>
                )}
              </div>

              {/* Per-Child Filter Chips */}
              {activeTab === 'alerts' && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setFilterChild('all')}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                      filterChild === 'all'
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isHi ? 'सभी बच्चे' : 'All Children'}
                  </button>
                  {childrenList.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setFilterChild(c.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all ${
                        filterChild === c.id
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>{c.avatar}</span>
                      <span>{isHi && c.name_hi ? c.name_hi : c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {cappedEventsCount > 0 && activeTab === 'alerts' && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-[11px] text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {isHi
                      ? `शून्य-स्पैम सुरक्षा सक्रिय: ${cappedEventsCount} अतिरिक्त सूचनाएं रविवार सारांश के लिए रोकी गईं।`
                      : `Frequency Cap Active: ${cappedEventsCount} extra notification(s) held for Sunday Digest to prevent spam.`}
                  </span>
                </div>
              )}

              {activeTab === 'alerts' ? (
                <>
                  {filteredNotifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-indigo-50 text-2xl flex items-center justify-center">
                        📬
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 mb-1">{t('notif.empty_title')}</h3>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                        {t('notif.empty_desc')}
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => markNotificationRead(notif.id)}
                        className={`p-4 rounded-3xl border transition-all cursor-pointer relative ${
                          notif.read
                            ? 'bg-white border-slate-100 text-slate-700'
                            : 'bg-indigo-50/40 border-brand-200/90 shadow-soft-sm'
                        }`}
                      >
                        {!notif.read && (
                          <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-brand-600 ring-4 ring-brand-100" />
                        )}

                        <div className="flex items-center gap-2 mb-2 pr-6">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200/80">
                            <span>{notif.childAvatar}</span>
                            <span>{notif.childName}</span>
                          </span>
                          {getTypeBadge(notif.type)}
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 leading-snug">
                          {isHi && notif.title_hi ? notif.title_hi : notif.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {isHi && notif.body_hi ? notif.body_hi : notif.body}
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {isHi && notif.createdAt_hi ? notif.createdAt_hi : notif.createdAt}
                          </span>
                          {!notif.read ? (
                            <span className="text-brand-600 font-semibold">
                              {isHi ? 'पढ़ा हुआ चिह्नित करें' : 'Tap to mark read'}
                            </span>
                          ) : (
                            <span className="text-slate-400">{isHi ? 'पढ़ा गया' : 'Read'}</span>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </>
              ) : (
                /* Weekly Digest View (What gets delivered via WhatsApp) */
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-3xl">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs mb-1">
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>
                        {isHi ? 'साप्ताहिक व्हाट्सएप सारांश पूर्वावलोकन' : 'Weekly WhatsApp Digest Preview'}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-700 leading-relaxed">
                      {isHi
                        ? 'यह 3-पंक्ति का साप्ताहिक प्रगति सारांश प्रत्येक रविवार शाम 7:00 बजे पंजीकृत अभिभावक व्हाट्सएप नंबर पर भेजा जाता है।'
                        : 'This is the governed 3-line diagnostic digest automatically compiled and dispatched every Sunday at 7:00 PM to registered guardian WhatsApp numbers.'}
                    </p>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl shadow-xl space-y-4">
                    <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                          {isHi ? 'NetCyberAI रविवार विवरण' : 'NetCyberAI Sunday Briefing'}
                        </div>
                        <div className="text-sm font-extrabold text-white">
                          {isHi ? 'पारिवारिक अध्ययन प्रगति सारांश' : 'Family Progress Digest'}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400">Oct 18, 2026</span>
                    </div>

                    {/* Child 1 Brief */}
                    <div className="space-y-1.5 p-3.5 bg-slate-800/60 rounded-2xl border border-slate-700/60 text-xs">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span>{isHi ? '👧 दिया शर्मा (कक्षा 10)' : '👧 Diya Sharma (Class 10)'}</span>
                        <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.2 rounded-full">
                          {isHi ? '12-दिन निरंतरता 🔥' : '12-Day Streak 🔥'}
                        </span>
                      </div>
                      {isHi ? (
                        <p className="text-slate-200 leading-relaxed">
                          • <strong>अध्ययन:</strong> गति (त्वरण, वेग-समय ग्राफ) और 28 क्विज़ प्रश्न पूरे किए।<br />
                          • <strong>ध्यान देने योग्य:</strong> ग्राफ के ढाल (slope) के प्रश्न मंगलवार को पुनः दोहराए जाएंगे।<br />
                          • <strong>अगला लक्ष्य:</strong> न्यूटन का द्वितीय नियम और संवेग (Momentum)।
                        </p>
                      ) : (
                        <p className="text-slate-200 leading-relaxed">
                          • <strong>Studied:</strong> Motion (Acceleration, v-t graphs) with 28 quiz questions completed.<br />
                          • <strong>Focus Area:</strong> Graph slope calculations scheduled to resurface Tuesday.<br />
                          • <strong>Next:</strong> Newton&apos;s Second Law &amp; Momentum formulas.
                        </p>
                      )}
                    </div>

                    {/* Child 2 Brief */}
                    <div className="space-y-1.5 p-3.5 bg-slate-800/60 rounded-2xl border border-slate-700/60 text-xs">
                      <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                        <span>{isHi ? '👦 आरव शर्मा (कक्षा 6)' : '👦 Aarav Sharma (Class 6)'}</span>
                        <span className="text-[10px] bg-indigo-400/20 text-indigo-300 px-2 py-0.2 rounded-full">
                          {isHi ? '320 सितारे ⭐' : '320 Stars ⭐'}
                        </span>
                      </div>
                      {isHi ? (
                        <p className="text-slate-200 leading-relaxed">
                          • <strong>अध्ययन:</strong> पौधों के भाग, प्रकाश संश्लेषण और वास्तविक जीवन के उदाहरण।<br />
                          • <strong>अगला लक्ष्य:</strong> दैनिक जीवन में भिन्न (Fractions) और दशमलव क्वेस्ट।
                        </p>
                      ) : (
                        <p className="text-slate-200 leading-relaxed">
                          • <strong>Studied:</strong> Plant tissues, photosynthesis &amp; real-life examples.<br />
                          • <strong>Next:</strong> Fractions &amp; decimals in daily life quest.
                        </p>
                      )}
                    </div>

                    <div className="pt-2 text-[10px] text-slate-400 text-center">
                      {isHi
                        ? 'सत्यापित सरकारी छात्रवृत्ति योजनाएं: आपके परिवार के लिए 3 उपलब्ध।'
                        : 'Verified government schemes matched: 3 available for your family.'}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom Footer Info */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                <Shield className="w-3.5 h-3.5 text-brand-600" />
                {isHi ? 'शून्य स्पैम गारंटी' : 'Zero Spam Guarantee'}
              </span>
              <Button size="sm" variant="ghost" onClick={closeNotificationDrawer}>
                {isHi ? 'बंद करें' : 'Close'}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

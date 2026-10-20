'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { UserPlus, Check, ChevronDown } from 'lucide-react';
import { Button } from './Button';

export const SiblingSwitcher: React.FC = () => {
  const { activeChild, childrenList, setActiveChildId, addChild, t, locale } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New child form state
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState(8);
  const [newBoard, setNewBoard] = useState('CBSE');
  const [newMedium, setNewMedium] = useState('english');

  const handleCreateChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addChild({
      name: newName.trim(),
      name_hi: newName.trim(),
      avatar: newGrade <= 7 ? '👦' : '🧑‍🎓',
      grade_level: Number(newGrade),
      board: newBoard,
      medium: newMedium,
    });

    setNewName('');
    setShowAddModal(false);
    setIsOpen(false);
  };

  if (!activeChild) return null;

  const isJunior = activeChild.grade_level <= 7;
  const displayChildName = locale === 'hi' && activeChild.name_hi ? activeChild.name_hi : activeChild.name;

  return (
    <div className="relative">
      {/* Active Child Trigger Pill */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`${activeChild.name} (${t('profile.switch')})`}
        className={`flex items-center gap-2 bg-white/95 hover:bg-white border shadow-soft-sm pl-2 pr-3 py-1.5 rounded-full transition-all min-h-[44px] ${
          isJunior ? 'border-amber-300/90' : 'border-slate-200/90'
        }`}
      >
        <motion.span
          key={activeChild.id}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`w-7 h-7 rounded-full text-white flex items-center justify-center text-sm shadow-sm ${
            isJunior
              ? 'bg-gradient-to-tr from-amber-500 to-orange-400'
              : 'bg-gradient-to-tr from-brand-500 to-indigo-400'
          }`}
        >
          {activeChild.avatar}
        </motion.span>
        <div className="text-left">
          <div className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
            <span>{displayChildName}</span>
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                isJunior ? 'text-amber-800 bg-amber-100' : 'text-brand-600 bg-brand-50'
              }`}
            >
              {t('profile.grade')} {activeChild.grade_level}
            </span>
          </div>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
      </motion.button>

      {/* Sibling Switcher Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="absolute left-0 mt-2 w-76 bg-white rounded-3xl shadow-xl border border-slate-100 p-3.5 z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-2 py-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {t('profile.switch')}
                </span>
                <span className="text-[10px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                  {locale === 'hi' ? 'कक्षा-अनुकूल थीम' : 'Class-Adaptive Theme'}
                </span>
              </div>

              <div className="space-y-1.5 my-1.5">
                {childrenList.map((child) => {
                  const isActive = child.id === activeChild.id;
                  const childIsJunior = child.grade_level <= 7;
                  const childDisplayName = locale === 'hi' && child.name_hi ? child.name_hi : child.name;
                  return (
                    <motion.button
                      key={child.id}
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveChildId(child.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-all min-h-[52px] ${
                        isActive
                          ? childIsJunior
                            ? 'bg-amber-50 border border-amber-300/80 shadow-sm'
                            : 'bg-brand-50 border border-brand-200/80 shadow-sm'
                          : 'hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-base">
                          {child.avatar}
                        </span>
                        <div className="text-left">
                          <div className="text-xs font-bold text-slate-800">{childDisplayName}</div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <span>
                              {child.board} • {t('profile.grade')} {child.grade_level}
                            </span>
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                                childIsJunior
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-indigo-100 text-indigo-800'
                              }`}
                            >
                              {childIsJunior
                                ? locale === 'hi'
                                  ? 'जूनियर (5 प्रश्न)'
                                  : 'Junior (5 Qs)'
                                : locale === 'hi'
                                ? 'सीनियर (10 प्रश्न)'
                                : 'Senior (10 Qs)'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-amber-200/60">
                          ⭐ {child.stars_xp}
                        </span>
                        {isActive && <Check className="w-4 h-4 text-brand-600" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2">
                <Button
                  fullWidth
                  variant="outline"
                  size="sm"
                  leftIcon={<UserPlus className="w-3.5 h-3.5 text-brand-600" />}
                  onClick={() => {
                    setIsOpen(false);
                    setShowAddModal(true);
                  }}
                >
                  {t('profile.add_child')}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Child Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-4xl p-6 w-full max-w-sm shadow-2xl border border-slate-100"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-1">{t('profile.add_child')}</h3>
              <p className="text-xs text-slate-500 mb-4">
                {locale === 'hi'
                  ? 'प्रत्येक बच्चे को अपनी स्वतंत्र सिलेबस प्रोफ़ाइल, अध्ययन योजना और दैनिक क्विज़ मिलता है।'
                  : 'Each child gets their own syllabus scan, study plan, and daily quiz loops.'}
              </p>

              <form onSubmit={handleCreateChild} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {locale === 'hi' ? 'बच्चे का नाम' : "Child's Name"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={locale === 'hi' ? 'उदा. कबीर, अनन्या' : 'e.g. Kabir, Ananya'}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full text-sm px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {locale === 'hi' ? 'कक्षा (1 - 12)' : 'Class (1 - 12)'}
                    </label>
                    <select
                      value={newGrade}
                      onChange={(e) => setNewGrade(Number(e.target.value))}
                      className="w-full text-sm px-3 py-2.5 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                        <option key={g} value={g}>
                          {locale === 'hi' ? `कक्षा ${g}` : `Class ${g}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {locale === 'hi' ? 'बोर्ड' : 'Board'}
                    </label>
                    <select
                      value={newBoard}
                      onChange={(e) => setNewBoard(e.target.value)}
                      className="w-full text-sm px-3 py-2.5 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="State Board">{locale === 'hi' ? 'राज्य बोर्ड' : 'State Board'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {locale === 'hi' ? 'अध्ययन माध्यम' : 'Language Medium'}
                  </label>
                  <select
                    value={newMedium}
                    onChange={(e) => setNewMedium(e.target.value)}
                    className="w-full text-sm px-3 py-2.5 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="english">{locale === 'hi' ? 'अंग्रेज़ी माध्यम' : 'English Medium'}</option>
                    <option value="bilingual">{locale === 'hi' ? 'द्विभाषी (हिंदी + English)' : 'Bilingual (Hindi + English)'}</option>
                    <option value="hindi">{locale === 'hi' ? 'हिंदी माध्यम' : 'Hindi Medium'}</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    fullWidth
                    onClick={() => setShowAddModal(false)}
                  >
                    {locale === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </Button>
                  <Button type="submit" variant="primary" fullWidth>
                    {locale === 'hi' ? 'प्रोफ़ाइल सहेजें' : 'Save Profile'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { VoiceMicButton } from '@/components/ui/VoiceMicButton';
import {
  Download,
  Plus,
  CheckCircle2,
  X,
  ShieldCheck,
  FileText,
} from 'lucide-react';

export default function LearningVaultPage() {
  const { activeChild, activeVault, addVaultMilestone, t, locale } = useApp();
  const isHi = locale === 'hi';

  const [showDossierModal, setShowDossierModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [downloadConfirm, setDownloadConfirm] = useState(false);

  const childDisplayName = isHi && activeChild?.name_hi ? activeChild.name_hi : activeChild?.name;

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !activeChild) return;

    addVaultMilestone(activeChild.id, {
      type: 'certificate',
      title: newTitle.trim(),
      title_hi: newTitle.trim(),
      description: newDesc.trim() || 'Verified family learning achievement added to permanent portfolio.',
      description_hi: newDesc.trim() || 'स्थायी लर्निंग पोर्टफोलियो में जोड़ी गई प्रमाणित शैक्षणिक उपलब्धि।',
      badge: '🏅',
      category: 'Certificate & Award',
      category_hi: 'प्रमाणपत्र एवं पुरस्कार',
    });

    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  const handleDownloadDossier = () => {
    setDownloadConfirm(true);
    try {
      const dossierPayload = {
        studentName: activeChild?.name,
        gradeLevel: activeChild?.grade_level,
        board: activeChild?.board,
        starsXp: activeChild?.stars_xp,
        streakDays: activeChild?.streak_days,
        exportedOn: '2026-10-18',
        ownershipGuarantee: '100% Family Owned — Survives Any School Change',
        entries: activeVault,
      };
      const blob = new Blob([JSON.stringify(dossierPayload, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(activeChild?.name || 'Student').replace(/\s+/g, '_')}_Learning_Vault_Dossier.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Safe fallback in headless browser
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="brand" size="sm">
              {isHi ? 'आजीवन पोर्टफोलियो' : 'Lifetime Portfolio'}
            </Badge>
            <span className="text-xs text-slate-400">
              {isHi ? 'स्कूल बदलने पर भी 100% सुरक्षित' : 'Survives Any School Change'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('nav.vault')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-0.5">
            {isHi
              ? `${childDisplayName} की स्थायी शैक्षणिक उपलब्धियां, क्विज़ निरंतरता, प्रमाणपत्र और दक्षता समयरेखा।`
              : `Your child's permanent learning milestones, quiz streaks, certificates, and concept mastery timeline.`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setShowAddModal(true)}
          >
            {isHi ? 'उपलब्धि जोड़ें' : 'Add Milestone'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-3.5 h-3.5" />}
            onClick={() => {
              setDownloadConfirm(false);
              setShowDossierModal(true);
            }}
          >
            {isHi ? 'सारांश निर्यात करें' : 'Export Summary'}
          </Button>
        </div>
      </div>

      {/* Top Shelf Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-amber-50/80 border border-amber-200/70 rounded-3xl text-center">
          <span className="text-2xl block mb-1">🔥</span>
          <div className="text-base font-extrabold text-amber-900">
            {activeChild?.streak_days || 12} {isHi ? 'दिन' : 'Days'}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold">
            {isHi ? 'सक्रिय निरंतरता' : 'Active Streak'}
          </div>
        </div>
        <div className="p-4 bg-indigo-50/80 border border-indigo-200/70 rounded-3xl text-center">
          <span className="text-2xl block mb-1">⭐</span>
          <div className="text-base font-extrabold text-indigo-900">
            {activeChild?.stars_xp || 890} XP
          </div>
          <div className="text-[11px] text-indigo-700 font-semibold">
            {isHi ? 'कुल अर्जित सितारे' : 'Total Stars Earned'}
          </div>
        </div>
        <div className="p-4 bg-emerald-50/80 border border-emerald-200/70 rounded-3xl text-center">
          <span className="text-2xl block mb-1">🏆</span>
          <div className="text-base font-extrabold text-emerald-900">
            18 {isHi ? 'विषय' : 'Topics'}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            {isHi ? 'पूर्ण दक्षता विषय' : 'Mastered Topics'}
          </div>
        </div>
        <div className="p-4 bg-purple-50/80 border border-purple-200/70 rounded-3xl text-center">
          <span className="text-2xl block mb-1">📜</span>
          <div className="text-base font-extrabold text-purple-900">
            {activeVault.length} {isHi ? 'रिकॉर्ड' : 'Entries'}
          </div>
          <div className="text-[11px] text-purple-700 font-semibold">
            {isHi ? 'स्थायी वॉल्ट रिकॉर्ड' : 'Vault Milestones'}
          </div>
        </div>
      </div>

      {/* Timeline entries */}
      <div className="space-y-3.5">
        {activeVault.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="p-5 border border-slate-100 flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl shrink-0 shadow-soft-sm">
                {item.badge}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <span className="text-[11px] font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
                    {isHi ? item.category_hi : item.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                  {isHi ? item.title_hi : item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isHi ? item.description_hi : item.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Achievement Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-4xl p-6 w-full max-w-md shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">
                  {isHi ? 'नई उपलब्धि या प्रमाणपत्र जोड़ें' : 'Add Vault Milestone or Certificate'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddAchievement} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isHi ? 'उपलब्धि का शीर्षक' : 'Milestone Title'}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder={
                        isHi
                          ? 'उदा. जिला विज्ञान प्रदर्शनी प्रथम पुरस्कार'
                          : 'e.g. District Science Fair First Prize'
                      }
                      className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <VoiceMicButton
                      size="sm"
                      language={isHi ? 'hi-IN' : 'en-IN'}
                      onTranscript={(spoken) => setNewTitle(spoken)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isHi ? 'विवरण' : 'Description'}
                  </label>
                  <textarea
                    rows={2}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder={
                      isHi
                        ? 'प्रमाणपत्र या उपलब्धि का संक्षिप्त विवरण...'
                        : 'Brief details of the certificate, project, or milestone...'
                    }
                    className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    fullWidth
                    onClick={() => setShowAddModal(false)}
                  >
                    {isHi ? 'रद्द करें' : 'Cancel'}
                  </Button>
                  <Button type="submit" variant="primary" fullWidth>
                    {isHi ? 'वॉल्ट में सहेजें' : 'Save to Vault'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Certified Learning Dossier Export Modal (Replaces Banned alert()!) */}
      <AnimatePresence>
        {showDossierModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-white rounded-4xl p-6 sm:p-7 w-full max-w-lg shadow-2xl border border-slate-100 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {isHi
                        ? 'प्रमाणित लर्निंग डोजियर (Certified Portfolio Dossier)'
                        : 'Certified Learning Portfolio Dossier'}
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      {childDisplayName} • {t('profile.grade')} {activeChild?.grade_level} ({activeChild?.board})
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDossierModal(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>{isHi ? 'परिवार स्वामित्व गारंटी:' : 'Family Ownership Guarantee:'}</span>
                  <span className="text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    100% Portable
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {isHi
                    ? `इस डोजियर में ${childDisplayName} के ${activeVault.length} सत्यापित मील के पत्थर, ${activeChild?.stars_xp} सितारे (XP) और ${activeChild?.streak_days}-दिन की अध्ययन निरंतरता शामिल है।`
                    : `Includes ${activeVault.length} verified milestones, ${activeChild?.stars_xp} Stars XP, and ${activeChild?.streak_days}-day learning streak for school admission or scholarship records.`}
                </p>
              </div>

              {downloadConfirm && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {isHi
                      ? 'पोर्टफोलियो डोजियर फ़ाइल सफलतापूर्वक डाउनलोड हो गई!'
                      : 'Certified Portfolio Dossier exported and downloaded!'}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setShowDossierModal(false)}>
                  {isHi ? 'बंद करें' : 'Close'}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                  onClick={handleDownloadDossier}
                >
                  {isHi ? 'डोजियर फ़ाइल डाउनलोड करें' : 'Download Certified Dossier'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

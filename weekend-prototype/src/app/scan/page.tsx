'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, SyllabusChapterItem } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SubjectChip } from '@/components/ui/SubjectChip';
import { VoiceMicButton } from '@/components/ui/VoiceMicButton';
import {
  Camera,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Plus,
  X,
  Save,
  ArrowRight,
  Edit3,
} from 'lucide-react';
import Link from 'next/link';

export default function SyllabusScanPage() {
  const { activeChild, activeSyllabus, updateChildSyllabus, t, locale, addNotification } = useApp();
  const isHi = locale === 'hi';
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [chapters, setChapters] = useState<SyllabusChapterItem[]>(activeSyllabus.chapters);
  const [confidence, setConfidence] = useState<number>(activeSyllabus.confidence);
  const [resolvedTerm, setResolvedTerm] = useState<string | null>(null);
  const [showClarification, setShowClarification] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newTopicInputs, setNewTopicInputs] = useState<Record<number, string>>({});

  // Sync local chapters when switching child profiles
  React.useEffect(() => {
    setChapters(activeSyllabus.chapters);
    setConfidence(activeSyllabus.confidence);
    setSavedSuccess(false);
  }, [activeChild?.id, activeSyllabus]);

  const handleSimulateScan = (withAmbiguity = false, fileName?: string) => {
    setIsScanning(true);
    setSavedSuccess(false);
    if (fileName) setUploadedFileName(fileName);

    setTimeout(() => {
      setIsScanning(false);
      setConfidence(withAmbiguity ? 0.78 : 0.96);
      setChapters(activeSyllabus.chapters);

      if (withAmbiguity) {
        setShowClarification(true);
      }
    }, 650);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSimulateScan(false, file.name);
    }
  };

  const handleResolveClarification = (term: string) => {
    setShowClarification(false);
    setConfidence(0.98);
    setResolvedTerm(term);
  };

  const handleAddTopic = (chapterIdx: number, topicText?: string) => {
    const raw = (topicText ?? newTopicInputs[chapterIdx] ?? '').trim();
    if (!raw) return;

    setChapters((prev) =>
      prev.map((ch, idx) =>
        idx === chapterIdx
          ? {
              ...ch,
              topics: [...ch.topics, raw],
              topics_hi: [...(ch.topics_hi || ch.topics), raw],
            }
          : ch
      )
    );
    setNewTopicInputs((prev) => ({ ...prev, [chapterIdx]: '' }));
    setSavedSuccess(false);
  };

  const handleRemoveTopic = (chapterIdx: number, topicIdx: number) => {
    setChapters((prev) =>
      prev.map((ch, idx) =>
        idx === chapterIdx
          ? {
              ...ch,
              topics: ch.topics.filter((_, tIdx) => tIdx !== topicIdx),
              topics_hi: (ch.topics_hi || ch.topics).filter((_, tIdx) => tIdx !== topicIdx),
            }
          : ch
      )
    );
    setSavedSuccess(false);
  };

  const handleSaveProfile = () => {
    if (!activeChild) return;
    updateChildSyllabus(activeChild.id, chapters, true);
    setSavedSuccess(true);
    addNotification({
      childId: activeChild.id,
      childName: activeChild.name,
      childAvatar: activeChild.avatar,
      title: `Syllabus Profile v${activeSyllabus.version + 1} Saved`,
      title_hi: `सिलेबस प्रोफ़ाइल v${activeSyllabus.version + 1} सहेजी गई`,
      body: `Updated ${chapters.length} chapters for ${activeChild.name}. Day-wise study plan re-synchronized.`,
      body_hi: `${activeChild.name} के लिए ${chapters.length} अध्याय अपडेट किए गए। दैनिक अध्ययन योजना सिंक हो गई है।`,
      type: 'daily_plan',
    });
  };

  const childDisplayName = isHi && activeChild?.name_hi ? activeChild.name_hi : activeChild?.name;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="brand" size="sm">
              {childDisplayName} • {t('profile.grade')} {activeChild?.grade_level}
            </Badge>
            <Badge variant="purple" size="sm">
              {isHi ? `प्रोफ़ाइल संस्करण v${activeSyllabus.version}` : `Profile Version v${activeSyllabus.version}`}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('scan.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
            {t('scan.subtitle')}
          </p>
        </div>
      </div>

      {/* Upload & Camera Box */}
      <Card className="p-6 sm:p-8 border-2 border-dashed border-indigo-200 bg-indigo-50/20 text-center hover:border-brand-500 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="max-w-md mx-auto">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-soft-sm cursor-pointer hover:scale-105 transition-transform"
          >
            {isScanning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              >
                <Camera className="w-8 h-8" />
              </motion.div>
            ) : (
              <UploadCloud className="w-8 h-8" />
            )}
          </div>

          <h3 className="text-base font-bold text-slate-800 mb-1">{t('scan.drag_drop')}</h3>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            {isHi
              ? 'पाठ्यपुस्तक विषय-सूची, कार्यपत्रक या परीक्षा समय-सारणी की फोटो (JPEG, PNG, PDF) चुनें।'
              : 'Upload JPEG, PNG or PDF of syllabus pages, textbook table of contents, or school exam circular.'}
          </p>

          {uploadedFileName && (
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{uploadedFileName}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              disabled={isScanning}
              aria-label="Scan Textbook Index"
              leftIcon={<Camera className="w-4 h-4" />}
              onClick={() => handleSimulateScan(false, 'NCERT_Textbook_Index.jpg')}
            >
              {isScanning
                ? t('scan.analyzing')
                : isHi
                ? 'पाठ्यपुस्तक विषय-सूची स्कैन करें'
                : 'Scan Textbook Index'}
            </Button>

            <Button
              variant="outline"
              size="md"
              disabled={isScanning}
              leftIcon={<HelpCircle className="w-4 h-4" />}
              onClick={() => handleSimulateScan(true, 'Combined_Term_Sheet.jpg')}
            >
              {isHi ? 'बहु-टर्म कार्यपत्रक स्कैन करें' : 'Scan Multi-Term Worksheet'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Clarifying Question Modal */}
      <AnimatePresence>
        {showClarification && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-amber-200"
            >
              <div className="flex items-center gap-2.5 text-amber-600 mb-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <h3 className="text-sm font-bold">{t('scan.clarifying_title')}</h3>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                {isHi ? (
                  <>
                    इस पृष्ठ स्कैन में <strong>CBSE टर्म 1</strong> और <strong>CBSE टर्म 2</strong> दोनों के अध्याय दिखाई दे रहे हैं। आप अभी किस परीक्षा की तैयारी कर रहे हैं?
                  </>
                ) : (
                  <>
                    We detected topics from both <strong>CBSE Term 1</strong> and <strong>CBSE Term 2</strong> in this page scan. Which examination are you currently preparing for?
                  </>
                )}
              </p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() =>
                    handleResolveClarification(
                      isHi ? 'टर्म 1 (मध्यावधि मूल्यांकन)' : 'Term 1 (Mid-Term Assessment)'
                    )
                  }
                  className="w-full text-left p-3 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 text-xs font-semibold text-slate-800 transition-all flex items-center justify-between"
                >
                  <span>
                    {isHi ? '1. टर्म 1 (मध्यावधि मूल्यांकन)' : '1. Term 1 (Mid-Term Assessment)'}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleResolveClarification(
                      isHi ? 'टर्म 2 (वार्षिक बोर्ड परीक्षा)' : 'Term 2 (Final Annual Examination)'
                    )
                  }
                  className="w-full text-left p-3 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 text-xs font-semibold text-slate-800 transition-all flex items-center justify-between"
                >
                  <span>
                    {isHi ? '2. टर्म 2 (वार्षिक बोर्ड परीक्षा)' : '2. Term 2 (Final Annual Examination)'}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Extracted & Editable Syllabus Profile */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">{t('scan.confirm_title')}</h2>
            <Badge variant="success" size="sm">
              {isHi
                ? `विश्वसनीयता: ${(confidence * 100).toFixed(0)}%`
                : `Confidence: ${(confidence * 100).toFixed(0)}%`}
            </Badge>
            <Badge variant="brand" size="sm">
              v{activeSyllabus.version}
            </Badge>
            {resolvedTerm && (
              <Badge variant="warning" size="sm">
                {resolvedTerm}
              </Badge>
            )}
          </div>
          <Button
            variant="accent"
            size="sm"
            leftIcon={<Save className="w-3.5 h-3.5" />}
            onClick={handleSaveProfile}
          >
            {isHi
              ? `संशोधन सहेजें (v${activeSyllabus.version + 1})`
              : `Save Syllabus Profile (v${activeSyllabus.version + 1})`}
          </Button>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center justify-between">
            <span className="font-semibold">
              {isHi
                ? `✓ ${childDisplayName} के लिए सिलेबस प्रोफ़ाइल (v${activeSyllabus.version}) सहेजी गई! दैनिक अध्ययन योजना अपडेट हो गई है।`
                : `✓ Syllabus profile (v${activeSyllabus.version}) saved for ${childDisplayName}! Day-wise study plan has been updated.`}
            </span>
            <Link href="/plan" className="font-bold underline flex items-center gap-1 shrink-0">
              <span>{isHi ? 'अध्ययन योजना देखें' : 'View Study Plan'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        <div className="space-y-3.5">
          {chapters.map((ch, cIdx) => {
            const displayTopics = isHi && ch.topics_hi?.length ? ch.topics_hi : ch.topics;
            return (
              <Card key={`${ch.subject}-${ch.number}`} className="p-4 sm:p-5 border border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <SubjectChip subject={ch.subject} />
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {isHi
                        ? `अध्याय ${ch.number}: ${ch.title_hi || ch.title}`
                        : `Chapter ${ch.number}: ${ch.title}`}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
                    ~{ch.weight} {isHi ? 'अंक भार' : 'Marks Weightage'}
                  </span>
                </div>

                {/* Editable Topics Chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {displayTopics.map((topicLabel, tIdx) => (
                    <span
                      key={`${topicLabel}-${tIdx}`}
                      className="inline-flex items-center gap-1.5 text-[11px] bg-slate-100 hover:bg-slate-200/70 text-slate-700 pl-2.5 pr-1.5 py-1 rounded-xl font-medium transition-colors"
                    >
                      <span>{topicLabel}</span>
                      <button
                        type="button"
                        aria-label={`Remove ${topicLabel}`}
                        onClick={() => handleRemoveTopic(cIdx, tIdx)}
                        className="text-slate-400 hover:text-rose-600 p-0.5 rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add / Correct Topic Input with Voice Mic */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <Edit3 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={newTopicInputs[cIdx] || ''}
                    onChange={(e) =>
                      setNewTopicInputs((prev) => ({ ...prev, [cIdx]: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddTopic(cIdx);
                    }}
                    placeholder={
                      isHi
                        ? 'अभिभावक/छात्र संशोधन: नया उप-विषय जोड़ें या बोलें...'
                        : 'Parent/Student correction: add or speak a custom sub-topic...'
                    }
                    className="flex-1 text-xs px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <VoiceMicButton
                    size="sm"
                    language={isHi ? 'hi-IN' : 'en-IN'}
                    onTranscript={(spoken) => handleAddTopic(cIdx, spoken)}
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    leftIcon={<Plus className="w-3 h-3" />}
                    onClick={() => handleAddTopic(cIdx)}
                  >
                    {isHi ? 'जोड़ें' : 'Add'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

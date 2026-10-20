'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SubjectChip } from '@/components/ui/SubjectChip';
import { VoiceMicButton } from '@/components/ui/VoiceMicButton';
import { CURATED_VIDEO_LIBRARY, rankAndFilterVideos } from '@/lib/videos';
import { Play, ShieldCheck, Clock, Search, AlertCircle } from 'lucide-react';

export default function CuratedVideosPage() {
  const { activeChild, t, locale } = useApp();
  const isHi = locale === 'hi';

  const [playingId, setPlayingId] = useState<string | null>(null);
  const [langFilter, setLangFilter] = useState<'all' | 'hi' | 'hinglish' | 'en'>('all');
  const [maxDuration, setMaxDuration] = useState<number | undefined>(undefined);
  const [searchTopic, setSearchTopic] = useState<string>('');

  const results = searchTopic.trim()
    ? rankAndFilterVideos({
        topic: searchTopic.trim(),
        language: langFilter,
        maxDurationMinutes: maxDuration,
      })
    : CURATED_VIDEO_LIBRARY.filter((v) => {
        if (langFilter !== 'all' && v.language !== langFilter) return false;
        if (maxDuration && v.duration_minutes > maxDuration) return false;
        return true;
      });

  const langBadgeLabel = (lang: string) => {
    if (lang === 'hi') return isHi ? 'हिंदी' : 'Hindi';
    if (lang === 'hinglish') return isHi ? 'हिंग्लिश' : 'Hinglish';
    return isHi ? 'अंग्रेज़ी' : 'English';
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="purple" size="sm">
            {isHi ? 'चयनित सुरक्षित लाइब्रेरी' : 'Curated Safe Library'}
          </Badge>
          <span className="text-xs text-slate-400">
            {isHi ? 'शून्य भटकाने वाले लिंक • टैप करने पर ही लोड' : 'Zero Distracting Links • Tap-to-Load'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('nav.videos')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
          {isHi
            ? `कक्षा ${activeChild?.grade_level || 9} के सिलेबस से मेल खाते प्रमाणित शैक्षिक वीडियो। ऑटो-प्ले और बाहरी विज्ञापन पूर्णतः बंद हैं।`
            : `Hand-picked educational lessons matched to Class ${activeChild?.grade_level || 9} syllabus. Tap to load with recommendations strictly disabled.`}
        </p>
      </div>

      {/* Filter & Voice Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-3xl border border-slate-100 shadow-soft-sm">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-4 h-4 text-slate-400 ml-1 shrink-0" />
          <input
            type="text"
            value={searchTopic}
            onChange={(e) => setSearchTopic(e.target.value)}
            placeholder={
              isHi
                ? 'विषय खोजें (उदा. Motion, Plants, Fractions)...'
                : 'Filter by topic (e.g. Motion, Plants, Fractions)...'
            }
            className="flex-1 text-xs sm:text-sm bg-transparent focus:outline-none text-slate-800"
          />
          <VoiceMicButton
            size="sm"
            language={isHi ? 'hi-IN' : 'en-IN'}
            onTranscript={(spoken) => setSearchTopic(spoken)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(['all', 'hinglish', 'hi', 'en'] as const).map((lf) => (
            <button
              key={lf}
              type="button"
              onClick={() => setLangFilter(lf)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                langFilter === lf
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lf === 'all'
                ? isHi
                  ? 'सभी भाषाएं'
                  : 'All Languages'
                : langBadgeLabel(lf)}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setMaxDuration(maxDuration ? undefined : 15)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
              maxDuration
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isHi ? '≤ 15 मिनट' : '≤ 15 Mins'}
          </button>
        </div>
      </div>

      {/* Embedded Player when video is selected */}
      {playingId && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video w-full"
        >
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${playingId}?autoplay=1&rel=0&modestbranding=1`}
            title="Curated Lesson"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      )}

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((vid) => {
          if (vid.pending_curation) {
            return (
              <Card key={vid.id} className="p-6 border-l-4 border-l-amber-500 col-span-full">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    {isHi ? 'समीक्षाधीन (Pending Human Curation)' : 'Pending Human Curation Guardrail'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {isHi ? vid.title_hi || vid.title : vid.title}
                </h3>
                <p className="text-xs text-slate-600">
                  {isHi
                    ? 'NetCyberAI कभी भी असत्यापित बाहरी यूट्यूब लिंक नहीं दिखाता। यह विषय हमारी शिक्षा टीम की समीक्षा कतार में दर्ज हो गया है।'
                    : 'NetCyberAI never shows unverified public YouTube links. This topic has been flagged for human educator curation.'}
                </p>
              </Card>
            );
          }

          const isPlaying = playingId === vid.youtube_id;
          return (
            <Card
              key={vid.id}
              hoverEffect
              className={`overflow-hidden border border-slate-100 ${
                isPlaying ? 'ring-2 ring-brand-500' : ''
              }`}
            >
              {/* Thumbnail Container */}
              <div
                className="relative aspect-video bg-slate-900 cursor-pointer group"
                onClick={() => setPlayingId(vid.youtube_id)}
              >
                <img
                  src={vid.thumbnail_url}
                  alt={vid.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-white/95 text-brand-600 flex items-center justify-center shadow-lg shadow-black/30"
                  >
                    <Play className="w-5 h-5 fill-brand-600 ml-0.5" />
                  </motion.div>
                </div>

                {/* Duration Chip */}
                <span className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {vid.duration_minutes} {isHi ? 'मिनट' : 'mins'}
                </span>

                {/* Language Chip */}
                <span className="absolute top-2.5 left-2.5 bg-brand-600/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {langBadgeLabel(vid.language)}
                </span>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <SubjectChip subject={vid.subject} size="sm" />
                    <span className="text-xs font-semibold text-slate-700">{vid.channel}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">
                    {isHi ? `कक्षा ${vid.grade_level}` : `Class ${vid.grade_level}`}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-3 leading-snug">
                  {isHi && vid.title_hi ? vid.title_hi : vid.title}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {isHi ? `सत्यापित: ${vid.verified_on}` : `Verified on ${vid.verified_on}`}
                  </span>

                  <button
                    type="button"
                    onClick={() => setPlayingId(vid.youtube_id)}
                    className="font-bold text-brand-600 hover:text-brand-700"
                  >
                    {isPlaying
                      ? isHi
                        ? 'चल रहा है'
                        : 'Now Playing'
                      : isHi
                      ? 'ऐप में देखें'
                      : 'Watch in App'}
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

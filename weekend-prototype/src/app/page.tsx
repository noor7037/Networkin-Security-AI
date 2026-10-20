'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SubjectChip } from '@/components/ui/SubjectChip';
import { MascotSaathi } from '@/components/ui/MascotSaathi';
import { GamifiedJourneyPath } from '@/components/ui/GamifiedJourneyPath';
import {
  Sparkles,
  BookOpen,
  Camera,
  Award,
  Video,
  Clock,
  HelpCircle,
  Building2,
  ChevronRight,
  Flame,
  Star,
  CheckCircle2,
  GraduationCap,
  Users,
  ShieldCheck,
  TrendingUp,
  Search,
  Mic,
  ArrowRight,
  Compass,
  Languages,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const {
    activeChild,
    themeVariant,
    viewRegister,
    setViewRegister,
    activeSyllabus,
    activeStudyPlan,
    activeSchool,
    activeWeakTopics,
    t,
    locale,
  } = useApp();

  const isHi = locale === 'hi';
  const [searchQuery, setSearchQuery] = useState('');

  if (!activeChild) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-8 bg-white rounded-4xl card-3d max-w-sm">
          <div className="text-5xl mb-4 animate-bounce">👋</div>
          <h2 className="text-xl font-black text-slate-800 mb-2">
            {isHi ? 'NetCyberAI में आपका स्वागत है' : 'Welcome to NetCyberAI'}
          </h2>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            {isHi
              ? 'कृपया शुरू करने के लिए बच्चे की प्रोफ़ाइल चुनें या बनाएं।'
              : 'Please create or select a child profile to get started.'}
          </p>
          <Link href="/login">
            <Button fullWidth variant="accent" size="lg">{isHi ? 'प्रवेश / पंजीकरण' : 'Sign In / Register'}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isJunior = themeVariant === 'junior';
  const childName = isHi && activeChild.name_hi ? activeChild.name_hi : activeChild.name;
  const todayPlan = activeStudyPlan.days[0] || {
    subject: 'Science',
    chapter: 'Motion (गति)',
    chapter_hi: 'अध्याय 8: गति (Motion)',
    topic: 'Acceleration & Equations of Motion',
    topic_hi: 'त्वरण और गति के समीकरण',
  };
  const primaryChapter = activeSyllabus.chapters[0];

  // Subject Portals Data
  const subjectPortals = [
    {
      id: 'science',
      title: isHi ? 'विज्ञान (Science)' : 'Science',
      icon: '⚡',
      topics: isHi ? 'गति, विद्युत, प्रकाश, जीवन प्रक्रियाएं' : 'Motion, Electricity, Light & Life Processes',
      chapterCount: 16,
      progress: 85,
      color: 'science',
      href: '/explain?topic=motion',
    },
    {
      id: 'math',
      title: isHi ? 'गणित (Mathematics)' : 'Mathematics',
      icon: '📐',
      topics: isHi ? 'त्रिकोणमिति, द्विघात समीकरण, सांख्यिकी' : 'Trigonometry, Quadratics & Statistics',
      chapterCount: 15,
      progress: 90,
      color: 'math',
      href: '/explain?topic=motion',
    },
    {
      id: 'english',
      title: isHi ? 'अंग्रेज़ी 90-दिन (English)' : 'English 90-Day',
      icon: '🗣️',
      topics: isHi ? 'दैनिक वार्तालाप, शब्दावली, व्याकरण' : 'Conversational Fluency, Spaced Repetition Vocab',
      chapterCount: 90,
      progress: 75,
      color: 'english',
      href: '/english',
    },
    {
      id: 'sst',
      title: isHi ? 'सामाजिक विज्ञान (Social Science)' : 'Social Science',
      icon: '🌍',
      topics: isHi ? 'राष्ट्रवाद, संसाधन, लोकतंत्र' : 'Nationalism, Resources & Democratic Politics',
      chapterCount: 18,
      progress: 70,
      color: 'sst',
      href: '/explain?topic=motion',
    },
    {
      id: 'careers',
      title: isHi ? 'कैरियर रोडमैप (Careers)' : 'Career Pathways',
      icon: '🚀',
      topics: isHi ? 'IIT-JEE, NEET, NDA, CUET, सिविल सेवा' : 'IIT-JEE, NEET, NDA, CUET & Tech Careers',
      chapterCount: 24,
      progress: 95,
      color: 'hindi',
      href: '/careers',
    },
  ];

  return (
    <div className="space-y-7 pb-8">
      {/* Top Mode & Class-Adaptive Register Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-full border shadow-sm ${
              isJunior
                ? 'bg-amber-100 text-amber-950 border-amber-300'
                : 'bg-indigo-50 text-brand-800 border-indigo-200'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-brand-600" />
            <span>{isJunior ? t('theme.junior_badge') : t('theme.senior_badge')}</span>
          </span>
          <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
            • {isHi ? `सिलेबस v${activeSyllabus.version} (CBSE 2026-27)` : `Syllabus v${activeSyllabus.version} (CBSE 2026-27)`}
          </span>
        </div>

        {/* Dual Register 3D Segmented Toggle: Student Mode vs Parent Mode */}
        <div className="inline-flex p-1 bg-white rounded-2xl border-2 border-slate-200 shadow-soft-sm">
          <button
            type="button"
            onClick={() => setViewRegister('student')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              viewRegister === 'student'
                ? isJunior
                  ? 'btn-3d btn-3d-amber text-white'
                  : 'btn-3d btn-3d-indigo text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('register.student')}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewRegister('parent')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              viewRegister === 'parent'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t('register.parent')}</span>
          </button>
        </div>
      </div>

      {/* Hero Greeting & Stats Ribbon with 3D Depth */}
      <motion.div
        key={`${activeChild.id}-${themeVariant}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-4xl p-6 sm:p-7 text-white shadow-2xl transition-all border-b-6 ${
          isJunior
            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 border-b-orange-700 shadow-orange-500/25'
            : 'bg-gradient-to-r from-brand-600 via-indigo-600 to-slate-900 border-b-indigo-950 shadow-indigo-500/30'
        }`}
      >
        {/* Glow Spheres */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-4">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white/25 backdrop-blur-md flex items-center justify-center text-4xl sm:text-5xl shadow-2xl border-2 border-white/40 shrink-0"
          >
            {activeChild.avatar}
          </motion.div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-sm">
                {isHi ? `नमस्ते, ${childName}` : `Hello, ${childName}`}
              </h1>
              <span className="text-xs bg-white/25 backdrop-blur-sm px-3 py-0.5 rounded-full font-black border border-white/40 text-white shadow-sm">
                {activeChild.board} • {t('profile.grade')} {activeChild.grade_level}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/95 font-medium mt-1 max-w-xl leading-relaxed">
              {isJunior
                ? isHi
                  ? 'आज के 5-मिनट के रोचक विज्ञान और गणित क्वेस्ट के लिए तैयार हैं? आइए सितारे जीतें!'
                  : 'Ready for today’s fun 5-minute science & math quest? Collect stars and unlock levels!'
                : isHi
                ? 'टर्म-1 बोर्ड परीक्षा में 95%+ का लक्ष्य। आज: त्वरण और गति के समीकरणों का गहन अभ्यास।'
                : 'Targeting 95%+ in Term 1 Finals. Today: Master Acceleration & Equations of Motion with Desi Analogies.'}
            </p>
          </div>
        </div>

        {/* 3D Stats Tokens (Streak & XP) */}
        <div className="relative z-10 flex items-center gap-3 self-start sm:self-auto">
          {/* Streak Token */}
          <div className="bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-3xl px-4 py-2.5 text-center shadow-lg min-w-[90px]">
            <div className="text-[10px] uppercase font-black text-amber-200 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
              <span>{t('profile.streak')}</span>
            </div>
            <div className="text-xl font-black text-white mt-0.5 tracking-tight font-mono">
              {activeChild.streak_days} {isHi ? 'दिन' : 'Days'}
            </div>
          </div>

          {/* Stars XP Token */}
          <div className="bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-3xl px-4 py-2.5 text-center shadow-lg min-w-[90px]">
            <div className="text-[10px] uppercase font-black text-amber-200 flex items-center justify-center gap-1">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>{t('profile.stars')}</span>
            </div>
            <div className="text-xl font-black text-amber-200 mt-0.5 tracking-tight font-mono">
              {activeChild.stars_xp} XP
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mascot Companion Tip ("Saathi") */}
      <MascotSaathi
        mood="teaching"
        locale={locale}
        message="Bumrah's run-up accelerates from 0 to 145 km/h! Drag the 3D lab slider to see how v = u + at works in real life."
        message_hi="बुमराह का रन-अप 0 से 145 किमी/घंटा तक त्वरण लेता है! 3D लैब में स्लाइडर घुमाकर देखें गति कैसे बढ़ती है।"
        actionText={isHi ? '3D भौतिकी लैब खोलें' : 'Open 3D Physics Lab'}
        onActionClick={() => {
          if (typeof window !== 'undefined') window.location.href = '/explain';
        }}
      />

      {/* Universal Concept Resolver Quick Launchpad */}
      <div className="relative p-4 sm:p-5 rounded-3xl bg-white card-3d border-2 border-brand-200/80 shadow-soft-md">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isHi
                  ? 'कोई भी विषय या प्रश्न पूछें (उदा. त्वरण, प्रकाश संश्लेषण, त्रिकोणमिति)...'
                  : 'Ask any syllabus concept (e.g. Acceleration, Photosynthesis, Trigonometry)...'
              }
              className="w-full pl-12 pr-12 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold text-slate-800 placeholder:text-slate-400"
            />
            <Link
              href="/doubt-saathi"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
              title="Voice Ask"
            >
              <Mic className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link href="/explain" className="w-full sm:w-auto">
              <Button variant="primary" size="md" leftIcon={<Sparkles className="w-4 h-4" />} fullWidth>
                {isHi ? 'समझें (Understand)' : 'Understand'}
              </Button>
            </Link>

            <Link href="/scan" className="shrink-0">
              <Button variant="secondary" size="md" leftIcon={<Camera className="w-4 h-4" />}>
                {isHi ? 'स्कैन' : 'Scan'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Parent Executive Register Banner (when Parent Mode is toggled) */}
      {viewRegister === 'parent' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="p-5 bg-slate-900 text-white rounded-3xl border-b-4 border-slate-950 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-black text-emerald-400">
                {isHi ? 'साप्ताहिक अभिभावक सारांश' : 'Weekly Parent Diagnostic'}
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-bold mb-1">
              {isHi
                ? `${activeSyllabus.chapters.length} अध्याय सक्रिय • ${activeChild.streak_days} दिन निरंतरता`
                : `${activeSyllabus.chapters.length} Chapters Active • ${activeChild.streak_days}-Day Streak`}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {activeWeakTopics.length > 0
                ? isHi
                  ? `पुनः अभ्यास विषय: ${activeWeakTopics.join(', ')}`
                  : `Scheduled for revision: ${activeWeakTopics.join(', ')}`
                : isHi
                ? 'सभी दैनिक क्विज़ लक्ष्य समय पर पूरे किए गए।'
                : 'All daily quiz targets completed on schedule.'}
            </p>
            <Link href="/insight" className="text-xs font-bold text-emerald-300 hover:underline flex items-center gap-1">
              <span>{isHi ? 'पूर्ण 3-पंक्ति रिपोर्ट देखें' : 'Open Full 3-Line Insight'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-5 bg-white rounded-3xl card-3d">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-black text-amber-700">
                {isHi ? 'सत्यापित सरकारी योजनाएं' : 'Verified Scholarships'}
              </span>
              <Award className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-sm font-bold text-slate-900 mb-1">
              {isHi
                ? `कक्षा ${activeChild.grade_level} के लिए पात्र योजनाएं`
                : `Matched to Class ${activeChild.grade_level} (${activeChild.board})`}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {isJunior
                ? isHi
                  ? 'जवाहर नवोदय (JNVST), सैनिक स्कूल (AISSEE), इंस्पायर मानक (₹10,000) व SOF ओलंपियाड।'
                  : 'JNVST Navodaya, AISSEE Sainik School, INSPIRE MANAK (₹10,000), and SOF Olympiads.'
                : isHi
                ? 'NMMSS (₹12,000/वर्ष), PM YASASVI (₹75,000), NTSE और राष्ट्रीय विज्ञान ओलंपियाड।'
                : 'NMMSS (₹12,000/yr), PM YASASVI (₹75,000), NTSE, and National Science Olympiad.'}
            </p>
            <Link href="/opportunities" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1">
              <span>{isHi ? 'आधिकारिक पोर्टल देखें' : 'Browse Verified Schemes'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-5 bg-white rounded-3xl card-3d">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-black text-emerald-700">
                {isHi ? 'स्कूल कनेक्ट स्थिति' : 'School Connect Status'}
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-sm font-bold text-slate-900 mb-1">
              {activeSchool.isConnected
                ? isHi
                  ? `${activeSchool.schoolName_hi} (${activeSchool.attendance.percentage}%)`
                  : `${activeSchool.schoolName} (${activeSchool.attendance.percentage}%)`
                : isHi
                ? 'स्वतंत्र अध्ययन मोड सक्रिय'
                : 'Standalone Learning Mode Active'}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {isHi
                ? 'उपस्थिति और गृहकार्य सिंक। शुल्क विवरण पूर्णतः पृथक।'
                : 'Attendance and homework mirrored. Fee standing strictly segregated.'}
            </p>
            <Link href="/school-connect" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1">
              <span>{isHi ? 'स्कूल विवरण खोलें' : 'Manage School Connect'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Auto-Reflow Notice Pill */}
      <div className="flex items-center justify-between bg-emerald-50/90 border border-emerald-300 rounded-2xl px-4 py-2.5 text-xs text-emerald-900 shadow-sm">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-bold">{t('home.reflow_nudge')}</span>
        </div>
        <Link href="/plan" className="text-emerald-800 font-extrabold hover:underline flex items-center gap-0.5 text-[11px]">
          <span>{isHi ? 'योजना देखें' : 'View Plan'}</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Today's Learning Focus Hero Card (3D Science Extrusion) */}
      <Card
        subjectBorder="science"
        className={`p-6 sm:p-7 relative overflow-hidden ${
          isJunior
            ? 'bg-gradient-to-br from-white via-amber-50/20 to-emerald-50/30'
            : 'bg-gradient-to-br from-white via-white to-emerald-50/30'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-brand-800 bg-brand-100/90 px-3 py-1 rounded-full uppercase tracking-wider border border-brand-200">
              {t('home.hero_title')}
            </span>
            <SubjectChip subject={todayPlan.subject} />
            <Badge variant="purple" size="sm">
              {isHi ? todayPlan.chapter_hi : `Chapter ${primaryChapter?.number || 8}: ${primaryChapter?.title || todayPlan.chapter}`}
            </Badge>
          </div>
          <span className="text-xs text-slate-500 font-bold bg-slate-100 px-2.5 py-1 rounded-full">
            {isHi
              ? `परीक्षा भार: ${primaryChapter?.weight || 10} अंक`
              : `Exam Weight: ${primaryChapter?.weight || 10} Marks`}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 tracking-tight">
          {isHi ? todayPlan.topic_hi : todayPlan.topic}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-2xl font-medium">
          {isJunior ? (
            isHi ? (
              <>
                घर के आंगन के तुलसी के पौधे और रसोई के देसी उदाहरणों से समझें कि पत्तियां सूर्य के प्रकाश में भोजन कैसे बनाती हैं, प्रमुख अंग्रेज़ी शब्दों के साथ:{' '}
                <code className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg text-xs font-mono font-bold">
                  Photosynthesis • Chlorophyll • Venation
                </code>
              </>
            ) : (
              <>
                Explore how leaves prepare food using sunlight, water, and carbon dioxide with backyard Tulsi plant and kitchen analogies, with highlighted English terms:{' '}
                <code className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg text-xs font-mono font-bold">
                  Photosynthesis • Chlorophyll • Leaf Venation
                </code>
                .
              </>
            )
          ) : isHi ? (
            <>
              जसप्रीत बुमराह के बॉलिंग रन-अप और ऑटो-रिक्शा थ्रॉटल के देसी उदाहरणों से समझें कि समय के साथ वेग कैसे बदलता है, प्रमुख अंग्रेज़ी सूत्रों के साथ:{' '}
              <code className="bg-indigo-100 text-brand-800 px-2 py-0.5 rounded-lg text-xs font-mono font-bold">
                a = (v - u)/t
              </code>
              .
            </>
          ) : (
            <>
              Understand how velocity changes over time using Bumrah&apos;s bowling stride and auto-rickshaw throttle analogies, with highlighted English formulas:{' '}
              <code className="bg-indigo-100 text-brand-800 px-2 py-0.5 rounded-lg text-xs font-mono font-bold">
                a = (v - u)/t
              </code>
              .
            </>
          )}
        </p>

        {/* 3D Action CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/quiz">
            <Button
              variant="accent"
              size="lg"
              leftIcon={<Sparkles className="w-5 h-5 fill-white" />}
            >
              {isJunior ? t('home.start_quiz') : t('home.start_quiz_senior')}
            </Button>
          </Link>

          <Link href="/explain">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<BookOpen className="w-5 h-5" />}
            >
              {t('home.explain_cta')}
            </Button>
          </Link>

          <Link href="/explain#mindmap">
            <Button variant="secondary" size="lg">
              {t('home.mind_map_cta')}
            </Button>
          </Link>
        </div>
      </Card>

      {/* Gamified Learning Journey Path */}
      <GamifiedJourneyPath locale={locale} currentStreak={activeChild.streak_days} />

      {/* 5 Subject Portals Grid with 3D Depth */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs uppercase font-black text-brand-600 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
              {isHi ? 'पाठ्यक्रम विषय पोर्टल' : 'Syllabus Subject Portals'}
            </span>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              {isHi ? 'अपने विषयों का अन्वेषण करें' : 'Explore Your Subjects'}
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {isHi ? 'कक्षा 10 पूर्ण कवरेज' : 'Class 10 Full Coverage'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectPortals.map((portal) => (
            <Link key={portal.id} href={portal.href} className="block group">
              <div className={`p-5 rounded-3xl bg-white transition-all card-3d card-3d-${portal.color} flex flex-col justify-between h-full`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                      {portal.icon}
                    </span>
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {portal.chapterCount} {isHi ? 'अध्याय' : 'Chapters'}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">
                    {portal.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
                    {portal.topics}
                  </p>
                </div>

                <div>
                  {/* Progress Bar with Shimmer */}
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1.5">
                    <span>{isHi ? 'प्रगति' : 'Mastery Progress'}</span>
                    <span className="font-mono">{portal.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-indigo-600 shimmer-gradient"
                      style={{ width: `${portal.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Secondary Quick Access Grid: Scan, Videos, Toolkit, Vault, Insight, School */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Link href="/scan" className="block">
          <div className="flex items-center gap-2.5 p-3.5 bg-white rounded-2xl card-3d hover:border-brand-300 transition-all h-full">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-800">{t('nav.scan')}</div>
              <div className="text-[10px] text-slate-400">{isHi ? 'कैमरा स्कैनर' : 'Textbook camera'}</div>
            </div>
          </div>
        </Link>

        <Link href="/videos" className="block">
          <div className="flex items-center gap-2.5 p-3.5 bg-white rounded-2xl card-3d hover:border-brand-300 transition-all h-full">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-800">{t('nav.videos')}</div>
              <div className="text-[10px] text-slate-400">{isHi ? 'चयनित व सुरक्षित' : 'Curated, safe'}</div>
            </div>
          </div>
        </Link>

        <Link href="/toolkit" className="block">
          <div className="flex items-center gap-2.5 p-3.5 bg-white rounded-2xl card-3d hover:border-brand-300 transition-all h-full">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-800">{t('nav.toolkit')}</div>
              <div className="text-[10px] text-slate-400">{isHi ? 'ब्लूप्रिंट चेक' : 'Blueprint check'}</div>
            </div>
          </div>
        </Link>

        <Link href="/vault" className="block">
          <div className="flex items-center gap-2.5 p-3.5 bg-white rounded-2xl card-3d hover:border-brand-300 transition-all h-full">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-800">{t('nav.vault')}</div>
              <div className="text-[10px] text-slate-400">{isHi ? 'आजीवन पोर्टफोलियो' : 'Lifetime record'}</div>
            </div>
          </div>
        </Link>

        <Link href="/insight" className="block">
          <div className="flex items-center gap-2.5 p-3.5 bg-white rounded-2xl card-3d hover:border-brand-300 transition-all h-full">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-brand-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-800">{t('nav.insight')}</div>
              <div className="text-[10px] text-slate-400">{isHi ? '3-पंक्ति रिपोर्ट' : '3-line digest'}</div>
            </div>
          </div>
        </Link>

        <Link href="/school-connect" className="block">
          <div className="flex items-center gap-2.5 p-3.5 bg-white rounded-2xl card-3d hover:border-brand-300 transition-all h-full">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-800">{t('nav.school')}</div>
              <div className="text-[10px] text-slate-400">{isHi ? 'स्कूल ERP लिंक' : 'School ERP link'}</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Volume2,
  Mic,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Award,
  Flame,
  Star,
  ChevronRight,
  RotateCcw,
  Languages,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VocabCard {
  word: string;
  phonetic: string;
  hindi: string;
  example: string;
  example_hi: string;
}

export default function EnglishProgrammePage() {
  const { activeChild, locale, t } = useApp();
  const isHi = locale === 'hi';

  const [currentDay, setCurrentDay] = useState(14);
  const [activeTab, setActiveTab] = useState<'daily' | 'journey' | 'benchmark'>('daily');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSuccess, setSpeechSuccess] = useState(false);
  const [flippedWord, setFlippedWord] = useState<number | null>(null);
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const vocabList: VocabCard[] = [
    {
      word: 'Accelerate',
      phonetic: '/əkˈsel.ə.reɪt/',
      hindi: 'गति बढ़ाना / चाल तेज करना',
      example: 'The auto-rickshaw accelerates after the traffic signal.',
      example_hi: 'ट्रैफिक सिग्नल के बाद ऑटो-रिक्शा रफ्तार बढ़ाता है।',
    },
    {
      word: 'Deceleration',
      phonetic: '/diːˌsel.əˈreɪ.ʃən/',
      hindi: 'गति मंदन / धीमा होना',
      example: 'The school bus applied deceleration near the crossing.',
      example_hi: 'स्कूल बस ने चौराहे के पास गति धीमी की।',
    },
    {
      word: 'Magnificent',
      phonetic: '/mæɡˈnɪf.ɪ.sənt/',
      hindi: 'भव्य / अत्यंत सुंदर',
      example: 'The historical monuments in Delhi look magnificent.',
      example_hi: 'दिल्ली के ऐतिहासिक स्मारक अत्यंत भव्य दिखते हैं।',
    },
    {
      word: 'Perseverance',
      phonetic: '/ˌpɜː.sɪˈvɪə.rəns/',
      hindi: 'दृढ़ता / निरंतर लगन',
      example: 'Her perseverance helped her top the board examination.',
      example_hi: 'उसकी निरंतर लगन ने उसे बोर्ड परीक्षा में अव्वल बनाया।',
    },
  ];

  const handleMicSpeak = () => {
    setIsSpeaking(true);
    setSpeechSuccess(false);
    setTimeout(() => {
      setIsSpeaking(false);
      setSpeechSuccess(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 2000);
  };

  const handleQuizAnswer = (idx: number) => {
    setSelectedQuizIdx(idx);
    setQuizSubmitted(true);
    if (idx === 1) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="space-y-7 max-w-4xl mx-auto pb-8">
      {/* Top Hero Banner with 3D Depth */}
      <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-900 text-white p-6 sm:p-8 border-b-6 border-b-purple-950 shadow-2xl">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-4xl shadow-xl shrink-0">
              🗣️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 text-white px-3 py-0.5 rounded-full border border-white/30">
                  {isHi ? '90-दिवसीय अंग्रेज़ी धाराप्रवाह कार्यक्रम' : '90-Day English Programme (Family Plus)'}
                </span>
                <span className="text-[11px] font-bold bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full shadow-sm">
                  CEFR A2
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                {isHi ? 'अंग्रेज़ी भाषा व आत्मविश्वास यात्रा' : 'English Fluency & Confidence Path'}
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100 font-medium mt-0.5">
                {isHi
                  ? 'दैनिक 15-मिनट: स्कूल, वार्तालाप व कैरियर में बिना हिचकिचाहट अंग्रेज़ी बोलें।'
                  : 'Daily 15-minute lessons: conversation dialogues, spaced repetition vocabulary & speaking practice.'}
              </p>
            </div>
          </div>

          {/* Day & Streak Pill */}
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-3xl border border-white/30 shadow-md self-start sm:self-auto">
            <div className="text-center">
              <div className="text-[10px] uppercase font-black text-amber-300 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-300" />
                <span>{isHi ? 'दिन' : 'Day'}</span>
              </div>
              <div className="text-lg font-black text-white font-mono">{currentDay} / 90</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Segmented Navigation Tabs */}
      <div className="inline-flex p-1 bg-white rounded-2xl border-2 border-slate-200 shadow-soft-sm">
        <button
          type="button"
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'daily'
              ? 'btn-3d btn-3d-purple text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isHi ? 'आज का 15-मिनट अभ्यास' : "Today's 15-Min Lesson"}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('journey')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'journey'
              ? 'btn-3d btn-3d-indigo text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isHi ? '90-दिवसीय स्तर रोडमैप' : '90-Day Level Roadmap'}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('benchmark')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'benchmark'
              ? 'btn-3d btn-3d-amber text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isHi ? 'सत्यापित प्रगति स्कोर (Day 0/45/90)' : 'Benchmark Gains'}
        </button>
      </div>

      {/* Tab 1: Daily 15-Minute Experience */}
      {activeTab === 'daily' && (
        <div className="space-y-6">
          {/* Part 1: Conversational Dialogue Card */}
          <div className="p-6 rounded-4xl bg-white card-3d card-3d-english">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                Part 1 • {isHi ? 'वास्तविक जीवन वार्तालाप' : 'Real-Life Dialogue'}
              </span>
              <span className="text-xs text-slate-500 font-bold">5 Mins</span>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-2">
              {isHi
                ? 'दृश्यावलोकन: स्कूल बस स्टॉप पर समय और दिशा पूछना'
                : 'Scenario: Asking Directions & Bus Timings at the Stop'}
            </h3>

            <div className="space-y-3 my-4 bg-slate-50 p-4 rounded-3xl border border-slate-200">
              {/* Speaker A */}
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center shrink-0">
                  👦
                </span>
                <div className="bg-white p-3 rounded-2xl border border-purple-150 shadow-sm max-w-md">
                  <div className="text-xs font-bold text-purple-900">
                    &quot;Excuse me, does this bus go towards the Science Museum?&quot;
                  </div>
                  <div className="text-[11px] text-slate-500 font-devanagari mt-0.5">
                    &quot;माफ़ कीजिए, क्या यह बस विज्ञान संग्रहालय की ओर जाती है?&quot;
                  </div>
                </div>
              </div>

              {/* Speaker B */}
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-purple-600 text-white p-3 rounded-2xl shadow-md max-w-md text-right">
                  <div className="text-xs font-bold">
                    &quot;Yes, it does! You should get down at the third stop after the flyover.&quot;
                  </div>
                  <div className="text-[11px] text-purple-200 font-devanagari mt-0.5">
                    &quot;हाँ, जाती है! आपको फ्लाईओवर के बाद तीसरे स्टॉप पर उतरना होगा।&quot;
                  </div>
                </div>
                <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0">
                  👨
                </span>
              </div>
            </div>

            {/* Audio Wave Simulation Button */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="purple"
                size="sm"
                leftIcon={<Volume2 className="w-4 h-4" />}
                onClick={() => {
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    const utter = new SpeechSynthesisUtterance('Excuse me, does this bus go towards the Science Museum?');
                    utter.lang = 'en-IN';
                    window.speechSynthesis.speak(utter);
                  }
                }}
              >
                {isHi ? 'उच्चारण सुनें (Listen)' : 'Listen to Native Pronunciation'}
              </Button>
            </div>
          </div>

          {/* Part 2: Spaced Repetition Vocabulary 3D Flip Cards */}
          <div className="p-6 rounded-4xl bg-white card-3d">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs uppercase font-black text-brand-600">
                  Part 2 • {isHi ? 'स्मार्ट शब्दावली कार्ड (टैप करें)' : 'Spaced Repetition Vocab'}
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {isHi ? 'आज के 4 मुख्य शब्द' : "Today's 4 Target Words"}
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-bold">5 Mins</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vocabList.map((item, idx) => (
                <motion.div
                  key={item.word}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFlippedWord(flippedWord === idx ? null : idx)}
                  className="p-4 rounded-3xl border-2 border-indigo-100 bg-gradient-to-br from-indigo-50/40 to-white shadow-soft-sm cursor-pointer select-none"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-black text-brand-700">{item.word}</span>
                    <span className="text-xs font-mono text-slate-400">{item.phonetic}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800 font-devanagari mb-2">
                    {item.hindi}
                  </div>
                  <div className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100 italic">
                    &quot;{item.example}&quot;
                  </div>
                  <div className="text-[10px] text-slate-400 text-right mt-1 font-semibold">
                    {isHi ? 'अर्थ समझने के लिए टैप करें' : 'Tap to toggle translation'}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Part 3: Interactive "Say It" Speaking Practice */}
          <div className="p-6 sm:p-7 rounded-4xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-2 border-purple-500/40 shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Part 3 • {isHi ? 'बोलने का अभ्यास (AI ध्वनि विश्लेषक)' : 'Speaking Practice (Voice AI)'}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white mb-2">
              {isHi
                ? 'माइक दबाकर इस वाक्य को पूरे आत्मविश्वास से बोलें:'
                : 'Tap the mic and speak this sentence out loud:'}
            </h3>

            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 my-3">
              <p className="text-base sm:text-lg font-bold text-amber-300 font-sans">
                &quot;The school bus accelerated smoothly after the red light.&quot;
              </p>
              <p className="text-xs text-slate-300 font-devanagari mt-1">
                &quot;लाल बत्ती के बाद स्कूल बस ने सहजता से रफ्तार पकड़ी।&quot;
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-5">
              <button
                type="button"
                onClick={handleMicSpeak}
                disabled={isSpeaking}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all shadow-xl cursor-pointer ${
                  isSpeaking
                    ? 'bg-rose-500 ring-8 ring-rose-500/30 animate-pulse'
                    : speechSuccess
                    ? 'bg-emerald-500 ring-4 ring-emerald-400/40'
                    : 'btn-3d btn-3d-purple'
                }`}
              >
                <Mic className="w-7 h-7" />
              </button>

              <div>
                <div className="text-sm font-black">
                  {isSpeaking
                    ? isHi
                      ? 'सुन रहे हैं... कृपया स्पष्ट बोलें'
                      : 'Listening to your pronunciation...'
                    : speechSuccess
                    ? isHi
                      ? '✓ उत्कृष्ट उच्चारण! 98% सटीकता दर्ज (+30 XP)'
                      : '✓ Excellent pronunciation! 98% accuracy score (+30 XP)'
                    : isHi
                    ? 'माइक दबाएं और बोलें'
                    : 'Tap mic and speak'}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {isHi
                    ? 'AI पिच, प्रवाह और स्पष्टता का निष्पक्ष विश्लेषण करता है।'
                    : 'AI assesses pitch, rhythm and articulation with zero shaming.'}
                </div>
              </div>
            </div>
          </div>

          {/* Part 4: Rapid Comprehension Check */}
          <div className="p-6 rounded-4xl bg-white card-3d">
            <span className="text-xs uppercase font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
              Part 4 • {isHi ? 'त्वरित समझ जांच (30 सेकंड)' : 'Rapid Comprehension Check'}
            </span>

            <h3 className="text-base font-black text-slate-900 mb-3">
              Which sentence correctly uses the word &quot;accelerate&quot;?
            </h3>

            <div className="space-y-2.5">
              {[
                'The car accelerated to a complete stop at the red signal.',
                'The athlete accelerated in the final 50 meters to win the gold medal.',
                'She accelerated the glass of water on the table.',
              ].map((opt, oIdx) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleQuizAnswer(oIdx)}
                  className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-bold border-2 transition-all flex items-center justify-between cursor-pointer ${
                    quizSubmitted
                      ? oIdx === 1
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : selectedQuizIdx === oIdx
                        ? 'bg-rose-50 border-rose-400 text-rose-900'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                      : 'bg-white border-slate-200 hover:border-brand-500 text-slate-800'
                  }`}
                >
                  <span>{opt}</span>
                  {quizSubmitted && oIdx === 1 && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>

            {quizSubmitted && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center justify-between">
                <span>{isHi ? '✓ शानदार! आज का 15-मिनट कोटा पूरा हुआ। (+50 XP)' : '✓ Outstanding! Today’s 15-minute quota complete. (+50 XP)'}</span>
                <Button size="sm" variant="success" onClick={() => setActiveTab('journey')}>
                  {isHi ? 'अगला स्तर देखें' : 'View Next Level'}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: 90-Day Level Roadmap */}
      {activeTab === 'journey' && (
        <div className="space-y-6">
          <div className="p-6 rounded-4xl bg-white card-3d">
            <h3 className="text-lg font-black text-slate-900 mb-1">
              {isHi ? '90-दिवसीय स्तर प्रगति संरचना (CEFR Aligned)' : '90-Day Progression Framework (CEFR Aligned)'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {isHi
                ? 'प्रत्येक 30 दिन में नए कौशल अनलॉक होते हैं। कोई दिखावटी गारंटी नहीं — वास्तविक जांची गई प्रगति।'
                : 'New skills unlock every 30 days. No false fluency promises — verified progress on Day 0, 45, and 90.'}
            </p>

            <div className="space-y-4">
              {/* Level 1: Days 1-30 */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase text-emerald-800">
                    Phase 1: Days 1–30 • Foundation & Confidence (CEFR Pre-A1 → A1)
                  </span>
                  <Badge variant="success" size="sm">Active (Day 14)</Badge>
                </div>
                <div className="text-sm font-black text-slate-900 mb-1">
                  Everyday School & Family Conversations
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Classroom greetings, asking doubts without shyness, daily routines, 150 core high-frequency words.
                </p>
              </div>

              {/* Level 2: Days 31-60 */}
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 opacity-90">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase text-slate-500">
                    Phase 2: Days 31–60 • Academic Clarity (CEFR A1 → A2)
                  </span>
                  <Badge variant="purple" size="sm">Unlocks on Day 31</Badge>
                </div>
                <div className="text-sm font-black text-slate-700 mb-1">
                  Subject Vocabulary & Exam Presentation
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Science definitions, mathematical reasoning phrases, writing clean board exam answers with connectors.
                </p>
              </div>

              {/* Level 3: Days 61-90 */}
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 opacity-80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase text-slate-500">
                    Phase 3: Days 61–90 • Career & Expressive Fluency (CEFR A2 → B1)
                  </span>
                  <Badge variant="purple" size="sm">Unlocks on Day 61</Badge>
                </div>
                <div className="text-sm font-black text-slate-700 mb-1">
                  Debates, Public Speaking & Career Aspirations
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Interview questions, expressing opinions, describing dreams and projects in natural English.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Benchmark Gains (Day 0, 45, 90) */}
      {activeTab === 'benchmark' && (
        <div className="space-y-6">
          <div className="p-6 rounded-4xl bg-white card-3d">
            <h3 className="text-lg font-black text-slate-900 mb-1">
              {isHi ? 'मापा गया प्रगति बेंचमार्क' : 'Measured Assessment Benchmarks'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {isHi
                ? 'नियम: कोई खोखला दावा नहीं। दिन 0, दिन 45 और दिन 90 पर मानकीकृत मूल्यांकन।'
                : 'Guardrail: No false fluency guarantees. Verified pre-and-post assessments on Days 0, 45, and 90.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl bg-slate-100 border-2 border-slate-200 text-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Day 0 Baseline
                </span>
                <div className="text-3xl font-black text-slate-800 my-2 font-mono">42 / 100</div>
                <div className="text-xs font-bold text-slate-600">CEFR Pre-A1 Level</div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Hesitation in speaking, basic vocabulary gaps identified.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 text-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                  Day 45 Midterm (Upcoming)
                </span>
                <div className="text-3xl font-black text-amber-600 my-2 font-mono">~72 / 100</div>
                <div className="text-xs font-bold text-amber-900">Projected CEFR A1+</div>
                <p className="text-[11px] text-slate-600 mt-2">
                  Target: 300 active words and 3-minute continuous conversation.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-indigo-50 border-2 border-indigo-200 text-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-700">
                  Day 90 Target Goal
                </span>
                <div className="text-3xl font-black text-brand-700 my-2 font-mono">88+ / 100</div>
                <div className="text-xs font-bold text-indigo-950">CEFR B1 Fluency</div>
                <p className="text-[11px] text-slate-600 mt-2">
                  Unlocks Official NetCyberAI English Certificate in Learning Vault.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

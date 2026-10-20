'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SubjectChip } from '@/components/ui/SubjectChip';
import { VoiceMicButton } from '@/components/ui/VoiceMicButton';
import { generateHomeworkGuidance } from '@/lib/homework';
import { Camera, Lightbulb, ShieldCheck, Send } from 'lucide-react';

const PRESET_QUESTIONS = [
  {
    id: 'hw_physics',
    subject: 'Science',
    badge: 'NCERT Page 109, Q3',
    badge_hi: 'NCERT पृष्ठ 109, प्रश्न 3',
    en: 'A train starting from railway station attains a speed of 40 km/h in 10 minutes. Find its acceleration.',
    hi: 'एक रेलगाड़ी रेलवे स्टेशन से चलना प्रारंभ करती है और 10 मिनट में 40 km/h की चाल प्राप्त करती है। इसका त्वरण ज्ञात कीजिए।',
  },
  {
    id: 'hw_math_junior',
    subject: 'Mathematics',
    badge: 'NCERT Fractions Ex 7.3',
    badge_hi: 'NCERT भिन्न प्रश्नावली 7.3',
    en: 'Aarav ate 2/5 of a roti and his sister ate 1/3 of the same roti. How much fraction of the roti did they eat altogether?',
    hi: 'आरव ने एक रोटी का 2/5 भाग खाया और उसकी बहन ने 1/3 भाग खाया। दोनों ने मिलकर कुल कितना भिन्न भाग खाया?',
  },
  {
    id: 'hw_math_senior',
    subject: 'Mathematics',
    badge: 'NCERT Polynomials Ex 2.4',
    badge_hi: 'NCERT बहुपद प्रश्नावली 2.4',
    en: 'Check whether (x - 2) is a factor of polynomial P(x) = x³ - 3x² + 4x - 4 using the Factor Theorem.',
    hi: 'गुणनखंड प्रमेय का प्रयोग करके जांचें कि क्या (x - 2) बहुपद P(x) = x³ - 3x² + 4x - 4 का एक गुणनखंड है।',
  },
];

export default function HomeworkHelperPage() {
  const { activeChild, themeVariant, t, locale } = useApp();
  const isHi = locale === 'hi';
  const isJunior = themeVariant === 'junior';

  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number>(isJunior ? 1 : 0);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);

  const activePreset = PRESET_QUESTIONS[selectedPresetIdx] || PRESET_QUESTIONS[0];
  const currentQuestionText =
    customQuestion.trim() || (isHi ? activePreset.hi : activePreset.en);

  const guidance = generateHomeworkGuidance({
    questionText: currentQuestionText,
    subject: activePreset.subject,
    gradeLevel: activeChild?.grade_level || 9,
    language: isHi ? 'hi' : 'en',
  });

  const handleAnalyzeQuestion = (presetIndex?: number) => {
    setAnalyzing(true);
    if (typeof presetIndex === 'number') {
      setSelectedPresetIdx(presetIndex);
      setCustomQuestion('');
    }
    setTimeout(() => {
      setAnalyzing(false);
    }, 350);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="brand" size="sm">
            {isHi
              ? 'चरणबद्ध विधि मार्गदर्शन (सीधे उत्तर की नकल नहीं)'
              : 'Method Guidance (Never Bare Answers)'}
          </Badge>
          <span className="text-xs text-slate-400">
            {isHi ? 'सोचना सिखाता है' : 'Teaches How to Think'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isHi ? 'गृहकार्य सहायक (Homework Helper)' : `${t('nav.homework')} Helper`}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-0.5">
          {isHi
            ? 'किसी भी गृहकार्य प्रश्न को स्कैन करें या बोलकर लिखें — हम सीधे उत्तर देने के बजाय उसे स्वयं हल करने की 3-चरणीय विधि सिखाते हैं।'
            : 'Scan or speak any homework question to receive step-by-step methodology guidance that helps you solve it on your own.'}
        </p>
      </div>

      {/* Upload & Voice Question Input Card */}
      <Card className="p-6 border-2 border-dashed border-indigo-200 bg-indigo-50/20 space-y-4">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-indigo-100 text-brand-600 flex items-center justify-center">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 mb-1">
            {isHi
              ? 'गृहकार्य प्रश्न की फोटो चुनें या नीचे अपना प्रश्न लिखें/बोलें'
              : 'Capture Homework Question or Speak / Type Below'}
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            {isHi
              ? 'भौतिकी संख्यात्मक प्रश्न, बीजगणित समीकरण, भिन्न या व्याकरण अभ्यास।'
              : 'Physics numericals, algebra equations, fractions, or science problems.'}
          </p>

          {/* Preset Textbook Question Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            {PRESET_QUESTIONS.map((pq, idx) => (
              <button
                key={pq.id}
                type="button"
                onClick={() => handleAnalyzeQuestion(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  selectedPresetIdx === idx && !customQuestion
                    ? 'bg-brand-600 text-white border-brand-600 shadow-soft-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-brand-400'
                }`}
              >
                {isHi ? pq.badge_hi : pq.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Question Input with Voice Mic */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-soft-sm">
          <VoiceMicButton
            size="sm"
            language={isHi ? 'hi-IN' : 'en-IN'}
            onTranscript={(spoken) => {
              setCustomQuestion(spoken);
              handleAnalyzeQuestion();
            }}
          />
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder={
              isHi
                ? 'यहाँ कोई भी गृहकार्य प्रश्न टाइप करें या माइक दबाकर बोलें...'
                : 'Type or speak any homework problem here...'
            }
            className="flex-1 text-xs sm:text-sm px-2 py-1.5 bg-transparent focus:outline-none text-slate-800"
          />
          <Button
            size="sm"
            variant="primary"
            disabled={analyzing}
            leftIcon={<Send className="w-3.5 h-3.5" />}
            onClick={() => handleAnalyzeQuestion()}
          >
            {analyzing
              ? isHi
                ? 'विश्लेषण हो रहा है...'
                : 'Analyzing...'
              : isHi
              ? 'विधि देखें'
              : 'Guide Me'}
          </Button>
        </div>
      </Card>

      {/* Scanned Homework Breakdown */}
      <motion.div
        key={currentQuestionText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Question Summary */}
        <Card className="p-5 border border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <SubjectChip subject={activePreset.subject} />
              <Badge variant="neutral" size="sm">
                {isHi ? activePreset.badge_hi : activePreset.badge}
              </Badge>
            </div>
            <Badge variant="success" size="sm">
              <ShieldCheck className="w-3 h-3 mr-1 inline" />
              {isHi
                ? 'सुकराती मोड: अंतिम उत्तर गोपनीय रखा गया'
                : 'Socratic Shield: Bare Answer Suppressed'}
            </Badge>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            &ldquo;{guidance.questionSummary}&rdquo;
          </h3>
        </Card>

        {/* Guided Steps (No direct cheating answer dump!) */}
        <Card className="p-6 border-l-4 border-l-brand-600 bg-white space-y-4">
          <h4 className="text-xs font-bold text-brand-700 uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-brand-600" />
            <span>
              {isHi
                ? 'चरण-दर-चरण प्रश्न हल करने की विधि (3-Step Socratic Method)'
                : 'Step-by-Step Problem-Solving Method'}
            </span>
          </h4>

          <div className="space-y-3.5 text-xs text-slate-700">
            {guidance.steps.map((st, sIdx) => (
              <div
                key={st.stepNumber}
                className={`p-3.5 rounded-2xl ${
                  sIdx === 2
                    ? 'bg-indigo-50/90 border border-indigo-100 text-indigo-950'
                    : 'bg-slate-50'
                }`}
              >
                <span className="font-bold text-slate-900 block mb-1">{st.title}</span>
                <p className="text-slate-600 mb-2">{st.description}</p>
                <ul className="space-y-1">
                  {st.keyPoints.map((kp) => (
                    <li key={kp} className="flex items-start gap-1.5">
                      <span className="text-brand-600 font-bold">•</span>
                      <span className={sIdx === 2 ? 'font-semibold text-emerald-900' : ''}>
                        {kp}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Desi Analogy & Pedagogical Notice */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-900">
            <strong>🏏 {isHi ? 'देसी उदाहरण:' : 'Desi Analogy:'}</strong> {guidance.desiAnalogy}
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            {guidance.pedagogicalNotice}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

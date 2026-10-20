'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, AlertTriangle, ArrowRight, BrainCircuit } from 'lucide-react';

export default function ParentInsightPage() {
  const { activeChild, themeVariant, activeWeakTopics, t, locale } = useApp();
  const isHi = locale === 'hi';
  const isJunior = themeVariant === 'junior';
  const childDisplayName = isHi && activeChild?.name_hi ? activeChild.name_hi : activeChild?.name;

  const subjectMastery = isJunior
    ? [
        {
          name: isHi ? 'विज्ञान (पौधे एवं प्रकाश संश्लेषण)' : 'Science (Plants & Photosynthesis)',
          pct: 88,
          barCls: 'bg-emerald-500 w-[88%]',
          textCls: 'text-emerald-700',
        },
        {
          name: isHi ? 'गणित (दैनिक जीवन में भिन्न)' : 'Mathematics (Fractions & Decimals)',
          pct: 80,
          barCls: 'bg-blue-500 w-[80%]',
          textCls: 'text-blue-700',
        },
        {
          name: isHi ? 'अंग्रेज़ी और हिंदी भाषा बोध' : 'English & Hindi Comprehension',
          pct: 92,
          barCls: 'bg-purple-500 w-[92%]',
          textCls: 'text-purple-700',
        },
      ]
    : [
        {
          name: isHi ? 'विज्ञान (CBSE भौतिकी एवं जीव विज्ञान)' : 'Science (CBSE Physics & Bio)',
          pct: 82,
          barCls: 'bg-emerald-500 w-[82%]',
          textCls: 'text-emerald-700',
        },
        {
          name: isHi ? 'गणित (बहुपद और रेखाएँ)' : 'Mathematics (Polynomials & Angles)',
          pct: 75,
          barCls: 'bg-blue-500 w-[75%]',
          textCls: 'text-blue-700',
        },
        {
          name: isHi ? 'अंग्रेज़ी (पठन और बोध)' : 'English (Reading & Comprehension)',
          pct: 90,
          barCls: 'bg-purple-500 w-[90%]',
          textCls: 'text-purple-700',
        },
      ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="purple" size="sm">
            {isHi ? 'अभिभावक साप्ताहिक विवरण' : 'Parent Executive Brief'}
          </Badge>
          <span className="text-xs text-slate-400">
            {isHi ? 'सप्ताह: 12 अक्टूबर – 18 अक्टूबर, 2026' : 'Week of Oct 12 – Oct 18, 2026'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('nav.insight')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-0.5">
          {isHi
            ? `${childDisplayName} के लिए 3-पंक्ति का स्पष्ट साप्ताहिक प्रगति सारांश।`
            : `Weekly 3-line diagnostic digest for ${childDisplayName}. Clarity without lecture.`}
        </p>
      </div>

      {/* 3-Line Core Insight Card (Spec §3 Item 10) */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-white to-indigo-50/40 border-l-4 border-l-brand-600 shadow-soft-lg">
        <h2 className="text-base font-extrabold text-slate-900 mb-5 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-brand-600" />
          <span>
            {isHi
              ? 'साप्ताहिक अध्ययन सारांश (Weekly Learning Summary)'
              : 'Weekly Learning Summary (3-Line Diagnostic)'}
          </span>
        </h2>

        <div className="space-y-4">
          {/* Line 1: What was studied */}
          <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-slate-100 shadow-soft-sm">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                {isHi
                  ? '1. इस सप्ताह क्या पढ़ा गया (What Was Studied This Week)'
                  : '1. What Was Studied This Week'}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 mt-0.5 font-medium leading-relaxed">
                {isJunior
                  ? isHi
                    ? 'विज्ञान (पौधों के भाग व प्रकाश संश्लेषण) और गणित (तुल्य भिन्न) के 3 अध्याय पूरे किए और 25 दैनिक क्विज़ प्रश्नों के उत्तर दिए।'
                    : 'Completed 3 chapters across Science (Plants & Photosynthesis) and Math (Equivalent Fractions) with 25 daily quiz questions answered.'
                  : isHi
                  ? 'विज्ञान (गति, ऊतक) और गणित (बहुपद) के 4 अध्याय पूरे किए और 28 दैनिक क्विज़ प्रश्नों का अभ्यास किया।'
                  : 'Completed 4 chapters across Science (Motion, Tissues) and Math (Polynomials) with 28 daily quiz questions answered.'}
              </p>
            </div>
          </div>

          {/* Line 2: Where the child was weak */}
          <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-slate-100 shadow-soft-sm">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                {isHi
                  ? '2. जहाँ मार्गदर्शन की आवश्यकता रही (Where The Child Needed Guidance)'
                  : '2. Where The Child Needed Guidance'}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 mt-0.5 font-medium leading-relaxed">
                {isJunior
                  ? isHi
                    ? 'असमान हर (Unlike Denominators) वाले भिन्नों का लघुत्तम (LCM) निकालने में कठिनाई आई। यह विषय कल के क्विज़ में पुनः दोहराया जाएगा।'
                    : 'Needed support on finding common denominators (LCM) when adding unlike fractions. Scheduled to resurface in tomorrow’s quiz.'
                  : isHi
                  ? `वेग-समय ग्राफ की ढाल (${activeWeakTopics[0] || 'v-t graph slope'}) से जुड़े 2 संख्यात्मक प्रश्नों में सहायता की आवश्यकता पड़ी। कल के क्विज़ में इसका पुनः अभ्यास होगा।`
                  : `Struggled on 2 numerical problems involving Velocity-Time graph slopes (${activeWeakTopics[0] || 'v-t graph slopes'}). The concept is scheduled to resurface in tomorrow’s quiz.`}
              </p>
            </div>
          </div>

          {/* Line 3: What's next */}
          <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-slate-100 shadow-soft-sm">
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider block">
                {isHi
                  ? '3. अगले सप्ताह का लक्ष्य (What Is Coming Up Next)'
                  : '3. What Is Coming Up Next'}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 mt-0.5 font-medium leading-relaxed">
                {isJunior
                  ? isHi
                    ? 'मानक मीटर स्केल से वक्र रेखाओं और दूरियों का मापन तथा दशमलव जोड़ का अभ्यास।'
                    : 'Measuring curved lines with standard SI meter units and interactive decimal addition quests.'
                  : isHi
                  ? 'क्रिकेट उदाहरणों और दैनिक संख्यात्मक अभ्यास के साथ न्यूटन का द्वितीय गति नियम और संवेग (Momentum)।'
                  : "Starting Newton's Second Law and Momentum with interactive cricket analogies and day-wise practice numericals."}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Concept Mastery Visual Bars */}
      <Card className="p-6 border border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 mb-4">
          {isHi ? 'विषयवार सिलेबस दक्षता विवरण' : 'Subject Syllabus Mastery Breakdown'}
        </h3>
        <div className="space-y-4 text-xs">
          {subjectMastery.map((sub) => (
            <div key={sub.name}>
              <div className="flex justify-between font-semibold mb-1">
                <span>{sub.name}</span>
                <span className={`${sub.textCls} font-bold`}>
                  {sub.pct}% {isHi ? 'दक्षता' : 'Mastery'}
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${sub.barCls}`} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

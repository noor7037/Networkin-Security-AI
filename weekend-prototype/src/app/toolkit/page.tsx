'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SubjectChip } from '@/components/ui/SubjectChip';
import { VoiceMicButton } from '@/components/ui/VoiceMicButton';
import {
  calculateExamCountdown,
  calculateBlueprintMarksSum,
  calculateSyllabusTimetable,
  BlueprintSection,
} from '@/lib/toolkit';
import { CheckSquare, Square, FileText, Calendar, Plus } from 'lucide-react';

const CBSE_SECTIONS: BlueprintSection[] = [
  {
    sectionCode: 'A',
    name: 'Section A: Objective & MCQs',
    questionsCount: 20,
    marksPerQuestion: 1,
    description: '20 Questions × 1 Mark',
  },
  {
    sectionCode: 'B',
    name: 'Section B: Very Short Answers',
    questionsCount: 6,
    marksPerQuestion: 2,
    description: '6 Questions × 2 Marks',
  },
  {
    sectionCode: 'C',
    name: 'Section C: Short Answers',
    questionsCount: 7,
    marksPerQuestion: 3,
    description: '7 Questions × 3 Marks',
  },
  {
    sectionCode: 'D',
    name: 'Section D: Long Answers & Derivations',
    questionsCount: 3,
    marksPerQuestion: 5,
    description: '3 Questions × 5 Marks',
  },
  {
    sectionCode: 'E',
    name: 'Section E: Case-Based / Data Analysis',
    questionsCount: 3,
    marksPerQuestion: 4,
    description: '3 Questions × 4 Marks',
  },
];

export default function ExamToolkitPage() {
  const { activeChild, activeStudyPlan, themeVariant, t, locale } = useApp();
  const isHi = locale === 'hi';
  const isJunior = themeVariant === 'junior';

  const countdown = calculateExamCountdown(
    new Date('2026-11-12T09:00:00+05:30'),
    new Date('2026-10-18T17:30:00+05:30')
  );
  const blueprint = calculateBlueprintMarksSum(CBSE_SECTIONS);
  const timetable = calculateSyllabusTimetable({
    currentDate: new Date('2026-10-18T00:00:00Z'),
    subjects: [
      { name: 'Science', examDate: '2026-11-12', chaptersCount: 4 },
      { name: 'Mathematics', examDate: '2026-11-16', chaptersCount: 4 },
      { name: 'English', examDate: '2026-11-20', chaptersCount: 3 },
      { name: 'Social Science', examDate: '2026-11-24', chaptersCount: 4 },
    ],
  });

  const [checklist, setChecklist] = useState([
    {
      id: 'c1',
      label: 'Revise 3 Equations of Motion derivations',
      label_hi: 'गति के 3 समीकरणों के निगमन (Derivations) का रिवीजन करें',
      checked: true,
      subject: 'Science',
    },
    {
      id: 'c2',
      label: 'Practice NCERT Chapter 8 numericals 1-10',
      label_hi: 'NCERT अध्याय 8 के संख्यात्मक प्रश्न 1-10 हल करें',
      checked: true,
      subject: 'Science',
    },
    {
      id: 'c3',
      label: 'Memorize SI Units: Acceleration (m/s²), Force (N)',
      label_hi: 'मानक SI मात्रक याद करें: त्वरण (m/s²), बल (N)',
      checked: false,
      subject: 'Science',
    },
    {
      id: 'c4',
      label: 'Solve Polynomials Remainder & Factor Theorem paper',
      label_hi: 'बहुपद शेषफल एवं गुणनखंड प्रमेय अभ्यास प्रश्नपत्र हल करें',
      checked: false,
      subject: 'Mathematics',
    },
    {
      id: 'c5',
      label: isJunior
        ? 'Draw Reticulate vs Parallel Leaf Venation diagram'
        : 'Review Evelyn Glennie story themes and key quotes',
      label_hi: isJunior
        ? 'जालिका बनाम समांतर पत्ती शिरा-विन्यास का नामांकित चित्र बनाएं'
        : 'एवलिन ग्लेनी कहानी के मुख्य विचार और उद्धरण दोहराएं',
      checked: false,
      subject: isJunior ? 'Science' : 'English',
    },
  ]);

  const [newCheckText, setNewCheckText] = useState('');

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleAddChecklist = (textOverride?: string) => {
    const val = (textOverride ?? newCheckText).trim();
    if (!val) return;
    setChecklist((prev) => [
      ...prev,
      {
        id: 'c_' + Date.now(),
        label: val,
        label_hi: val,
        checked: false,
        subject: 'Science',
      },
    ]);
    setNewCheckText('');
  };

  const sectionNamesHi: Record<string, string> = {
    A: 'खंड A: वस्तुनिष्ठ एवं बहुविकल्पीय प्रश्न (MCQs)',
    B: 'खंड B: अति लघु उत्तरीय प्रश्न',
    C: 'खंड C: लघु उत्तरीय प्रश्न',
    D: 'खंड D: दीर्घ उत्तरीय एवं निगमन (Derivations)',
    E: 'खंड E: केस-आधारित डेटा विश्लेषण प्रश्न',
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="brand" size="sm">
            {isHi ? 'परीक्षा तैयारी साथी' : 'Exam Season Companion'}
          </Badge>
          <span className="text-xs text-slate-400">
            {isHi ? 'आधिकारिक CBSE ब्लूप्रिंट सत्यापित' : 'CBSE Blueprint Verified'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('nav.toolkit')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-0.5">
          {isHi
            ? 'परीक्षा उल्टी गिनती, अंक विभाजन ब्लूप्रिंट, विषय समय-सारणी और उच्च-प्राथमिकता रिवीजन चेकलिस्ट।'
            : 'Countdown, marks weightage blueprint, subject timetable pace, and high-yield revision checklist.'}
        </p>
      </div>

      {/* Countdown Hero Banner */}
      <Card
        className={`p-6 sm:p-8 text-white rounded-4xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
          isJunior
            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500'
            : 'bg-gradient-to-r from-brand-600 via-indigo-600 to-indigo-800'
        }`}
      >
        <div>
          <span className="text-xs uppercase font-bold text-white/80 tracking-wider block mb-1">
            {isHi ? 'लक्षित परीक्षा' : 'Target Examination'}
          </span>
          <h2 className="text-2xl font-extrabold">
            {isHi ? activeStudyPlan.examTitle_hi : activeStudyPlan.examTitle}
          </h2>
          <p className="text-xs text-white/90 mt-1">
            {isHi
              ? `12 नवंबर 2026 से प्रारंभ • ${blueprint.totalMarks} अंक सैद्धांतिक प्रश्नपत्र`
              : `Starting November 12, 2026 • ${blueprint.totalMarks} Marks Theory`}
          </p>
        </div>

        <div className="flex items-center gap-2 text-center">
          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-2.5">
            <span className="text-2xl font-black block">{countdown.days}</span>
            <span className="text-[10px] uppercase font-bold text-white/90">
              {isHi ? 'दिन' : 'Days'}
            </span>
          </div>
          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-2.5">
            <span className="text-2xl font-black block">
              {String(countdown.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-white/90">
              {isHi ? 'घंटे' : 'Hours'}
            </span>
          </div>
          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-2.5">
            <span className="text-2xl font-black block">
              {String(countdown.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-white/90">
              {isHi ? 'मिनट' : 'Mins'}
            </span>
          </div>
        </div>
      </Card>

      {/* 2-Column Grid: Paper Blueprint & Revision Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Paper Pattern & Marks Blueprint */}
        <Card className="p-5 sm:p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-600" />
              <span>
                {isHi
                  ? 'प्रश्नपत्र ब्लूप्रिंट (CBSE पैटर्न)'
                  : 'Question Paper Blueprint (CBSE Pattern)'}
              </span>
            </h3>
            <Badge variant="brand" size="sm">
              {blueprint.totalMarks} {isHi ? 'कुल अंक' : 'Total Marks'}
            </Badge>
          </div>

          <div className="space-y-2.5 text-xs">
            {blueprint.sections.map((sec) => (
              <div
                key={sec.sectionCode}
                className={`p-3 rounded-2xl flex items-center justify-between ${
                  sec.sectionCode === 'E'
                    ? 'bg-indigo-50 border border-indigo-100 font-bold text-indigo-900'
                    : 'bg-slate-50'
                }`}
              >
                <div>
                  <span className="font-bold text-slate-800 block">
                    {isHi ? sectionNamesHi[sec.sectionCode] || sec.name : sec.name}
                  </span>
                  <span className="text-slate-500">
                    {isHi
                      ? `${sec.questionsCount} प्रश्न × ${sec.marksPerQuestion} अंक`
                      : sec.description}
                  </span>
                </div>
                <span className="font-bold text-slate-800">
                  {sec.totalSectionMarks} {isHi ? 'अंक' : 'Marks'}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* High-Yield Revision Checklist */}
        <Card className="p-5 sm:p-6 border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>
                  {isHi ? 'उच्च-उपयोगी रिवीजन चेकलिस्ट' : 'High-Yield Revision Checklist'}
                </span>
              </h3>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {checklist.filter((c) => c.checked).length}/{checklist.length}{' '}
                {isHi ? 'पूर्ण' : 'Done'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  className={`w-full p-3 rounded-2xl text-left text-xs font-semibold flex items-start gap-2.5 transition-all border ${
                    item.checked
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 line-through opacity-80'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-brand-400'
                  }`}
                >
                  {item.checked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span>{isHi ? item.label_hi : item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Add custom revision item with Voice Mic */}
          <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
            <input
              type="text"
              value={newCheckText}
              onChange={(e) => setNewCheckText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddChecklist();
              }}
              placeholder={
                isHi ? 'नया रिवीजन लक्ष्य जोड़ें...' : 'Add revision target...'
              }
              className="flex-1 text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <VoiceMicButton
              size="sm"
              language={isHi ? 'hi-IN' : 'en-IN'}
              onTranscript={(spoken) => handleAddChecklist(spoken)}
            />
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => handleAddChecklist()}
            >
              {isHi ? 'जोड़ें' : 'Add'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Subject Exam Timetable & Revision Pace */}
      <Card className="p-5 sm:p-6 border border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-600" />
          <span>
            {isHi
              ? 'विषयवार परीक्षा समय-सारणी एवं प्रति अध्याय गति'
              : 'Subject Exam Timetable & Suggested Chapter Pace'}
          </span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {timetable.map((entry) => (
            <div
              key={entry.subject}
              className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <SubjectChip subject={entry.subject} size="sm" />
                <span className="text-[11px] font-bold text-slate-500">{entry.examDate}</span>
              </div>
              <div className="text-xs font-bold text-slate-800 pt-1">
                {isHi
                  ? `${entry.daysRemaining} दिन शेष • ${entry.chaptersCount} अध्याय`
                  : `${entry.daysRemaining} Days Left • ${entry.chaptersCount} Chapters`}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold">
                {isHi
                  ? `सुझाव: ${entry.suggestedDaysPerChapter} दिन / अध्याय`
                  : `Pace: ${entry.suggestedDaysPerChapter} days / chapter`}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

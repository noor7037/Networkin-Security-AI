'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SubjectChip } from '@/components/ui/SubjectChip';
import {
  CheckCircle2,
  Sparkles,
  RefreshCw,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

export default function StudyPlanPage() {
  const {
    activeChild,
    activeStudyPlan,
    reflowChildPlan,
    togglePlanDayComplete,
    t,
    locale,
  } = useApp();

  const [reflowTriggered, setReflowTriggered] = useState(false);
  const isHi = locale === 'hi';

  const handleReflow = () => {
    if (!activeChild) return;
    setReflowTriggered(true);
    reflowChildPlan(activeChild.id);
  };

  const completedCount = activeStudyPlan.days.filter((d) => d.status === 'completed').length;
  const totalCount = activeStudyPlan.days.length || 7;
  const progressPct = Math.round((completedCount / totalCount) * 100);
  const childDisplayName = isHi && activeChild?.name_hi ? activeChild.name_hi : activeChild?.name;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge variant="brand" size="sm">
              {childDisplayName} • {t('profile.grade')} {activeChild?.grade_level}
            </Badge>
            <span className="text-xs text-slate-500 font-medium">
              {isHi ? activeStudyPlan.examTitle_hi : activeStudyPlan.examTitle}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('nav.plan')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
            {isHi
              ? 'आपकी सिलेबस प्रोफ़ाइल के अनुसार दैनिक रोडमैप। छूटे हुए दिन बिना किसी तनाव के आज से स्वतः व्यवस्थित हो जाते हैं।'
              : 'Day-wise roadmap adapted to your Syllabus Profile. Missed days reflow from today automatically.'}
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          leftIcon={<RefreshCw className="w-3.5 h-3.5 text-brand-600" />}
          onClick={handleReflow}
        >
          {reflowTriggered
            ? isHi
              ? 'योजना पुनः व्यवस्थित!'
              : 'Schedule Rebalanced!'
            : isHi
            ? 'आज से योजना व्यवस्थित करें'
            : 'Rebalance Schedule from Today'}
        </Button>
      </div>

      {/* Weekly Progress Bar & No Shaming Backlog Wall Banner */}
      <div className="p-4 sm:p-5 bg-emerald-50/90 border border-emerald-200 rounded-3xl text-xs text-emerald-900 space-y-3 shadow-soft-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold">
                {isHi
                  ? 'शून्य बैकलॉग तनाव (No Shaming Backlog Wall)'
                  : 'No Shaming Backlog Wall'}
              </div>
              <div className="text-[11px] text-emerald-700">
                {isHi
                  ? 'यदि किसी दिन पढ़ाई छूट जाती है, तो विषय आज से आगे के दिनों में सहज रूप से समायोजित हो जाते हैं।'
                  : 'If life happens and you miss a day, topics smoothly shift forward starting today.'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold bg-white text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              {isHi
                ? `पूर्ण: ${completedCount}/${totalCount} दिन (${progressPct}%)`
                : `Completed: ${completedCount}/${totalCount} Days (${progressPct}%)`}
            </span>
            <span className="text-[11px] font-bold bg-white text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              {isHi ? `पुनर्व्यवस्था: ${activeStudyPlan.reflowCount}` : `Reflow Count: ${activeStudyPlan.reflowCount}`}
            </span>
          </div>
        </div>

        <div className="h-2 w-full bg-emerald-200/70 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${ Math.max(8, progressPct) }%` }}
          />
        </div>
      </div>

      {/* Week Calendar Timeline */}
      <div className="space-y-3">
        {activeStudyPlan.days.map((item, idx) => {
          const isDone = item.status === 'completed';
          return (
            <motion.div
              key={`${item.date}-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <Card
                subjectBorder={
                  item.subject.toLowerCase().includes('sci')
                    ? 'science'
                    : item.subject.toLowerCase().includes('math')
                    ? 'math'
                    : item.subject.toLowerCase().includes('social')
                    ? 'sst'
                    : item.subject.toLowerCase().includes('hindi')
                    ? 'hindi'
                    : 'english'
                }
                className={`p-4 sm:p-5 transition-all ${
                  item.isToday
                    ? 'bg-gradient-to-r from-white via-indigo-50/20 to-white shadow-soft-md ring-2 ring-brand-500/30'
                    : isDone
                    ? 'bg-emerald-50/30 border-emerald-200'
                    : 'bg-white'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={() => activeChild && togglePlanDayComplete(activeChild.id, item.date)}
                      title={isHi ? 'पूर्ण चिह्नित करने के लिए टैप करें' : 'Tap to toggle completion'}
                      className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-bold shrink-0 transition-all ${
                        isDone
                          ? 'bg-emerald-600 text-white shadow-soft-sm'
                          : item.isToday
                          ? 'bg-brand-600 text-white shadow-soft-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span className="text-[9px] uppercase">
                        {isDone
                          ? isHi
                            ? 'पूर्ण'
                            : 'DONE'
                          : item.isToday
                          ? isHi
                            ? 'आज'
                            : 'TODAY'
                          : isHi
                          ? `दिन ${item.day_number}`
                          : `DAY ${item.day_number}`}
                      </span>
                      <span className="text-sm font-extrabold">{item.date.split('-')[2]}</span>
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <SubjectChip subject={item.subject} size="sm" />
                        <span className="text-xs text-slate-500 font-medium">
                          {isHi ? item.chapter_hi : item.chapter}
                        </span>
                      </div>
                      <h3
                        className={`text-sm font-bold ${
                          isDone ? 'text-emerald-900 line-through' : 'text-slate-900'
                        }`}
                      >
                        {isHi ? item.topic_hi : item.topic}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {item.isToday ? (
                      <>
                        <Link href="/explain">
                          <Button size="sm" variant="outline" leftIcon={<BookOpen className="w-3.5 h-3.5" />}>
                            {isHi ? 'व्याख्या' : 'Explain'}
                          </Button>
                        </Link>
                        <Link href="/quiz">
                          <Button size="sm" variant="accent" rightIcon={<Sparkles className="w-3.5 h-3.5" />}>
                            {isHi ? 'आज का क्विज़' : "Take Today's Quiz"}
                          </Button>
                        </Link>
                      </>
                    ) : isDone ? (
                      <Badge variant="success" size="sm">
                        ✓ {isHi ? 'पूर्ण किया गया' : 'Completed'}
                      </Badge>
                    ) : (
                      <button
                        type="button"
                        onClick={() => activeChild && togglePlanDayComplete(activeChild.id, item.date)}
                        className="text-xs text-slate-500 hover:text-brand-600 font-semibold px-3 py-1.5 bg-slate-50 hover:bg-brand-50 rounded-full border border-slate-200 transition-colors"
                      >
                        {isHi ? 'पूर्ण चिह्नित करें' : 'Mark Complete'}
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

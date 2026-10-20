'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SubjectChip } from '@/components/ui/SubjectChip';
import { CelebrationModal } from '@/components/ui/CelebrationModal';
import { VoiceMicButton } from '@/components/ui/VoiceMicButton';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LocalizedQuizQuestion {
  id: string;
  subtopic: string;
  subtopic_hi: string;
  question: string;
  question_hi: string;
  options: string[];
  options_hi: string[];
  correctIndex: number;
  explanation: string;
  explanation_hi: string;
  desiAnalogy: string;
  desiAnalogy_hi: string;
}

const SENIOR_QUESTIONS: LocalizedQuizQuestion[] = [
  {
    id: 'q1',
    subtopic: 'SI Units of Motion',
    subtopic_hi: 'गति के SI मात्रक',
    question: 'Which of the following is the standard SI unit of Acceleration?',
    question_hi: 'निम्नलिखित में से त्वरण (Acceleration) का मानक SI मात्रक क्या है?',
    options: ['m/s', 'm/s²', 'km/h', 'N·m'],
    options_hi: ['m/s', 'm/s²', 'km/h', 'N·m'],
    correctIndex: 1,
    explanation: 'Acceleration = change in velocity / time = (m/s) / s = m/s².',
    explanation_hi: 'त्वरण = वेग में परिवर्तन / समय = (m/s) / s = m/s²।',
    desiAnalogy: 'Speed tells how fast you move; acceleration tells how fast your speed changes!',
    desiAnalogy_hi: 'चाल बताती है कि आप कितनी तेजी से चल रहे हैं; त्वरण बताता है कि आपकी रफ्तार कितनी तेजी से बदल रही है!',
  },
  {
    id: 'q2',
    subtopic: 'Velocity-Time Graph Slopes',
    subtopic_hi: 'वेग-समय ग्राफ की ढाल',
    question: 'What does a horizontal flat line on a Velocity-Time graph indicate?',
    question_hi: 'वेग-समय (Velocity-Time) ग्राफ पर एक सीधी क्षैतिज रेखा क्या दर्शाती है?',
    options: [
      'Zero velocity',
      'Uniform Acceleration',
      'Constant Velocity (zero acceleration)',
      'Negative Acceleration',
    ],
    options_hi: [
      'शून्य वेग',
      'एकसमान त्वरण',
      'नियत वेग (शून्य त्वरण)',
      'ऋणात्मक त्वरण (मंदन)',
    ],
    correctIndex: 2,
    explanation: 'When velocity stays unchanged across time, slope is zero, meaning acceleration is zero.',
    explanation_hi: 'जब समय के साथ वेग नहीं बदलता, तो ढाल (slope) शून्य होती है, अर्थात त्वरण शून्य है।',
    desiAnalogy: 'Cruising smoothly on an expressway at 60 km/h with constant speed.',
    desiAnalogy_hi: 'एक्सप्रेसवे पर 60 किमी/घंटा की एकसमान रफ्तार से गाड़ी चलाना।',
  },
  {
    id: 'q3',
    subtopic: 'Distance vs Displacement',
    subtopic_hi: 'दूरी बनाम विस्थापन',
    question: 'If a runner completes a full 400m circular lap and returns to the start line, what is the displacement?',
    question_hi: 'यदि कोई धावक 400 मीटर के वृत्ताकार ट्रैक का एक पूरा चक्कर लगाकर प्रारंभिक बिंदु पर लौट आता है, तो विस्थापन क्या होगा?',
    options: ['400 meters', '0 meters', '200 meters', '800 meters'],
    options_hi: ['400 मीटर', '0 मीटर', '200 मीटर', '800 मीटर'],
    correctIndex: 1,
    explanation: 'Displacement is the straight-line shortest distance from starting point to ending point.',
    explanation_hi: 'विस्थापन प्रारंभिक और अंतिम बिंदु के बीच की न्यूनतम सीधी दूरी है।',
    desiAnalogy: 'Leaving your home in the morning for school and coming back to your bedroom at night!',
    desiAnalogy_hi: 'सुबह घर से स्कूल जाना और शाम को वापस अपने घर लौट आना — कुल विस्थापन शून्य!',
  },
  {
    id: 'q4',
    subtopic: 'Equations of Motion',
    subtopic_hi: 'गति के समीकरण',
    question: 'Which equation of motion gives the distance (s) traveled with initial velocity (u) and acceleration (a)?',
    question_hi: 'आरंभिक वेग (u) और त्वरण (a) दिए होने पर तय की गई दूरी (s) किस समीकरण से मिलती है?',
    options: ['v = u + at', 's = ut + ½at²', 'v² - u² = 2as', 'a = (v + u)/2'],
    options_hi: ['v = u + at', 's = ut + ½at²', 'v² - u² = 2as', 'a = (v + u)/2'],
    correctIndex: 1,
    explanation: 'The second equation of motion is s = ut + ½at².',
    explanation_hi: 'गति का द्वितीय समीकरण s = ut + ½at² दूरी और समय का संबंध बताता है।',
    desiAnalogy: 'Essential for calculating how much runway an airplane needs to take off safely.',
    desiAnalogy_hi: 'हवाई जहाज को उड़ान भरने के लिए कितने लंबे रनवे की आवश्यकता है, यह इसी सूत्र से निकलता है।',
  },
  {
    id: 'q5',
    subtopic: 'Retardation Sign Convention',
    subtopic_hi: 'मंदन चिह्न नियम',
    question: 'When a car slows down as it approaches a red traffic light, its acceleration is:',
    question_hi: 'जब कोई कार लाल ट्रैफिक सिग्नल के पास आते हुए धीमी होती है, तो उसका त्वरण होता है:',
    options: ['Positive', 'Negative (Deceleration / Retardation)', 'Infinite', 'Zero'],
    options_hi: ['धनात्मक', 'ऋणात्मक (मंदन / Retardation)', 'अनंत', 'शून्य'],
    correctIndex: 1,
    explanation: 'Decreasing velocity results in negative acceleration, known as deceleration or retardation.',
    explanation_hi: 'वेग घटने पर ऋणात्मक त्वरण होता है, जिसे मंदन (Retardation) कहते हैं।',
    desiAnalogy: 'Gently applying the brakes on your scooter before a speed breaker.',
    desiAnalogy_hi: 'स्पीड ब्रेकर से पहले स्कूटर पर धीरे से ब्रेक लगाना।',
  },
  {
    id: 'q6',
    subtopic: 'Inertia of Direction',
    subtopic_hi: 'दिशा का जड़त्व',
    question: 'When a bus suddenly turns a sharp left corner, passengers tilt to the right due to:',
    question_hi: 'जब बस अचानक बाईं ओर मुड़ती है, तो यात्री दाईं ओर क्यों झुक जाते हैं?',
    options: ['Inertia of rest', 'Inertia of direction', 'Gravitational force', 'Friction'],
    options_hi: ['विराम का जड़त्व', 'दिशा का जड़त्व (Inertia of direction)', 'गुरुत्वाकर्षण बल', 'घर्षण'],
    correctIndex: 1,
    explanation: 'Inertia of direction keeps the upper body moving in the original straight-line path.',
    explanation_hi: 'दिशा के जड़त्व के कारण शरीर अपनी पूर्व सीधी दिशा में बने रहना चाहता है।',
    desiAnalogy: 'Like chai tilting toward the rim when you quickly turn the tray!',
    desiAnalogy_hi: 'जैसे ट्रे को अचानक घुमाने पर कप में चाय एक तरफ छलकती है!',
  },
  {
    id: 'q7',
    subtopic: 'Distance-Time Graphs',
    subtopic_hi: 'दूरी-समय ग्राफ',
    question: 'The slope of a Distance-Time graph gives:',
    question_hi: 'दूरी-समय (Distance-Time) ग्राफ की ढाल (slope) क्या दर्शाती है?',
    options: ['Acceleration', 'Speed', 'Force', 'Momentum'],
    options_hi: ['त्वरण', 'चाल (Speed)', 'बल', 'संवेग'],
    correctIndex: 1,
    explanation: 'Slope = Change in Distance / Change in Time = Speed.',
    explanation_hi: 'ढाल = दूरी में परिवर्तन / समय अंतराल = चाल (Speed)।',
    desiAnalogy: 'A steeper climb means covering more height in fewer steps.',
    desiAnalogy_hi: 'सीढ़ियां जितनी खड़ी होंगी, प्रत्येक कदम में उतनी अधिक ऊंचाई तय होगी।',
  },
  {
    id: 'q8',
    subtopic: 'Free Fall & Gravity',
    subtopic_hi: 'मुक्त पतन एवं गुरुत्व',
    question: 'A ball dropped from rest falls for 3 seconds (g = 9.8 m/s²). What is its velocity?',
    question_hi: 'विराम अवस्था से गिराई गई गेंद 3 सेकंड बाद (g = 9.8 m/s²) किस वेग पर होगी?',
    options: ['14.7 m/s', '29.4 m/s', '44.1 m/s', '9.8 m/s'],
    options_hi: ['14.7 m/s', '29.4 m/s', '44.1 m/s', '9.8 m/s'],
    correctIndex: 1,
    explanation: 'v = u + gt = 0 + (9.8 × 3) = 29.4 m/s.',
    explanation_hi: 'v = u + gt = 0 + (9.8 × 3) = 29.4 m/s।',
    desiAnalogy: 'Gravity adds 9.8 m/s of downward speed every single second.',
    desiAnalogy_hi: 'पृथ्वी का गुरुत्वाकर्षण हर सेकंड 9.8 m/s की रफ्तार बढ़ाता है।',
  },
  {
    id: 'q9',
    subtopic: 'Scalar vs Vector',
    subtopic_hi: 'अदिश बनाम सदिश राशि',
    question: 'Which of the following is a vector quantity (having both magnitude and direction)?',
    question_hi: 'निम्नलिखित में से कौन सी सदिश राशि (जिसमें परिमाण और दिशा दोनों हों) है?',
    options: ['Distance', 'Speed', 'Velocity', 'Time'],
    options_hi: ['दूरी (Distance)', 'चाल (Speed)', 'वेग (Velocity)', 'समय (Time)'],
    correctIndex: 2,
    explanation: 'Velocity specifies both speed and direction of motion.',
    explanation_hi: 'वेग (Velocity) में गति के परिमाण के साथ-साथ निश्चित दिशा भी होती है।',
    desiAnalogy: 'Saying "5 km" is distance; saying "5 km North toward India Gate" is displacement/velocity.',
    desiAnalogy_hi: '"5 किमी" केवल दूरी है; "इंडिया गेट की ओर उत्तर में 5 किमी" दिशा सहित सदिश है।',
  },
  {
    id: 'q10',
    subtopic: 'Braking Numericals',
    subtopic_hi: 'ब्रेक गणना प्रश्न',
    question: 'Brakes applied to a train moving at 20 m/s stop it in 20 seconds. What is the retardation?',
    question_hi: '20 m/s से चलती ट्रेन में ब्रेक लगाने पर वह 20 सेकंड में रुक जाती है। मंदन क्या होगा?',
    options: ['1 m/s²', '2 m/s²', '4 m/s²', '0.5 m/s²'],
    options_hi: ['1 m/s²', '2 m/s²', '4 m/s²', '0.5 m/s²'],
    correctIndex: 0,
    explanation: 'a = (0 - 20) / 20 = -1 m/s², so retardation is 1 m/s².',
    explanation_hi: 'a = (0 - 20) / 20 = -1 m/s², अतः मंदन 1 m/s² है।',
    desiAnalogy: 'The train smoothly sheds 1 m/s of speed every second until it halts at the platform.',
    desiAnalogy_hi: 'ट्रेन प्लेटफॉर्म पर रुकने से पहले हर सेकंड 1 m/s रफ्तार कम करती है।',
  },
];

export default function DailyQuizPage() {
  const router = useRouter();
  const {
    activeChild,
    themeVariant,
    activeWeakTopics,
    recordQuizCompletion,
    addNotification,
    t,
    locale,
  } = useApp();

  const isHi = locale === 'hi';
  const isJunior = themeVariant === 'junior';
  // True Class-Adaptive question count: 5 for Junior (Class 1-7), 10 for Senior (Class 8-12)!
  const totalQuestions = isJunior ? 5 : 10;

  const activeQuestionBank = SENIOR_QUESTIONS.slice(0, totalQuestions);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongTopics, setWrongTopics] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentQ = activeQuestionBank[currentIndex] || activeQuestionBank[0];
  const isResurfacedWeak =
    currentIndex < activeWeakTopics.length ||
    activeWeakTopics.some((wt) =>
      wt.toLowerCase().includes(currentQ.subtopic.toLowerCase().slice(0, 6))
    );

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
    } else {
      setWrongTopics((prev) => [...prev, currentQ.subtopic]);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      const finalScore = score;
      const childId = activeChild?.id || 'c_diya';

      recordQuizCompletion({
        childId,
        score: finalScore,
        totalQuestions,
        subject: 'Science',
        topic: isJunior ? 'Plants & Motion Quest' : 'Acceleration & Equations of Motion',
        topic_hi: isJunior ? 'पौधे और गति क्वेस्ट' : 'त्वरण और गति के समीकरण',
        weakTopicsDetected: wrongTopics,
      });

      addNotification({
        childId,
        childName: activeChild?.name || 'Diya Sharma',
        childAvatar: activeChild?.avatar || '👧',
        title: `Quiz Complete: ${finalScore}/${totalQuestions} correct!`,
        title_hi: `क्विज़ पूर्ण: ${finalScore}/${totalQuestions} सही उत्तर!`,
        body: `Earned ${finalScore * 10} Stars XP! Daily streak extended to ${(activeChild?.streak_days || 5) + 1} days.`,
        body_hi: `${finalScore * 10} सितारे (XP) अर्जित किए! दैनिक निरंतरता बढ़कर ${(activeChild?.streak_days || 5) + 1} दिन हुई।`,
        type: 'milestone',
      });
      setShowCelebration(true);
    }
  };

  const handleVoiceAnswer = (transcript: string) => {
    const clean = transcript.toLowerCase();
    if (clean.includes('b') || clean.includes('m/s²') || clean.includes('constant') || clean.includes('0')) {
      handleSelect(currentQ.correctIndex);
    } else {
      handleSelect(0);
    }
  };

  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const optionsList = isHi ? currentQ.options_hi : currentQ.options;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Resurfaced Weak Topics Banner */}
      {activeWeakTopics.length > 0 && (
        <div className="p-3.5 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>{isHi ? 'कमजोर विषय पुनः अभ्यास:' : 'Weak-Topic Resurfacing Active:'}</strong>{' '}
              {activeWeakTopics.join(' • ')}
            </span>
          </div>
          <Badge variant="warning" size="sm">
            {isJunior ? (isHi ? '5 प्रश्न (जूनियर)' : '5 Qs (Junior)') : isHi ? '10 प्रश्न (सीनियर)' : '10 Qs (Senior)'}
          </Badge>
        </div>
      )}

      {/* Top Progress Ribbon */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <SubjectChip subject="Science" size="sm" />
            <span>
              {isHi
                ? `प्रश्न ${currentIndex + 1} / ${totalQuestions} (Question ${currentIndex + 1} of ${totalQuestions})`
                : `Question ${currentIndex + 1} of ${totalQuestions}`}
            </span>
          </div>
          <span className="text-brand-600 font-bold">
            {progressPercent}% {isHi ? 'पूर्ण' : 'Completed'}
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="h-2.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-500 to-indigo-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-6 sm:p-8 bg-white border border-slate-100 shadow-xl rounded-4xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Badge variant={isResurfacedWeak ? 'warning' : 'brand'} size="sm">
              {isResurfacedWeak
                ? isHi
                  ? `पुनः अभ्यास: ${currentQ.subtopic_hi}`
                  : `Revision: ${currentQ.subtopic}`
                : isHi
                ? currentQ.subtopic_hi
                : currentQ.subtopic}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>{isHi ? 'बोलकर उत्तर दें:' : 'Voice Answer:'}</span>
            <VoiceMicButton
              size="sm"
              language={isHi ? 'hi-IN' : 'en-IN'}
              onTranscript={handleVoiceAnswer}
            />
          </div>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-6 leading-snug">
          {isHi ? currentQ.question_hi : currentQ.question}
        </h2>

        {/* Options Grid */}
        <div className="space-y-3 mb-6">
          {optionsList.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let btnStyle = 'border-slate-200 hover:border-brand-400 hover:bg-slate-50 text-slate-800';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400';
              } else if (isSelected) {
                btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
              } else {
                btnStyle = 'border-slate-100 opacity-50 text-slate-400';
              }
            }

            return (
              <motion.button
                key={`${opt}-${idx}`}
                type="button"
                whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-2xl border-2 text-left font-semibold text-sm transition-all flex items-center justify-between ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isAnswered && (
                  <div>
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Explanation & Desi Analogy Box */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 pt-4 border-t border-slate-100"
            >
              <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-xs text-indigo-900 leading-relaxed">
                <strong>
                  {isHi ? 'यह उत्तर सही क्यों है (Why this is correct:)' : 'Why this is correct:'}
                </strong>{' '}
                {isHi ? currentQ.explanation_hi : currentQ.explanation}
              </div>

              <div className="p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-2xl text-xs text-amber-900 leading-relaxed">
                <strong>{isHi ? 'देसी उदाहरण (Desi Analogy):' : 'Desi Analogy:'}</strong>{' '}
                {isHi ? currentQ.desiAnalogy_hi : currentQ.desiAnalogy}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Button
                  fullWidth
                  size="lg"
                  variant="primary"
                  onClick={handleNext}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {currentIndex + 1 < totalQuestions ? t('quiz.next') : t('quiz.finish')}
                </Button>
                {currentIndex > 0 && currentIndex + 1 < totalQuestions && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setCurrentIndex(totalQuestions - 1);
                    }}
                  >
                    {isHi ? 'अंतिम प्रश्न' : 'Final Q'}
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => {
          setShowCelebration(false);
          router.push('/plan');
        }}
        score={score}
        totalQuestions={totalQuestions}
        starsEarned={score * 10}
        streakDays={activeChild?.streak_days || 6}
      />
    </div>
  );
}

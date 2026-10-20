'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SubjectChip } from '@/components/ui/SubjectChip';
import { AnimatedMindMap } from '@/components/ui/AnimatedMindMap';
import { Interactive3DSimulation } from '@/components/ui/Interactive3DSimulation';
import { ArrowRight, Sparkles, Zap, Award, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface LessonContent {
  title_en: string;
  title_hi: string;
  subject: string;
  example_title_en: string;
  example_title_hi: string;
  example_body_en: string;
  example_body_hi: string;
  desi_title_en: string;
  desi_title_hi: string;
  desi_body_en: string;
  desi_body_hi: string;
  steps_title_en: string;
  steps_title_hi: string;
  steps_en: string[];
  steps_hi: string[];
  formula_box_en: string;
  formula_box_hi: string;
  vocab: Array<{ term: string; hi: string }>;
  check_q_en: string;
  check_q_hi: string;
  options_en: string[];
  options_hi: string[];
  correctIdx: number;
  correct_msg_en: string;
  correct_msg_hi: string;
  retry_msg_en: string;
  retry_msg_hi: string;
  english_phrase_en: string;
  english_phrase_hi: string;
  english_tip_en: string;
  english_tip_hi: string;
}

const LESSON_LIBRARY: Record<string, LessonContent> = {
  motion: {
    title_en: 'Acceleration — Step-by-Step Pedagogy Guide',
    title_hi: 'त्वरण (Acceleration) — संपूर्ण स्पष्टीकरण',
    subject: 'Science',
    example_title_en: 'Pedaling a Bicycle Down an Open Street',
    example_title_hi: 'साइकिल की गति बढ़ाना',
    example_body_en:
      'When you pedal your bicycle harder down an empty road, your speed increases with every passing second. That rate of speed increase over time is what physicists call acceleration.',
    example_body_hi:
      'जब आप खाली सड़क पर अपनी साइकिल के पैडल तेजी से घुमाते हैं, तो प्रत्येक सेकंड आपकी गति बढ़ती जाती है। समय के साथ गति में होने वाले इसी बदलाव को हम भौतिक विज्ञान में "त्वरण" (Acceleration) कहते हैं।',
    desi_title_en: 'Jasprit Bumrah’s Run-Up & Auto-Rickshaw Throttle',
    desi_title_hi: 'जसप्रीत बुमराह का रन-अप और ऑटो-रिक्शा का थ्रॉटल',
    desi_body_en:
      'Think of Jasprit Bumrah running up to the bowling crease. He starts slowly, builds pace with every stride, and unleashes the ball at 145 km/h. That continuous pickup of speed is pure acceleration! Just like an auto-rickshaw twisting the throttle the second a Delhi traffic light turns green.',
    desi_body_hi:
      'क्रिकेट मैच में जब जसप्रीत बुमराह गेंद फेंकने के लिए बॉलिंग क्रीज की ओर दौड़ते हुए रफ्तार बढ़ाते हैं, तो वह शून्य से 145 किमी/घंटे की गति प्राप्त कर रहे होते हैं। वही "त्वरण" (Acceleration) है! ठीक वैसे ही, जब ट्रैफिक सिग्नल पर हरी बत्ती होते ही ऑटो ड्राइवर एक्सीलरेटर घुमाता है।',
    steps_title_en: 'The Mathematical Formula & Units',
    steps_title_hi: 'सूत्र और गणितीय नियम',
    steps_en: [
      'Initial Velocity (u) / आरंभिक वेग: The speed at the very starting moment (time = 0).',
      'Final Velocity (v) / अंतिम वेग: The speed achieved after time (t) has passed.',
    ],
    steps_hi: [
      'Initial Velocity (u) / आरंभिक वेग: वस्तु जिस गति से शुरू हुई (समय = 0 पर)।',
      'Final Velocity (v) / अंतिम वेग: समय (t) बीतने के बाद प्राप्त की गई गति।',
    ],
    formula_box_en: 'Formula: a = (v - u) / t | SI Unit: m/s² (meters per second squared)',
    formula_box_hi: 'सूत्र (Formula): a = (v - u) / t | SI मात्रक: m/s² (मीटर प्रति सेकंड वर्ग)',
    vocab: [
      { term: 'Acceleration', hi: 'त्वरण — वेग परिवर्तन की दर' },
      { term: 'Deceleration / Retardation', hi: 'मंदन — गति का धीमा होना' },
      { term: 'Initial Velocity (u)', hi: 'आरंभिक वेग — शुरुआती गति' },
      { term: 'Uniform Motion', hi: 'समान गति — एकसमान चाल' },
    ],
    check_q_en: 'A car starts from rest (u = 0) and reaches 20 m/s in 5 seconds. What is its acceleration?',
    check_q_hi:
      'यदि कोई कार स्थिर अवस्था (u = 0) से शुरू होकर 5 सेकंड में 20 m/s की गति प्राप्त करती है, तो त्वरण (a) क्या होगा?',
    options_en: ['2 m/s²', '4 m/s²', '5 m/s²', '100 m/s²'],
    options_hi: ['2 m/s²', '4 m/s²', '5 m/s²', '100 m/s²'],
    correctIdx: 1,
    correct_msg_en: '✓ Correct! a = (20 - 0)/5 = 4 m/s². You understood the formula!',
    correct_msg_hi: '✓ बिल्कुल सही! a = (20 - 0)/5 = 4 m/s²। आपने सूत्र को अच्छी तरह समझ लिया!',
    retry_msg_en: 'Calculation reminder: a = (v - u)/t = (20 - 0)/5 = 4 m/s².',
    retry_msg_hi: 'गणना संकेत: a = (v - u)/t = (20 - 0)/5 = 4 m/s²।',
    english_phrase_en: '"The school bus accelerated quickly after turning the corner."',
    english_phrase_hi: '"मोड़ मुड़ने के बाद स्कूल बस ने तेजी से रफ्तार पकड़ी।"',
    english_tip_en: 'Practice saying this out loud when traveling in the morning!',
    english_tip_hi: 'सुबह यात्रा करते समय इस अंग्रेज़ी वाक्य को बोलकर अभ्यास करें!',
  },
  plants: {
    title_en: 'Photosynthesis & Leaf Venation — Junior Explorer Guide',
    title_hi: 'प्रकाश संश्लेषण और पत्ती शिरा-विन्यास — सरल स्पष्टीकरण',
    subject: 'Science',
    example_title_en: 'Watering a Tulsi Plant in the Morning Courtyard',
    example_title_hi: 'आंगन में तुलसी के पौधे को धूप और पानी देना',
    example_body_en:
      'When a green plant sits in bright morning sunlight and receives water through its roots, its green leaves prepare fresh food (glucose) for the whole plant and release oxygen for us to breathe.',
    example_body_hi:
      'जब आंगन में लगा तुलसी का पौधा सुबह की धूप पाता है और जड़ों से पानी खींचता है, तो उसकी हरी पत्तियां पूरे पौधे के लिए भोजन बनाती हैं और हमारे सांस लेने के लिए ऑक्सीजन छोड़ती हैं।',
    desi_title_en: 'Mummy’s Kitchen Pressure Cooker vs Leaf Kitchen',
    desi_title_hi: 'मम्मी की रसोई बनाम पौधे की हरी पत्ती की रसोई',
    desi_body_en:
      'Just like your home kitchen needs raw dal-rice (water + carbon dioxide), a gas stove flame (sunlight), and a cooking pot (green chlorophyll) to prepare lunch, a leaf is the busy kitchen of the plant!',
    desi_body_hi:
      'जैसे घर की रसोई में खाना बनाने के लिए कच्चा सामान (पानी + कार्बन डाइऑक्साइड), गैस की आंच (सूर्य का प्रकाश) और बर्तन (क्लोरोफिल) चाहिए, वैसे ही हरी पत्ती पौधे की रसोई है!',
    steps_title_en: 'How Photosynthesis & Leaf Veins Work',
    steps_title_hi: 'प्रकाश संश्लेषण और पत्ती की शिराओं के चरण',
    steps_en: [
      'Chlorophyll (पर्णहरित): The green pigment inside leaves that traps solar energy.',
      'Leaf Venation (शिरा-विन्यास): Net-like veins (Reticulate in Peepal/Mango) vs Parallel veins (in Grass/Wheat/Banana) transport water.',
    ],
    steps_hi: [
      'Chlorophyll (पर्णहरित): पत्तियों का हरा वर्णक जो सूर्य की ऊर्जा को पकड़ता है।',
      'Leaf Venation (शिरा-विन्यास): जालिका रूपी शिराएं (पीपल/आम में) और समांतर शिराएं (घास/गेहूं/केले में) पानी पहुंचाती हैं।',
    ],
    formula_box_en: 'Equation: Carbon Dioxide + Water + Sunlight (Chlorophyll) → Glucose + Oxygen',
    formula_box_hi: 'समीकरण: कार्बन डाइऑक्साइड + जल + सूर्य का प्रकाश (Chlorophyll) → ग्लूकोज + ऑक्सीजन',
    vocab: [
      { term: 'Photosynthesis', hi: 'प्रकाश संश्लेषण — धूप से भोजन बनाना' },
      { term: 'Chlorophyll', hi: 'पर्णहरित — पत्तियों का हरा कण' },
      { term: 'Reticulate Venation', hi: 'जालिका रूपी शिरा-विन्यास (जैसे पीपल)' },
      { term: 'Transpiration', hi: 'वाष्पोत्सर्जन — पत्तियों से जल वाष्प निकलना' },
    ],
    check_q_en: 'Which green pigment in leaves traps sunlight for photosynthesis?',
    check_q_hi: 'पत्तियों में मौजूद कौन सा हरा वर्णक प्रकाश संश्लेषण के लिए धूप को पकड़ता है?',
    options_en: ['Haemoglobin', 'Chlorophyll', 'Starch', 'Xylem'],
    options_hi: ['हीमोग्लोबिन (Haemoglobin)', 'क्लोरोफिल / पर्णहरित (Chlorophyll)', 'मंड (Starch)', 'जाइलम (Xylem)'],
    correctIdx: 1,
    correct_msg_en: '✓ Spot on! Chlorophyll is the green pigment that captures sunlight.',
    correct_msg_hi: '✓ बिल्कुल सही! क्लोरोफिल (Chlorophyll) ही सूर्य के प्रकाश को ग्रहण करता है।',
    retry_msg_en: 'Hint: Think of the green pigment inside leaves — Chlorophyll!',
    retry_msg_hi: 'संकेत: पत्तियों के हरे वर्णक को क्लोरोफिल (Chlorophyll) कहते हैं!',
    english_phrase_en: '"Green leaves prepare food through photosynthesis in bright sunlight."',
    english_phrase_hi: '"हरी पत्तियां तेज धूप में प्रकाश संश्लेषण द्वारा भोजन बनाती हैं।"',
    english_tip_en: 'Point to a plant in your balcony and share this sentence with your family!',
    english_tip_hi: 'अपने घर के किसी पौधे को देखकर परिवार के साथ यह अंग्रेज़ी वाक्य बोलें!',
  },
  polynomials: {
    title_en: 'Polynomials & Factor Theorem — Step-by-Step Guide',
    title_hi: 'बहुपद और गुणनखंड प्रमेय (Polynomials) — स्पष्टीकरण',
    subject: 'Mathematics',
    example_title_en: 'Packing Equal Sweet Boxes Without Leftovers',
    example_title_hi: 'मिठाई के डिब्बों में बिना शेष बचे बराबर लड्डू रखना',
    example_body_en:
      'When you divide 24 laddoos equally into boxes of 6, the remainder is 0 — which proves 6 is an exact factor of 24. In algebra, when P(a) = 0, (x - a) is an exact factor of polynomial P(x)!',
    example_body_hi:
      'जब आप 24 लड्डुओं को 6-6 के डिब्बों में बांटते हैं, तो शेषफल 0 बचता है — यानी 6 उसका सटीक गुणनखंड है। बीजगणित में जब P(a) = 0 होता है, तो (x - a) बहुपद P(x) का गुणनखंड होता है!',
    desi_title_en: 'Checking Bill Change at a Halwai Shop',
    desi_title_hi: 'हलवाई की दुकान पर सीधा मान रखकर जांच करना',
    desi_body_en:
      'Instead of doing long division on a full page, the Remainder Theorem lets you plug in x = a directly to check the leftover in 10 seconds!',
    desi_body_hi:
      'पूरे पन्ने का लंबा भाग (Long Division) करने के बजाय, शेषफल प्रमेय से सीधे x = a रखकर 10 सेकंड में शेषफल पता चल जाता है!',
    steps_title_en: 'Remainder & Factor Theorem Rules',
    steps_title_hi: 'शेषफल और गुणनखंड प्रमेय के नियम',
    steps_en: [
      'Zero of a Polynomial (शून्यक): Value of x for which P(x) becomes 0.',
      'Factor Theorem (गुणनखंड प्रमेय): If P(a) = 0, then (x - a) divides P(x) completely.',
    ],
    steps_hi: [
      'Zero of a Polynomial (बहुपद का शून्यक): x का वह मान जिस पर P(x) = 0 हो जाए।',
      'Factor Theorem (गुणनखंड प्रमेय): यदि P(a) = 0 है, तो (x - a) बहुपद का पूर्ण गुणनखंड है।',
    ],
    formula_box_en: 'Identity: x² - y² = (x - y)(x + y) | Factor Rule: P(a) = 0 ⇔ (x - a) is a factor',
    formula_box_hi: 'सर्वसमिका: x² - y² = (x - y)(x + y) | नियम: P(a) = 0 ⇔ (x - a) गुणनखंड है',
    vocab: [
      { term: 'Polynomial', hi: 'बहुपद — अनेक पदों वाला बीजीय व्यंजक' },
      { term: 'Remainder Theorem', hi: 'शेषफल प्रमेय' },
      { term: 'Factor Theorem', hi: 'गुणनखंड प्रमेय' },
      { term: 'Degree of Polynomial', hi: 'बहुपद की घात (उच्चतम घात)' },
    ],
    check_q_en: 'If P(x) = x² - 9, what is the value of P(3)?',
    check_q_hi: 'यदि P(x) = x² - 9 है, तो P(3) का मान क्या होगा?',
    options_en: ['6', '0', '9', '18'],
    options_hi: ['6', '0', '9', '18'],
    correctIdx: 1,
    correct_msg_en: '✓ Correct! P(3) = 3² - 9 = 9 - 9 = 0, so (x - 3) is a factor!',
    correct_msg_hi: '✓ बिल्कुल सही! P(3) = 3² - 9 = 0, अतः (x - 3) एक गुणनखंड है!',
    retry_msg_en: 'Substitute x = 3: 3² - 9 = 9 - 9 = 0.',
    retry_msg_hi: 'x = 3 रखें: 3² - 9 = 9 - 9 = 0।',
    english_phrase_en: '"Since the remainder is zero, x minus three is an exact factor."',
    english_phrase_hi: '"चूंकि शेषफल शून्य है, इसलिए x ऋण तीन एक सटीक गुणनखंड है।"',
    english_tip_en: 'Use this sentence when explaining your algebra steps in class!',
    english_tip_hi: 'कक्षा में अपने गणित के चरण समझाते समय इस वाक्य का प्रयोग करें!',
  },
};

export default function ExplainPage() {
  const {
    activeChild,
    activeSyllabus,
    selectedExplainChapterIdx,
    setSelectedExplainChapterIdx,
    themeVariant,
    t,
    locale,
  } = useApp();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'explanation' | 'simulation' | 'mindmap'>('explanation');

  const isHi = locale === 'hi';
  const isJunior = themeVariant === 'junior';

  const currentChapter =
    activeSyllabus.chapters[selectedExplainChapterIdx] || activeSyllabus.chapters[0];

  // Choose matching lesson content based on selected chapter or child grade
  const chapterLower = (currentChapter?.title || '').toLowerCase();
  const activeLesson =
    chapterLower.includes('plant') || (isJunior && selectedExplainChapterIdx === 0)
      ? LESSON_LIBRARY.plants
      : chapterLower.includes('polynomial') || chapterLower.includes('fraction')
      ? LESSON_LIBRARY.polynomials
      : LESSON_LIBRARY.motion;

  // Dynamic Mind Map built from the active chapter's topics!
  const topicsEn = currentChapter?.topics || [
    'Distance & Displacement',
    'Speed & Velocity',
    'Acceleration (a)',
    '3 Equations of Motion',
  ];
  const topicsHi = currentChapter?.topics_hi || topicsEn;

  const mindMapData = {
    title: isHi ? currentChapter?.title_hi || currentChapter?.title : currentChapter?.title || 'Motion & Equations',
    subject: currentChapter?.subject || 'Science',
    nodes: [
      {
        id: 'node_root',
        label: currentChapter?.title || 'Motion (गति)',
        label_hi: currentChapter?.title_hi || currentChapter?.title,
        level: 0,
        marks_weight: currentChapter?.weight || 10,
        x: 380,
        y: 55,
      },
      ...topicsEn.slice(0, 4).map((tName, idx) => {
        const xs = [130, 290, 470, 630];
        const ys = [175, 205, 180, 210];
        return {
          id: `node_${idx + 1}`,
          label: tName,
          label_hi: topicsHi[idx] || tName,
          level: 1,
          marks_weight: Math.max(2, Math.round((currentChapter?.weight || 10) / 4)),
          x: xs[idx] || 300,
          y: ys[idx] || 185,
        };
      }),
      ...topicsEn.slice(0, 4).map((tName, idx) => {
        const xs = [130, 290, 470, 630];
        const ys = [270, 295, 275, 300];
        const subEn = ['Core Concept', 'SI Unit & Rule', 'Formula Application', 'NCERT Numericals'];
        const subHi = ['मूल सिद्धांत', 'मानक मात्रक व नियम', 'सूत्र अनुप्रयोग', 'NCERT अभ्यास'];
        return {
          id: `node_${idx + 1}_sub`,
          label: subEn[idx] || tName,
          label_hi: subHi[idx] || tName,
          level: 2,
          x: xs[idx] || 300,
          y: ys[idx] || 280,
        };
      }),
    ],
    edges: [
      ...topicsEn.slice(0, 4).map((_, idx) => ({ from: 'node_root', to: `node_${idx + 1}` })),
      ...topicsEn.slice(0, 4).map((_, idx) => ({ from: `node_${idx + 1}`, to: `node_${idx + 1}_sub` })),
    ],
  };

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    setIsSubmitted(true);
  };

  const optionsList = isHi ? activeLesson.options_hi : activeLesson.options_en;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Chapter Selector Ribbon from Child's Syllabus Profile */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
          {isHi ? 'सिलेबस अध्याय:' : 'Syllabus Chapters:'}
        </span>
        {activeSyllabus.chapters.map((ch, idx) => {
          const isSelected = idx === selectedExplainChapterIdx;
          return (
            <button
              key={`${ch.subject}-${ch.number}`}
              type="button"
              onClick={() => {
                setSelectedExplainChapterIdx(idx);
                setSelectedOption(null);
                setIsSubmitted(false);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 border ${
                isSelected
                  ? 'bg-brand-600 text-white border-brand-600 shadow-soft-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'
              }`}
            >
              {isHi ? `अध्याय ${ch.number}: ${ch.title_hi.split('(')[0]}` : `Ch ${ch.number}: ${ch.title.split('(')[0]}`}
            </button>
          );
        })}
      </div>

      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <SubjectChip subject={currentChapter?.subject || activeLesson.subject} />
            <Badge variant="purple" size="sm">
              {t('profile.grade')} {activeChild?.grade_level || 9} • {activeChild?.board || 'CBSE'}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isHi ? activeLesson.title_hi : activeLesson.title_en}
          </h1>
        </div>

        {/* View Switcher Tabs with 3D Bevels */}
        <div className="inline-flex p-1 bg-white rounded-2xl border-2 border-slate-200 shadow-soft-sm self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('explanation')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'explanation'
                ? 'btn-3d btn-3d-indigo text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('explain.title')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('simulation')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'simulation'
                ? 'btn-3d btn-3d-amber text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>⚡</span>
            <span>{isHi ? '3D सिमुलेशन लैब' : '3D Sim Lab'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mindmap')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'mindmap'
                ? 'btn-3d btn-3d-purple text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('explain.mind_map_tab')}
          </button>
        </div>
      </div>

      {activeTab === 'simulation' ? (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
          <Interactive3DSimulation locale={locale} />
          <div className="p-4 bg-amber-500/10 border-2 border-amber-300 rounded-3xl text-xs text-amber-950 flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold">
              {isHi
                ? '💡 थ्रॉटल स्लाइडर को घुमाकर देखें कि समय के साथ वेग (Velocity) कैसे बढ़ता है।'
                : '💡 Drag the throttle slider in the 3D lab to observe acceleration velocity changes in real time.'}
            </span>
            <Button size="sm" variant="secondary" onClick={() => setActiveTab('explanation')}>
              {isHi ? 'सिद्धांत व्याख्या देखें' : 'View Concept Breakdown'}
            </Button>
          </div>
        </motion.div>
      ) : activeTab === 'mindmap' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <AnimatedMindMap data={mindMapData} />
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-3xl text-xs text-indigo-900 flex flex-wrap items-center justify-between gap-2">
            <span>
              {isHi
                ? '💡 किसी भी नोड पर टैप करके संबंधित सूक्ष्म-अभ्यास प्रश्न खोलें।'
                : '💡 Tap any node to highlight its marks weightage and concept connections.'}
            </span>
            <Button size="sm" variant="outline" onClick={() => setActiveTab('explanation')}>
              {isHi ? 'व्याख्या पर वापस जाएं' : 'Return to Explanation'}
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          {/* Section 1: Simple Real-World Example */}
          <Card className="p-5 sm:p-6 bg-gradient-to-br from-white to-blue-50/30 border-l-4 border-l-blue-500">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
              {t('explain.example_label')}
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {isHi ? activeLesson.example_title_hi : activeLesson.example_title_en}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {isHi ? activeLesson.example_body_hi : activeLesson.example_body_en}
            </p>
          </Card>

          {/* Section 2: Desi-Life Analogy */}
          <Card className="p-5 sm:p-6 bg-gradient-to-br from-white to-amber-50/40 border-l-4 border-l-amber-500">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
              🏏 {t('explain.desi_label')}
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {isHi ? activeLesson.desi_title_hi : activeLesson.desi_title_en}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {isHi ? activeLesson.desi_body_hi : activeLesson.desi_body_en}
            </p>
          </Card>

          {/* Section 2.5: Interactive 3D Physics Lab Launchpad */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-2 border-amber-400/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl shadow-lg shrink-0">
                ⚡
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                  {isHi ? 'इंटरैक्टिव 3D भौतिकी सिमुलेटर' : 'Interactive 3D Physics Simulator'}
                </span>
                <h4 className="text-base font-black text-white">
                  {isHi ? 'लाइव 3D ट्रैक पर वेग और त्वरण का परीक्षण करें' : 'Feel Acceleration on the Live 3D Perspective Track'}
                </h4>
              </div>
            </div>
            <Button
              variant="accent"
              size="md"
              onClick={() => setActiveTab('simulation')}
              leftIcon={<Zap className="w-4 h-4 fill-white" />}
            >
              {isHi ? '3D लैब चलाएं' : 'Launch 3D Lab'}
            </Button>
          </div>

          {/* Section 3: Step-by-Step Breakdown with English Terms Highlighted */}
          <Card className="p-5 sm:p-6 border-l-4 border-l-brand-600">
            <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider block mb-1">
              📐 {t('explain.steps_label')}
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-3">
              {isHi ? activeLesson.steps_title_hi : activeLesson.steps_title_en}
            </h3>

            <div className="space-y-2.5 mb-5">
              {(isHi ? activeLesson.steps_hi : activeLesson.steps_en).map((stepStr, sIdx) => (
                <div
                  key={stepStr}
                  className="p-3 bg-slate-50 rounded-2xl flex items-start gap-2.5 text-xs text-slate-700"
                >
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <span>{stepStr}</span>
                </div>
              ))}
              <div className="p-3 bg-indigo-50/80 border border-indigo-200/60 rounded-2xl flex items-start gap-2.5 text-xs text-indigo-900 font-mono font-semibold">
                <span className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  3
                </span>
                <span>{isHi ? activeLesson.formula_box_hi : activeLesson.formula_box_en}</span>
              </div>
            </div>

            {/* English Vocab Highlights Table / Pills */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800 block mb-2">
                {t('explain.vocab_label')}:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeLesson.vocab.map((v) => (
                  <div key={v.term} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-brand-700">{v.term}</span>
                    <span className="text-xs text-slate-500 block font-devanagari">{v.hi}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Section 4: Rapid Check Question */}
          <Card className="p-5 sm:p-6 bg-gradient-to-br from-white to-purple-50/30 border-l-4 border-l-purple-500">
            <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block mb-1">
              ⚡ {t('explain.check_label')}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3">
              {isHi ? activeLesson.check_q_hi : activeLesson.check_q_en}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {optionsList.map((opt, idx) => {
                const isCorrect = idx === activeLesson.correctIdx;
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`p-3 rounded-2xl text-xs font-semibold text-left transition-all border ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                          : 'bg-rose-50 border-rose-500 text-rose-800'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {isSubmitted && (
              <div
                className={`p-3.5 rounded-2xl text-xs font-semibold ${
                  selectedOption === activeLesson.correctIdx
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border border-amber-200 text-amber-900'
                }`}
              >
                {selectedOption === activeLesson.correctIdx
                  ? isHi
                    ? activeLesson.correct_msg_hi
                    : activeLesson.correct_msg_en
                  : isHi
                  ? activeLesson.retry_msg_hi
                  : activeLesson.retry_msg_en}
              </div>
            )}
          </Card>

          {/* Section 5: Daily English Practice Phrase */}
          <Card className="p-5 sm:p-6 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl shadow-xl">
            <span className="text-[11px] font-bold text-brand-300 uppercase tracking-wider block mb-1">
              🗣️ {t('explain.practice_label')}
            </span>
            <div className="text-base font-bold text-white mb-1">
              {activeLesson.english_phrase_en}
            </div>
            <div className="text-xs text-indigo-200 font-devanagari mb-3">
              {activeLesson.english_phrase_hi}
            </div>
            <p className="text-[11px] text-slate-300">
              💡 <strong>{isHi ? 'अभ्यास संकेत:' : 'How to use:'}</strong>{' '}
              {isHi ? activeLesson.english_tip_hi : activeLesson.english_tip_en}
            </p>
          </Card>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Link href="/quiz">
              <Button size="lg" variant="accent" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {isHi ? 'दैनिक क्विज़ में अपना ज्ञान परखें' : 'Test Your Knowledge in Daily Quiz'}
              </Button>
            </Link>

            <Link href="/videos">
              <Button size="lg" variant="outline">
                {isHi ? 'चयनित शैक्षिक वीडियो देखें' : 'Watch Curated Video Lessons'}
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

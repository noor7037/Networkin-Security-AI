'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Compass,
  Sparkles,
  Award,
  GraduationCap,
  Briefcase,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Building2,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

interface CareerPath {
  id: string;
  title: string;
  title_hi: string;
  category: 'engineering' | 'medical' | 'defence' | 'civil_services' | 'commerce' | 'creative';
  icon: string;
  subjectCore: string;
  entranceExam: string;
  scholarshipMatched: string;
  overview: string;
  overview_hi: string;
  milestones: Array<{ year: string; step: string; step_hi: string }>;
  topInstitutions: string[];
}

export default function CareerPathwayPage() {
  const { activeChild, locale } = useApp();
  const isHi = locale === 'hi';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPathId, setSelectedPathId] = useState<string>('ai_eng');

  const careerPaths: CareerPath[] = [
    {
      id: 'ai_eng',
      title: 'AI & Robotics Engineer',
      title_hi: 'एआई और रोबोटिक्स इंजीनियर',
      category: 'engineering',
      icon: '🤖',
      subjectCore: 'Physics + Mathematics + Computer Science',
      entranceExam: 'JEE Main & Advanced / State CETs',
      scholarshipMatched: 'INSPIRE Scholarship (₹80,000/yr)',
      overview:
        'Design autonomous robots, neural networks, and aerospace automation systems. High global demand across ISRO, robotics firms, and tech hubs.',
      overview_hi:
        'स्वायत्त रोबोट, एआई मॉडल और अंतरिक्ष तकनीक का निर्माण। इसरो (ISRO), डीआरडीओ और वैश्विक तकनीक कंपनियों में भारी मांग।',
      milestones: [
        { year: 'Class 10', step: '90%+ in Math & Science + NMMS / Olympiad Prep', step_hi: 'गणित व विज्ञान में 90%+ और ओलंपियाड तैयारी' },
        { year: 'Class 11–12', step: 'PCM Stream + JEE Advanced Coaching / Self-study', step_hi: 'पीसीएम (PCM) विषय + जेईई एडवांस तैयारी' },
        { year: 'Undergrad', step: 'B.Tech in Computer Science / AI / Robotics at IIT/NIT', step_hi: 'आईआईटी / एनआईटी से बी.टेक डिग्री' },
        { year: 'Career Launch', step: 'R&D Lab / Aerospace / Tech Engineering Leader', step_hi: 'वैज्ञानिक शोध प्रयोगशाला अथवा तकनीक विशेषज्ञ' },
      ],
      topInstitutions: ['IIT Bombay', 'IIT Delhi', 'IISc Bengaluru', 'IIIT Hyderabad'],
    },
    {
      id: 'doctor',
      title: 'Surgeon / Medical Specialist',
      title_hi: 'शल्य चिकित्सक / मेडिकल विशेषज्ञ (MBBS/MD)',
      category: 'medical',
      icon: '🩺',
      subjectCore: 'Biology + Chemistry + Physics',
      entranceExam: 'NEET UG (National Eligibility cum Entrance Test)',
      scholarshipMatched: 'PM YASASVI Scholarship (₹75,000/yr)',
      overview:
        'Save lives, pioneer cures, and lead surgical healthcare. Highest societal trust and respected clinical career.',
      overview_hi:
        'रोगियों का उपचार, जटिल सर्जरी और जन-स्वास्थ्य सेवा। समाज में सर्वोच्च सम्मान और विश्वसनीयता का पेशा।',
      milestones: [
        { year: 'Class 10', step: 'Master Biology Life Processes & Chemistry Foundations', step_hi: 'जीव विज्ञान और रसायन विज्ञान की मजबूत नींव' },
        { year: 'Class 11–12', step: 'PCB Stream + NCERT Intensive Biology Mastery', step_hi: 'पीसीबी (PCB) स्ट्रीम + एनसीईआरटी पर पूर्ण अधिकार' },
        { year: 'MBBS (5.5 yrs)', step: 'Admission to AIIMS / Top Govt Medical College', step_hi: 'एम्स (AIIMS) या सरकारी मेडिकल कॉलेज में प्रवेश' },
        { year: 'Specialization', step: 'MD/MS in Cardiology, Neurology or Surgery', step_hi: 'सर्जरी, न्यूरोलॉजी या हृदय रोग में विशेषज्ञता' },
      ],
      topInstitutions: ['AIIMS New Delhi', 'CMC Vellore', 'JIPMER', 'KGMU Lucknow'],
    },
    {
      id: 'defence',
      title: 'Armed Forces Officer (Army / Navy / Air Force)',
      title_hi: 'सशस्त्र सेना अधिकारी (थल, नौसेना, वायुसेना - NDA)',
      category: 'defence',
      icon: '🇮🇳',
      subjectCore: 'General Science + Mathematics + English',
      entranceExam: 'UPSC NDA & NA Exam + SSB Interview',
      scholarshipMatched: 'Ministry of Defence Officer Training Stipend',
      overview:
        'Lead troops with honor, fly fighter aircraft, or command naval warships. Exemplary leadership and patriotic service.',
      overview_hi:
        'देश की सीमाओं की सुरक्षा, लड़ाकू विमान उड़ाना और नौसैनिक जहाजों का नेतृत्व। अद्वितीय सम्मान और शौर्य का जीवन।',
      milestones: [
        { year: 'Class 10', step: 'Physical Fitness + Math Foundation + NCC/Sports', step_hi: 'शारीरिक फिटनेस + गणितीय मजबूती + एनसीसी' },
        { year: 'Class 12', step: 'Crack UPSC NDA Written Exam in April / September', step_hi: 'कक्षा 12 में यूपीएससी एनडीए परीक्षा उत्तीर्ण करना' },
        { year: 'SSB (5 Days)', step: 'Officer Intelligence Rating & Psychological Board', step_hi: '5-दिवसीय एसएसबी साक्षात्कार और व्यक्तित्व परीक्षण' },
        { year: 'NDA Khadakwasla', step: '3-Year Tri-Services Academy Officer Commission', step_hi: 'खड़कवासला में 3-वर्षीय सैन्य नेतृत्व प्रशिक्षण' },
      ],
      topInstitutions: ['National Defence Academy (Khadakwasla)', 'Indian Military Academy (Dehradun)', 'Air Force Academy (Dundigal)'],
    },
    {
      id: 'civil_services',
      title: 'Civil Services / IAS / IPS Officer',
      title_hi: 'भारतीय प्रशासनिक सेवा (IAS / IPS / IFS)',
      category: 'civil_services',
      icon: '🏛️',
      subjectCore: 'Social Sciences + Current Affairs + Analytical Writing',
      entranceExam: 'UPSC Civil Services Examination (CSE)',
      scholarshipMatched: 'State Govt Merit Scholarships',
      overview:
        'Administer districts, formulate public policy, and drive national governance reforms affecting millions of citizens.',
      overview_hi:
        'जिलों का प्रशासन, नीतियों का निर्माण और जनकल्याणकारी योजनाओं का संचालन। देश के विकास में सीधी भागीदारी।',
      milestones: [
        { year: 'Class 10', step: 'Master History, Civics & Geography + Daily Newspaper Habit', step_hi: 'इतिहास, नागरिक शास्त्र और भूगोल की समझ + समाचार पत्र' },
        { year: 'Class 11–12', step: 'Any Stream (Hum/Comm/Sci) + Critical Essay Practice', step_hi: 'गहन अध्ययन और निबंध लेखन का निरंतर अभ्यास' },
        { year: 'Graduation', step: 'Degree in Economics, History, Engineering, or Law', step_hi: 'किसी भी संकाय से मान्यता प्राप्त स्नातक डिग्री' },
        { year: 'UPSC CSE', step: 'Prelims, Mains (9 papers) & Interview Board Cleared', step_hi: 'प्रारंभिक, मुख्य परीक्षा और व्यक्तित्व साक्षात्कार' },
      ],
      topInstitutions: ['LBSNAA Mussoorie', 'SVP National Police Academy Hyderabad'],
    },
  ];

  const filteredPaths =
    activeCategory === 'all'
      ? careerPaths
      : careerPaths.filter((p) => p.category === activeCategory);

  const selectedPath =
    careerPaths.find((p) => p.id === selectedPathId) || careerPaths[0];

  return (
    <div className="space-y-7 max-w-4xl mx-auto pb-8">
      {/* Top Hero Banner with 3D Depth */}
      <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-950 text-white p-6 sm:p-8 border-b-6 border-b-indigo-950 shadow-2xl">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-4xl shadow-xl shrink-0">
              🧭
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 text-white px-3 py-0.5 rounded-full border border-white/30">
                  {isHi ? 'भविष्य कैरियर रोडमैप' : 'Verified Career Pathways'}
                </span>
                <span className="text-[11px] font-bold bg-cyan-400 text-slate-900 px-2 py-0.5 rounded-full shadow-sm">
                  {isHi ? 'पाठ्यक्रम से कैरियर' : 'Syllabus to Ambition'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                {isHi ? 'विषय से भविष्य: आपके सपनों का रोडमैप' : 'Where Your School Subjects Can Lead'}
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100 font-medium mt-0.5 max-w-xl">
                {isHi
                  ? 'जानें कि आज का विज्ञान और गणित कल के किन प्रतिष्ठित प्रतियोगी परीक्षाओं और पेशों का मार्ग खोलता है।'
                  : 'Transparent, un-hyped pathways connecting school subjects to entrance exams, scholarships, and careers.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: isHi ? 'सभी मार्ग' : 'All Pathways' },
          { id: 'engineering', label: isHi ? 'इंजीनियरिंग व एआई' : 'Engineering & AI' },
          { id: 'medical', label: isHi ? 'चिकित्सा (Medical)' : 'Medical & Surgery' },
          { id: 'defence', label: isHi ? 'रक्षा सेवाएं (NDA)' : 'Armed Forces (NDA)' },
          { id: 'civil_services', label: isHi ? 'प्रशासनिक सेवा (IAS)' : 'Civil Services (IAS)' },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 cursor-pointer ${
              activeCategory === cat.id
                ? 'btn-3d btn-3d-indigo text-white'
                : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-brand-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left Column: Career Selection Cards */}
        <div className="space-y-3">
          {filteredPaths.map((path) => {
            const isSelected = path.id === selectedPathId;
            return (
              <div
                key={path.id}
                onClick={() => setSelectedPathId(path.id)}
                className={`p-4 rounded-3xl transition-all cursor-pointer select-none card-3d ${
                  isSelected
                    ? 'border-2 border-brand-500 bg-gradient-to-r from-indigo-50/70 to-white'
                    : 'bg-white hover:border-brand-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    {path.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-tight">
                      {isHi ? path.title_hi : path.title}
                    </h4>
                    <span className="text-[10px] font-bold text-brand-600 block mt-0.5">
                      {path.entranceExam.split('/')[0]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Career Roadmap Dossier */}
        <div className="md:col-span-2 space-y-5">
          <div className="p-6 sm:p-7 rounded-4xl bg-white card-3d card-3d-science">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{selectedPath.icon}</span>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {isHi ? selectedPath.title_hi : selectedPath.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    {isHi ? 'मुख्य विषय संयोजन: ' : 'Core Subjects: '}
                    <span className="text-brand-700">{selectedPath.subjectCore}</span>
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-6">
              {isHi ? selectedPath.overview_hi : selectedPath.overview}
            </p>

            {/* Crucial Info Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200">
                <span className="text-[10px] uppercase font-black text-amber-800 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  {isHi ? 'प्रमुख प्रवेश परीक्षा' : 'Required Entrance Exam'}
                </span>
                <div className="text-xs font-extrabold text-slate-900 mt-1">
                  {selectedPath.entranceExam}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                <span className="text-[10px] uppercase font-black text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {isHi ? 'संबद्ध सरकारी छात्रवृत्ति' : 'Linked Govt Scholarship'}
                </span>
                <div className="text-xs font-extrabold text-emerald-950 mt-1">
                  {selectedPath.scholarshipMatched}
                </div>
              </div>
            </div>

            {/* Step-by-Step Educational Milestones Timeline */}
            <div>
              <span className="text-xs uppercase font-black text-slate-700 block mb-3">
                {isHi ? 'चरणबद्ध प्रगति मील के पत्थर (Timeline)' : 'Educational Milestone Steps'}
              </span>

              <div className="space-y-3">
                {selectedPath.milestones.map((m, mIdx) => (
                  <div key={m.year} className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-150">
                    <span className="px-2.5 py-1 rounded-xl bg-brand-600 text-white font-mono font-black text-xs shrink-0 mt-0.5">
                      {m.year}
                    </span>
                    <div className="text-xs font-bold text-slate-800">
                      {isHi ? m.step_hi : m.step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Institutions List */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {isHi ? 'शीर्ष संस्थान (Target Colleges):' : 'Top Target Institutions:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPath.topInstitutions.map((inst) => (
                    <span key={inst} className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                      {inst}
                    </span>
                  ))}
                </div>
              </div>

              <Link href="/opportunities">
                <Button variant="accent" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                  {isHi ? 'पात्र छात्रवृत्तियां देखें' : 'View Scholarships'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

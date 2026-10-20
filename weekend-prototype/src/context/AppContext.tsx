'use client';

import React, { createContext, useContext, useState } from 'react';

export type Locale = 'en' | 'hi';
export type ThemeVariant = 'junior' | 'senior';
export type ViewRegister = 'student' | 'parent';

export interface ChildState {
  id: string;
  name: string;
  name_hi?: string;
  avatar: string;
  grade_level: number;
  board: string;
  state?: string;
  medium: string;
  stars_xp: number;
  streak_days: number;
}

export interface SyllabusChapterItem {
  number: number;
  subject: 'Science' | 'Mathematics' | 'English' | 'Social Science' | 'Hindi';
  title: string;
  title_hi: string;
  topics: string[];
  topics_hi: string[];
  weight: number;
}

export interface ChildSyllabusProfile {
  version: number;
  board: string;
  grade_level: number;
  confidence: number;
  lastUpdated: string;
  chapters: SyllabusChapterItem[];
}

export interface ChildPlanDay {
  date: string;
  day_number: number;
  subject: 'Science' | 'Mathematics' | 'English' | 'Social Science' | 'Hindi';
  chapter: string;
  chapter_hi: string;
  topic: string;
  topic_hi: string;
  status: 'pending' | 'completed' | 'missed';
  isToday: boolean;
}

export interface ChildStudyPlan {
  examDate: string;
  examTitle: string;
  examTitle_hi: string;
  reflowCount: number;
  days: ChildPlanDay[];
}

export interface ChildVaultEntry {
  id: string;
  date: string;
  type: 'quiz_streak' | 'scan' | 'certificate' | 'milestone';
  title: string;
  title_hi: string;
  description: string;
  description_hi: string;
  badge: string;
  category: string;
  category_hi: string;
}

export interface ChildSchoolData {
  isConnected: boolean;
  schoolName: string;
  schoolName_hi: string;
  studentSchoolId: string;
  section: string;
  attendance: {
    percentage: number;
    totalDays: number;
    presentDays: number;
    absences: number;
  };
  homework: Array<{
    id: string;
    subject: string;
    title: string;
    title_hi: string;
    dueDate: string;
    dueDate_hi: string;
    status: 'Pending' | 'Submitted';
  }>;
  notices: Array<{
    id: string;
    title: string;
    title_hi: string;
    date: string;
    category: string;
    content: string;
    content_hi: string;
  }>;
  reportCard: Array<{
    subject: string;
    subject_hi: string;
    marks: number;
    total: number;
    grade: string;
  }>;
  feeStanding: {
    termLabel: string;
    termLabel_hi: string;
    duesAmount: string;
    duesAmount_hi: string;
    nextDueDate: string;
    nextDueDate_hi: string;
  };
  disconnectSummary?: {
    retention_guarantee: string;
    retention_guarantee_hi: string;
    learning_vault_records_kept: number;
    study_plans_kept: number;
    quiz_history_kept: number;
  } | null;
}

export interface AppNotification {
  id: string;
  childId: string;
  childName: string;
  childAvatar: string;
  title: string;
  title_hi?: string;
  body: string;
  body_hi?: string;
  type: 'daily_plan' | 'quiz_reminder' | 'scheme_match' | 'milestone' | 'school_update';
  read: boolean;
  createdAt: string;
  createdAt_hi?: string;
  isFrequencyCapped?: boolean;
}

interface AppContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  viewRegister: ViewRegister;
  setViewRegister: (r: ViewRegister) => void;
  activeChild: ChildState | null;
  childrenList: ChildState[];
  setActiveChildId: (id: string) => void;
  addChild: (child: Omit<ChildState, 'id' | 'stars_xp' | 'streak_days'>) => void;
  themeVariant: ThemeVariant;
  t: (key: string) => string;
  parentPhone: string | null;
  setParentPhone: (phone: string | null) => void;
  logout: () => void;
  isNotificationOpen: boolean;
  openNotificationDrawer: () => void;
  closeNotificationDrawer: () => void;
  toggleNotificationDrawer: () => void;
  notifications: AppNotification[];
  unreadCount: number;
  cappedEventsCount: number;
  markAllAsRead: () => void;
  markNotificationRead: (id: string) => void;
  addNotification: (
    n: Omit<AppNotification, 'id' | 'createdAt' | 'read'> &
      Partial<Pick<AppNotification, 'id' | 'createdAt' | 'read'>>
  ) => { capped: boolean };
  // Per-child dynamic learning state
  activeSyllabus: ChildSyllabusProfile;
  updateChildSyllabus: (childId: string, chapters: SyllabusChapterItem[], incrementVersion?: boolean) => void;
  activeStudyPlan: ChildStudyPlan;
  reflowChildPlan: (childId: string) => void;
  togglePlanDayComplete: (childId: string, date: string) => void;
  activeVault: ChildVaultEntry[];
  addVaultMilestone: (childId: string, entry: Omit<ChildVaultEntry, 'id' | 'date'>) => void;
  activeWeakTopics: string[];
  recordQuizCompletion: (params: {
    childId: string;
    score: number;
    totalQuestions: number;
    subject: string;
    topic: string;
    topic_hi: string;
    weakTopicsDetected: string[];
  }) => void;
  activeSchool: ChildSchoolData;
  connectChildSchool: (childId: string, schoolCode: string) => void;
  disconnectChildSchool: (childId: string) => void;
  selectedExplainChapterIdx: number;
  setSelectedExplainChapterIdx: (idx: number) => void;
}

const DICTIONARY: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.understand': 'Understand',
    'nav.plan': 'Study Plan',
    'nav.quiz': 'Daily Quiz',
    'nav.doubt': 'Doubt Saathi',
    'nav.english': 'English 90-Day',
    'nav.careers': 'Careers',
    'nav.videos': 'Videos',
    'nav.vault': 'Vault',
    'nav.toolkit': 'Exam Toolkit',
    'nav.insight': 'Parent Insight',
    'nav.opportunities': 'Opportunities',
    'nav.school': 'School Connect',
    'nav.scan': 'Scan Syllabus',
    'nav.homework': 'Homework',

    // Header & Profile
    'app.tagline': 'Daily Syllabus Companion',
    'profile.switch': 'Switch Profile',
    'profile.add_child': 'Add Child',
    'profile.grade': 'Class',
    'profile.stars': 'Stars XP',
    'profile.streak': 'Day Streak',
    'register.student': 'Student Mode',
    'register.parent': 'Parent Mode',
    'theme.junior_badge': 'Junior Explorer Mode (Class 1–7)',
    'theme.senior_badge': 'Senior Board Prep Mode (Class 8–12)',

    // Login
    'login.title': 'Welcome to NetCyberAI Learning',
    'login.subtitle': 'Enter your guardian WhatsApp number to receive your instant 6-digit verification code.',
    'login.phone_placeholder': 'Guardian WhatsApp Number',
    'login.get_otp': 'Get Verification Code',
    'login.otp_placeholder': 'Enter 6-digit Code',
    'login.verify_btn': 'Verify & Enter Learning Space',
    'login.dev_hint': 'DPDP Act 2023 Compliant • Zero Aadhaar Stored • Instant Verification Code: 123456',
    'login.dev_quick': 'Instant Verified Sign-In',

    // Home
    'home.hero_title': "Today's Learning Focus",
    'home.start_quiz': 'Start Daily Quiz (5 Qs)',
    'home.start_quiz_senior': 'Start Daily Quiz (10 Qs)',
    'home.explain_cta': 'View Concept Breakdown',
    'home.mind_map_cta': 'Interactive Mind Map',
    'home.reflow_nudge': 'Plan auto-reflowed: 0 missed backlog.',
    'home.recent_scans': 'Syllabus Profile Active',

    // Syllabus Scan
    'scan.title': 'Syllabus & Textbook Scanner',
    'scan.subtitle': 'Photograph your textbook index, worksheet, or exam timetable to build your personal syllabus profile.',
    'scan.drag_drop': 'Tap to upload or capture syllabus photo',
    'scan.analyzing': 'Analyzing chapters, topics, and board patterns...',
    'scan.confirm_title': 'Extracted Syllabus Profile',
    'scan.clarifying_title': 'Quick Clarification Needed',

    // Explain
    'explain.title': 'Concept Breakdown',
    'explain.example_label': 'Real-World Example',
    'explain.desi_label': 'Desi-Life Analogy',
    'explain.steps_label': 'Step-by-Step Understanding',
    'explain.vocab_label': 'Exam-Facing English Vocabulary',
    'explain.check_label': 'Rapid Check Question',
    'explain.practice_label': 'Daily English Practice Phrase',
    'explain.mind_map_tab': 'Mind Map Visualization',
    'explain.videos_tab': 'Curated Videos',

    // Quiz
    'quiz.title': 'Daily Mastery Quiz',
    'quiz.next': 'Next Question',
    'quiz.submit': 'Submit Answer',
    'quiz.finish': 'See Results & Collect Stars',
    'quiz.score_title': 'Quiz Complete!',
    'quiz.stars_earned': 'Stars Earned',
    'quiz.keep_going': 'Return to Dashboard',

    // Opportunities
    'opp.title': 'Scholarships & Competitive Exams Radar',
    'opp.subtitle': '100% verified government schemes and national talent exams matched to your child’s class.',
    'opp.filter_all': 'All Opportunities',
    'opp.verified_badge': 'Verified Official Scheme',
    'opp.official_portal': 'Official Application Portal',
    'opp.founder_queue_btn': 'Founder Review Queue',

    // School Connect
    'school.title': 'School Connect (Optional)',
    'school.subtitle': 'Connect with your school ERP to mirror attendance and notices. Your standalone learning data always remains 100% yours.',
    'school.connected_badge': 'Connected School',
    'school.attendance': 'Attendance Record',
    'school.homework': 'School Homework Feed',
    'school.notices': 'Official School Notices',
    'school.fee_title': 'School Fee Standing (Separate & Optional)',
    'school.disconnect_btn': 'Disconnect School',
    'school.connect_btn': 'Connect School via OTP',

    // Notifications
    'notif.title': 'Notification Center',
    'notif.unread': 'New',
    'notif.cap_notice': 'Max 2 updates/day per child • Zero spam guaranteed',
    'notif.tray_tab': 'Alerts',
    'notif.digest_tab': 'Weekly WhatsApp Digest',
    'notif.mark_all_read': 'Mark All Read',
    'notif.empty_title': 'All Caught Up!',
    'notif.empty_desc': 'Your notifications are capped to protect your family time from notification fatigue.',
    'nav.notifications': 'Notifications',
  },
  hi: {
    // Nav
    'nav.home': 'मुख्य पृष्ठ',
    'nav.understand': 'समझें',
    'nav.plan': 'अध्ययन योजना',
    'nav.quiz': 'दैनिक क्विज़',
    'nav.doubt': 'डाउट साथी',
    'nav.english': 'अंग्रेज़ी 90-दिन',
    'nav.careers': 'कैरियर गाइड',
    'nav.videos': 'वीडियो लाइब्रेरी',
    'nav.vault': 'लर्निंग वॉल्ट',
    'nav.toolkit': 'परीक्षा टूलकिट',
    'nav.insight': 'अभिभावक रिपोर्ट',
    'nav.opportunities': 'छात्रवृत्ति व अवसर',
    'nav.school': 'स्कूल कनेक्ट',
    'nav.scan': 'सिलेबस स्कैन',
    'nav.homework': 'गृहकार्य',

    // Header & Profile
    'app.tagline': 'दैनिक सिलेबस व शिक्षा साथी',
    'profile.switch': 'बच्चा बदलें',
    'profile.add_child': 'नया बच्चा जोड़ें',
    'profile.grade': 'कक्षा',
    'profile.stars': 'सितारे (XP)',
    'profile.streak': 'दैनिक निरंतरता',
    'register.student': 'विद्यार्थी मोड',
    'register.parent': 'अभिभावक मोड',
    'theme.junior_badge': 'जूनियर एक्सप्लोरर मोड (कक्षा 1–7)',
    'theme.senior_badge': 'सीनियर बोर्ड परीक्षा मोड (कक्षा 8–12)',

    // Login
    'login.title': 'NetCyberAI लर्निंग में आपका स्वागत है',
    'login.subtitle': 'तुरंत 6-अंकीय सत्यापन कोड प्राप्त करने के लिए अपना व्हाट्सएप नंबर दर्ज करें।',
    'login.phone_placeholder': 'अभिभावक व्हाट्सएप नंबर',
    'login.get_otp': 'सत्यापन कोड भेजें',
    'login.otp_placeholder': '6-अंकीय कोड दर्ज करें',
    'login.verify_btn': 'सत्यापित करें और प्रवेश करें',
    'login.dev_hint': 'DPDP अधिनियम 2023 अनुपालक • शून्य आधार संग्रहण • त्वरित सत्यापन कोड: 123456',
    'login.dev_quick': 'त्वरित सत्यापित प्रवेश',

    // Home
    'home.hero_title': 'आज का अध्ययन लक्ष्य',
    'home.start_quiz': 'दैनिक क्विज़ शुरू करें (5 प्रश्न)',
    'home.start_quiz_senior': 'दैनिक क्विज़ शुरू करें (10 प्रश्न)',
    'home.explain_cta': 'सरल व्याख्या देखें',
    'home.mind_map_cta': 'इंटरैक्टिव माइंड मैप',
    'home.reflow_nudge': 'योजना स्वतः व्यवस्थित: कोई छूटा हुआ बैकलॉग नहीं।',
    'home.recent_scans': 'सिलेबस प्रोफ़ाइल सक्रिय है',

    // Syllabus Scan
    'scan.title': 'सिलेबस व पाठ्यपुस्तक स्कैनर',
    'scan.subtitle': 'अपनी पाठ्यपुस्तक, कार्यपत्रक या परीक्षा कार्यक्रम की फोटो खींचकर व्यक्तिगत सिलेबस प्रोफ़ाइल बनाएं।',
    'scan.drag_drop': 'सिलेबस की फोटो या दस्तावेज़ चुनें',
    'scan.analyzing': 'अध्याय, विषय और बोर्ड पैटर्न का विश्लेषण हो रहा है...',
    'scan.confirm_title': 'निकाला गया सिलेबस विवरण',
    'scan.clarifying_title': 'त्वरित स्पष्टीकरण आवश्यक',

    // Explain
    'explain.title': 'अवधारणा की सरल व्याख्या',
    'explain.example_label': 'दैनिक जीवन का वास्तविक उदाहरण',
    'explain.desi_label': 'देसी जीवन का सटीक उदाहरण',
    'explain.steps_label': 'चरण-दर-चरण समझ',
    'explain.vocab_label': 'परीक्षा हेतु आवश्यक अंग्रेज़ी शब्द',
    'explain.check_label': 'त्वरित समझ जांच प्रश्न',
    'explain.practice_label': 'दैनिक अंग्रेज़ी अभ्यास वाक्य',
    'explain.mind_map_tab': 'माइंड मैप दृश्य',
    'explain.videos_tab': 'चयनित शैक्षिक वीडियो',

    // Quiz
    'quiz.title': 'दैनिक दक्षता क्विज़',
    'quiz.next': 'अगला प्रश्न',
    'quiz.submit': 'उत्तर सबमिट करें',
    'quiz.finish': 'परिणाम देखें और सितारे पाएं',
    'quiz.score_title': 'क्विज़ पूरा हुआ!',
    'quiz.stars_earned': 'अर्जित सितारे',
    'quiz.keep_going': 'डैशबोर्ड पर वापस जाएं',

    // Opportunities
    'opp.title': 'छात्रवृत्तियां और प्रतियोगी परीक्षाएं',
    'opp.subtitle': '100% सत्यापित सरकारी योजनाएं और राष्ट्रीय प्रतिभा परीक्षाएं आपके बच्चे की कक्षा के अनुसार।',
    'opp.filter_all': 'सभी अवसर',
    'opp.verified_badge': 'सत्यापित आधिकारिक योजना',
    'opp.official_portal': 'आधिकारिक आवेदन पोर्टल',
    'opp.founder_queue_btn': 'फाउंडर समीक्षा कतार',

    // School Connect
    'school.title': 'स्कूल कनेक्ट (ऐच्छिक)',
    'school.subtitle': 'उपस्थिति और सूचनाएं देखने के लिए अपने स्कूल से जुड़ें। आपका अध्ययन डेटा हमेशा पूर्णतः सुरक्षित रहेगा।',
    'school.connected_badge': 'संबद्ध स्कूल',
    'school.attendance': 'उपस्थिति विवरण',
    'school.homework': 'स्कूल गृहकार्य',
    'school.notices': 'आधिकारिक स्कूल सूचनाएं',
    'school.fee_title': 'स्कूल फीस स्थिति (पृथक और ऐच्छिक)',
    'school.disconnect_btn': 'स्कूल से अलग करें',
    'school.connect_btn': 'ओटीपी द्वारा स्कूल से जुड़ें',

    // Notifications
    'notif.title': 'सूचना केंद्र',
    'notif.unread': 'नया',
    'notif.cap_notice': 'प्रति बच्चा अधिकतम 2 सूचनाएं/दिन • शून्य स्पैम गारंटी',
    'notif.tray_tab': 'सूचनाएं',
    'notif.digest_tab': 'साप्ताहिक व्हाट्सएप सारांश',
    'notif.mark_all_read': 'सभी पढ़े गए चिह्नित करें',
    'notif.empty_title': 'सब कुछ पढ़ा हुआ है!',
    'notif.empty_desc': 'परिवार के समय को सुरक्षित रखने के लिए सूचनाएं नियंत्रित रखी जाती हैं।',
    'nav.notifications': 'सूचनाएं',
  },
};

const DEFAULT_CHILDREN: ChildState[] = [
  {
    id: 'c_aarav',
    name: 'Aarav Sharma',
    name_hi: 'आरव शर्मा',
    avatar: '👦',
    grade_level: 6,
    board: 'CBSE',
    state: 'Haryana',
    medium: 'bilingual',
    stars_xp: 320,
    streak_days: 5,
  },
  {
    id: 'c_diya',
    name: 'Diya Sharma',
    name_hi: 'दिया शर्मा',
    avatar: '👧',
    grade_level: 10,
    board: 'CBSE',
    state: 'Haryana',
    medium: 'english',
    stars_xp: 890,
    streak_days: 12,
  },
];

const INITIAL_SYLLABI: Record<string, ChildSyllabusProfile> = {
  c_diya: {
    version: 2,
    board: 'CBSE',
    grade_level: 10,
    confidence: 0.96,
    lastUpdated: '2026-10-18',
    chapters: [
      {
        number: 8,
        subject: 'Science',
        title: 'Motion & Equations (गति एवं समीकरण)',
        title_hi: 'गति और गति के समीकरण (Motion & Equations)',
        topics: ['Distance vs Displacement', 'Velocity', 'Acceleration', 'Equations of Motion'],
        topics_hi: ['दूरी और विस्थापन', 'वेग (Velocity)', 'त्वरण (Acceleration)', 'गति के 3 समीकरण'],
        weight: 10,
      },
      {
        number: 6,
        subject: 'Science',
        title: 'Tissues & Life Processes (ऊतक एवं जैव प्रक्रम)',
        title_hi: 'ऊतक एवं जैव प्रक्रम (Tissues & Life Processes)',
        topics: ['Plant Tissues', 'Meristematic Tissue', 'Permanent Tissue', 'Animal Tissues'],
        topics_hi: ['पादप ऊतक', 'विभज्योतक ऊतक', 'स्थायी ऊतक', 'जंतु ऊतक'],
        weight: 8,
      },
      {
        number: 2,
        subject: 'Mathematics',
        title: 'Polynomials & Identities (बहुपद)',
        title_hi: 'बहुपद एवं बीजीय सर्वसमिकाएँ (Polynomials)',
        topics: ['Zeroes of a Polynomial', 'Remainder Theorem', 'Factor Theorem', 'Algebraic Identities'],
        topics_hi: ['बहुपद के शून्यक', 'शेषफल प्रमेय', 'गुणनखंड प्रमेय', 'बीजीय सर्वसमिकाएँ'],
        weight: 12,
      },
      {
        number: 9,
        subject: 'Science',
        title: 'Force and Laws of Motion (बल तथा गति के नियम)',
        title_hi: 'बल तथा गति के नियम (Force & Laws of Motion)',
        topics: ["Newton's Laws", 'Inertia & Momentum', 'Action-Reaction'],
        topics_hi: ['न्यूटन के गति नियम', 'जड़त्व और संवेग', 'क्रिया-प्रतिक्रिया नियम'],
        weight: 9,
      },
    ],
  },
  c_aarav: {
    version: 1,
    board: 'CBSE',
    grade_level: 6,
    confidence: 0.98,
    lastUpdated: '2026-10-17',
    chapters: [
      {
        number: 4,
        subject: 'Science',
        title: 'Getting to Know Plants (पौधों को जानिए)',
        title_hi: 'पौधों को जानिए एवं प्रकाश संश्लेषण (Plants & Photosynthesis)',
        topics: ['Herbs, Shrubs & Trees', 'Leaf Venation', 'Photosynthesis', 'Taproot vs Fibrous Root'],
        topics_hi: ['शाक, झाड़ी और वृक्ष', 'पत्ती शिरा-विन्यास', 'प्रकाश संश्लेषण (Photosynthesis)', 'मूसला जड़ बनाम रेशेदार जड़'],
        weight: 8,
      },
      {
        number: 7,
        subject: 'Mathematics',
        title: 'Fractions in Daily Life (भिन्न)',
        title_hi: 'दैनिक जीवन में भिन्न (Fractions)',
        topics: ['Proper & Improper Fractions', 'Equivalent Fractions', 'Like & Unlike Denominators', 'Adding Fractions'],
        topics_hi: ['उचित और विषम भिन्न', 'तुल्य भिन्न', 'समान और असमान हर', 'भिन्नों का जोड़'],
        weight: 10,
      },
      {
        number: 7,
        subject: 'Science',
        title: 'Motion and Measurement of Distances (गति एवं दूरियों का मापन)',
        title_hi: 'गति एवं दूरियों का मापन (Measurement of Distances)',
        topics: ['Standard SI Units (Meter)', 'Measuring Curved Lines', 'Rectilinear vs Circular Motion', 'Periodic Motion'],
        topics_hi: ['मानक SI मात्रक (मीटर)', 'वक्र रेखाओं का मापन', 'सरल रेखीय व वृत्तीय गति', 'आवर्ती गति'],
        weight: 7,
      },
    ],
  },
};

const INITIAL_PLANS: Record<string, ChildStudyPlan> = {
  c_diya: {
    examDate: '2026-11-12',
    examTitle: 'CBSE Class 10 Term 1 Assessment (80 Marks)',
    examTitle_hi: 'CBSE कक्षा 10 टर्म-1 बोर्ड मूल्यांकन (80 अंक)',
    reflowCount: 0,
    days: [
      {
        date: '2026-10-18',
        day_number: 1,
        subject: 'Science',
        chapter: 'Motion (गति)',
        chapter_hi: 'अध्याय 8: गति (Motion)',
        topic: 'Acceleration & Equations of Motion',
        topic_hi: 'त्वरण और गति के समीकरण (Acceleration & Formulas)',
        status: 'pending',
        isToday: true,
      },
      {
        date: '2026-10-19',
        day_number: 2,
        subject: 'Science',
        chapter: 'Motion (गति)',
        chapter_hi: 'अध्याय 8: गति (Motion)',
        topic: 'Velocity-Time Graphs & Slopes',
        topic_hi: 'वेग-समय ग्राफ और ढाल (v-t Graph Slopes)',
        status: 'pending',
        isToday: false,
      },
      {
        date: '2026-10-20',
        day_number: 3,
        subject: 'Mathematics',
        chapter: 'Polynomials (बहुपद)',
        chapter_hi: 'अध्याय 2: बहुपद (Polynomials)',
        topic: 'Factor Theorem & Algebraic Identities',
        topic_hi: 'गुणनखंड प्रमेय और बीजीय सर्वसमिकाएँ',
        status: 'pending',
        isToday: false,
      },
      {
        date: '2026-10-21',
        day_number: 4,
        subject: 'Science',
        chapter: 'Tissues (ऊतक)',
        chapter_hi: 'अध्याय 6: ऊतक (Tissues)',
        topic: 'Plant Meristematic vs Permanent Tissue',
        topic_hi: 'पादप विभज्योतक बनाम स्थायी ऊतक',
        status: 'pending',
        isToday: false,
      },
      {
        date: '2026-10-22',
        day_number: 5,
        subject: 'English',
        chapter: 'The Sound of Music',
        chapter_hi: 'अध्याय 2: द साउंड ऑफ म्यूजिक',
        topic: 'Reading Comprehension & Evelyn Glennie Themes',
        topic_hi: 'पठन बोध और एवलिन ग्लेनी के मुख्य विचार',
        status: 'pending',
        isToday: false,
      },
      {
        date: '2026-10-23',
        day_number: 6,
        subject: 'Mathematics',
        chapter: 'Lines & Angles (रेखाएँ और कोण)',
        chapter_hi: 'अध्याय 6: रेखाएँ और कोण',
        topic: 'Parallel Lines & Transversal Theorems',
        topic_hi: 'समांतर रेखाएँ और तिर्यक छेदी प्रमेय',
        status: 'pending',
        isToday: false,
      },
      {
        date: '2026-10-24',
        day_number: 7,
        subject: 'Social Science',
        chapter: 'French Revolution',
        chapter_hi: 'अध्याय 1: फ्रांसीसी क्रांति',
        topic: 'Causes, Three Estates & Constitutional Monarchy',
        topic_hi: 'क्रांति के कारण, तीन एस्टेट और संवैधानिक राजतंत्र',
        status: 'pending',
        isToday: false,
      },
    ],
  },
  c_aarav: {
    examDate: '2026-11-18',
    examTitle: 'CBSE Class 6 Junior Term Discovery Assessment (50 Marks)',
    examTitle_hi: 'CBSE कक्षा 6 जूनियर टर्म मूल्यांकन (50 अंक)',
    reflowCount: 0,
    days: [
      {
        date: '2026-10-18',
        day_number: 1,
        subject: 'Science',
        chapter: 'Getting to Know Plants (पौधों को जानिए)',
        chapter_hi: 'अध्याय 4: पौधों को जानिए',
        topic: 'Photosynthesis & Leaf Venation Quest',
        topic_hi: 'प्रकाश संश्लेषण और पत्ती शिरा-विन्यास क्वेस्ट',
        status: 'pending',
        isToday: true,
      },
      {
        date: '2026-10-19',
        day_number: 2,
        subject: 'Mathematics',
        chapter: 'Fractions (भिन्न)',
        chapter_hi: 'अध्याय 7: भिन्न (Fractions)',
        topic: 'Sharing Rotis: Equivalent & Like Fractions',
        topic_hi: 'रोटी बांटना: तुल्य और समान भिन्न',
        status: 'pending',
        isToday: false,
      },
      {
        date: '2026-10-20',
        day_number: 3,
        subject: 'Science',
        chapter: 'Getting to Know Plants',
        chapter_hi: 'अध्याय 4: पौधों को जानिए',
        topic: 'Taproot vs Fibrous Roots in Our Garden',
        topic_hi: 'बगीचे में मूसला जड़ बनाम रेशेदार जड़',
        status: 'pending',
        isToday: false,
      },
      {
        date: '2026-10-21',
        day_number: 4,
        subject: 'Mathematics',
        chapter: 'Fractions (भिन्न)',
        chapter_hi: 'अध्याय 7: भिन्न (Fractions)',
        topic: 'Adding Fractions with Common Denominators',
        topic_hi: 'समान हर वाले भिन्नों का जोड़',
        status: 'pending',
        isToday: false,
      },
      {
        date: '2026-10-22',
        day_number: 5,
        subject: 'Science',
        chapter: 'Measurement of Distances',
        chapter_hi: 'अध्याय 7: गति एवं दूरियों का मापन',
        topic: 'Measuring with Standard Meter Scale',
        topic_hi: 'मानक मीटर स्केल से दूरी मापना',
        status: 'pending',
        isToday: false,
      },
      {
        date: '2026-10-23',
        day_number: 6,
        subject: 'English',
        chapter: "Who Did Patrick's Homework?",
        chapter_hi: 'अध्याय 1: पैट्रिक का गृहकार्य',
        topic: 'Story Vocabulary & Spoken Sentences',
        topic_hi: 'कहानी शब्दावली और बोलचाल के वाक्य',
        status: 'pending',
        isToday: false,
      },
      {
        date: '2026-10-24',
        day_number: 7,
        subject: 'Hindi',
        chapter: 'वह चिड़िया जो',
        chapter_hi: 'अध्याय 1: वह चिड़िया जो',
        topic: 'कविता भावार्थ और प्रकृति प्रेम',
        topic_hi: 'कविता भावार्थ और प्रकृति प्रेम',
        status: 'pending',
        isToday: false,
      },
    ],
  },
};

const INITIAL_VAULT: Record<string, ChildVaultEntry[]> = {
  c_diya: [
    {
      id: 'v1',
      date: '2026-10-18',
      type: 'quiz_streak',
      title: 'Mastered Acceleration & Formulas',
      title_hi: 'त्वरण और गति के सूत्रों में पूर्ण दक्षता',
      description: 'Scored 10/10 in Science Daily Mastery Quiz. Active streak reached 12 days!',
      description_hi: 'विज्ञान दैनिक क्विज़ में 10/10 अंक प्राप्त किए। निरंतरता 12 दिन पहुँची!',
      badge: '🏆',
      category: 'Quiz Milestone',
      category_hi: 'क्विज़ उपलब्धि',
    },
    {
      id: 'v2',
      date: '2026-10-16',
      type: 'scan',
      title: 'CBSE Class 10 Science & Math Syllabus Scanned (v2)',
      title_hi: 'CBSE कक्षा 10 विज्ञान व गणित सिलेबस स्कैन (संस्करण v2)',
      description: 'Extracted 14 chapters across Physics, Chemistry, Biology, and Algebra.',
      description_hi: 'भौतिकी, रसायन, जीव विज्ञान और बीजगणित के 14 अध्याय सफलतापूर्वक जोड़े गए।',
      badge: '📄',
      category: 'Syllabus Profile',
      category_hi: 'सिलेबस प्रोफ़ाइल',
    },
    {
      id: 'v3',
      date: '2026-10-12',
      type: 'certificate',
      title: 'National Science Olympiad (SOF NSO) Registered',
      title_hi: 'राष्ट्रीय विज्ञान ओलंपियाड (SOF NSO) पंजीकरण प्रमाणित',
      description: 'Registration verified on SOF official portal for Senior Level 1.',
      description_hi: 'सीनियर लेवल-1 के लिए आधिकारिक पोर्टल पर पंजीकरण सत्यापित।',
      badge: '🎖️',
      category: 'Competition Record',
      category_hi: 'प्रतियोगिता रिकॉर्ड',
    },
    {
      id: 'v4',
      date: '2026-10-05',
      type: 'milestone',
      title: 'Polynomials Algebraic Identities Cleared',
      title_hi: 'बहुपद बीजीय सर्वसमिकाएँ पूर्णतः स्पष्ट',
      description: 'Completed 3 day-wise practice cycles with zero weak topics remaining.',
      description_hi: 'शून्य कमजोर विषयों के साथ 3 दैनिक अभ्यास चक्र पूरे किए।',
      badge: '⭐',
      category: 'Math Concept',
      category_hi: 'गणित दक्षता',
    },
  ],
  c_aarav: [
    {
      id: 'va1',
      date: '2026-10-18',
      type: 'milestone',
      title: 'Junior Explorer Badge Unlocked: 300+ Stars XP!',
      title_hi: 'जूनियर एक्सप्लोरर बैज अनलॉक: 300+ सितारे (XP)!',
      description: 'Aarav completed 5 consecutive days of Class 6 Science & Fractions quests.',
      description_hi: 'आरव ने लगातार 5 दिनों तक कक्षा 6 विज्ञान और भिन्न क्वेस्ट पूरे किए।',
      badge: '🌟',
      category: 'Explorer Badge',
      category_hi: 'एक्सप्लोरर बैज',
    },
    {
      id: 'va2',
      date: '2026-10-15',
      type: 'quiz_streak',
      title: 'Plant Parts & Photosynthesis Star Champion',
      title_hi: 'पौधों के भाग और प्रकाश संश्लेषण स्टार चैंपियन',
      description: 'Scored 5/5 in Class 6 Science Quiz on Leaf Venation & Root Systems.',
      description_hi: 'पत्ती शिरा-विन्यास और जड़ प्रणाली क्विज़ में 5/5 अंक प्राप्त किए।',
      badge: '🌱',
      category: 'Science Quest',
      category_hi: 'विज्ञान क्वेस्ट',
    },
    {
      id: 'va3',
      date: '2026-10-10',
      type: 'certificate',
      title: 'Jawahar Navodaya Selection Test (JNVST) Prep Milestone',
      title_hi: 'जवाहर नवोदय चयन परीक्षा (JNVST) अभ्यास उपलब्धि',
      description: 'Completed Mental Ability & Arithmetic Fractions foundational module.',
      description_hi: 'मानसिक योग्यता और अंकगणित भिन्न मॉड्यूल सफलतापूर्वक पूरा किया।',
      badge: '🏅',
      category: 'Scholarship Prep',
      category_hi: 'छात्रवृत्ति तैयारी',
    },
  ],
};

const INITIAL_SCHOOLS: Record<string, ChildSchoolData> = {
  c_diya: {
    isConnected: true,
    schoolName: 'Delhi Public School, Sector 45',
    schoolName_hi: 'दिल्ली पब्लिक स्कूल, सेक्टर 45',
    studentSchoolId: 'SCH-2026-094',
    section: 'B',
    attendance: {
      percentage: 94.2,
      totalDays: 120,
      presentDays: 113,
      absences: 7,
    },
    homework: [
      {
        id: 'hw_1',
        subject: 'Science',
        title: 'Science — Motion NCERT Numerical Exercises 1 to 5',
        title_hi: 'विज्ञान — गति (Motion) NCERT संख्यात्मक प्रश्न 1 से 5',
        dueDate: 'Due Tomorrow 8:30 AM',
        dueDate_hi: 'कल सुबह 8:30 बजे तक देय',
        status: 'Pending',
      },
      {
        id: 'hw_2',
        subject: 'Mathematics',
        title: 'Mathematics — Polynomials Factor Theorem Worksheet',
        title_hi: 'गणित — बहुपद गुणनखंड प्रमेय कार्यपत्रक',
        dueDate: 'Submitted on Wednesday',
        dueDate_hi: 'बुधवार को जमा किया गया',
        status: 'Submitted',
      },
    ],
    notices: [
      {
        id: 'not_1',
        title: 'Pre-Board & Term 1 Assessment Schedule Released',
        title_hi: 'प्री-बोर्ड और टर्म-1 मूल्यांकन समय-सारणी जारी',
        date: '2026-10-18',
        category: 'Academic',
        content: 'Official CBSE Class 10 Term 1 practical and theory dates have been published. First paper begins Nov 12.',
        content_hi: 'आधिकारिक CBSE कक्षा 10 टर्म-1 परीक्षा तिथियां प्रकाशित हो चुकी हैं। पहली परीक्षा 12 नवंबर से शुरू होगी।',
      },
      {
        id: 'not_2',
        title: 'Inter-House Science Exhibition 2026',
        title_hi: 'अंतर-सदन विज्ञान प्रदर्शनी 2026',
        date: '2026-10-22',
        category: 'Event',
        content: 'Students participating in INSPIRE MANAK models should submit abstracts to the Physics Lab.',
        content_hi: 'इंस्पायर मानक मॉडल में भाग लेने वाले विद्यार्थी भौतिकी प्रयोगशाला में अपना सारांश जमा करें।',
      },
    ],
    reportCard: [
      { subject: 'Science', subject_hi: 'विज्ञान', marks: 92, total: 100, grade: 'A1' },
      { subject: 'Mathematics', subject_hi: 'गणित', marks: 88, total: 100, grade: 'A2' },
      { subject: 'English', subject_hi: 'अंग्रेज़ी', marks: 94, total: 100, grade: 'A1' },
      { subject: 'Social Science', subject_hi: 'सामाजिक विज्ञान', marks: 89, total: 100, grade: 'A2' },
    ],
    feeStanding: {
      termLabel: 'Term 2 Fee Status',
      termLabel_hi: 'टर्म 2 शुल्क स्थिति',
      duesAmount: '₹0 Dues Pending',
      duesAmount_hi: '₹0 बकाया (पूर्णतः भुगतान)',
      nextDueDate: 'Next Quarter: Nov 10',
      nextDueDate_hi: 'अगली तिमाही: 10 नवंबर',
    },
    disconnectSummary: null,
  },
  c_aarav: {
    isConnected: true,
    schoolName: 'Delhi Public School, Sector 45 (Junior Wing)',
    schoolName_hi: 'दिल्ली पब्लिक स्कूल, सेक्टर 45 (जूनियर विंग)',
    studentSchoolId: 'SCH-2026-312',
    section: 'A',
    attendance: {
      percentage: 96.7,
      totalDays: 120,
      presentDays: 116,
      absences: 4,
    },
    homework: [
      {
        id: 'hw_a1',
        subject: 'Science',
        title: 'Science — Draw Leaf Venation (Reticulate vs Parallel) in Herbarium Book',
        title_hi: 'विज्ञान — हर्बेरियम पुस्तिका में पत्ती शिरा-विन्यास (जालिका बनाम समांतर) का चित्र बनाएं',
        dueDate: 'Due Tomorrow 9:00 AM',
        dueDate_hi: 'कल सुबह 9:00 बजे तक देय',
        status: 'Pending',
      },
      {
        id: 'hw_a2',
        subject: 'Mathematics',
        title: 'Mathematics — Exercise 7.2 Proper & Equivalent Fractions',
        title_hi: 'गणित — प्रश्नावली 7.2 उचित एवं तुल्य भिन्न',
        dueDate: 'Submitted Yesterday',
        dueDate_hi: 'कल जमा किया गया',
        status: 'Submitted',
      },
    ],
    notices: [
      {
        id: 'not_a1',
        title: 'Junior Botanical Garden Field Visit',
        title_hi: 'जूनियर बॉटनिकल गार्डन शैक्षणिक भ्रमण',
        date: '2026-10-21',
        category: 'Activity',
        content: 'Class 6 students will visit the school herbal garden on Wednesday morning to observe herbs, shrubs, and trees.',
        content_hi: 'कक्षा 6 के विद्यार्थी बुधवार सुबह शाक, झाड़ी और वृक्षों का अवलोकन करने के लिए स्कूल हर्बल गार्डन जाएंगे।',
      },
    ],
    reportCard: [
      { subject: 'Science', subject_hi: 'विज्ञान', marks: 48, total: 50, grade: 'A1' },
      { subject: 'Mathematics', subject_hi: 'गणित', marks: 46, total: 50, grade: 'A1' },
      { subject: 'English', subject_hi: 'अंग्रेज़ी', marks: 47, total: 50, grade: 'A1' },
      { subject: 'Hindi', subject_hi: 'हिंदी', marks: 49, total: 50, grade: 'A1' },
    ],
    feeStanding: {
      termLabel: 'Term 2 Junior Wing Status',
      termLabel_hi: 'टर्म 2 जूनियर विंग शुल्क स्थिति',
      duesAmount: '₹0 Dues Pending',
      duesAmount_hi: '₹0 बकाया (पूर्णतः भुगतान)',
      nextDueDate: 'Next Quarter: Nov 10',
      nextDueDate_hi: 'अगली तिमाही: 10 नवंबर',
    },
    disconnectSummary: null,
  },
};

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    childId: 'c_diya',
    childName: 'Diya Sharma',
    childAvatar: '👧',
    title: 'Daily Study Plan Ready: Grade 10 Motion & Equations',
    title_hi: 'दैनिक अध्ययन योजना तैयार: कक्षा 10 गति और समीकरण',
    body: 'Today: 4 focused practice problems on Acceleration & v-t Graphs with step-by-step NCERT breakdown.',
    body_hi: 'आज का लक्ष्य: त्वरण और वेग-समय ग्राफ पर 4 मुख्य अभ्यास प्रश्न, चरण-दर-चरण NCERT व्याख्या के साथ।',
    type: 'daily_plan',
    read: false,
    createdAt: 'Today, 8:30 AM',
    createdAt_hi: 'आज, सुबह 8:30 बजे',
  },
  {
    id: 'notif_2',
    childId: 'c_aarav',
    childName: 'Aarav Sharma',
    childAvatar: '👦',
    title: 'Quick Science Quiz: Plants & Photosynthesis',
    title_hi: 'त्वरित विज्ञान क्विज़: पौधे और प्रकाश संश्लेषण',
    body: '5 fun multiple choice questions to keep Aarav’s 5-day streak alive!',
    body_hi: 'आरव की 5-दिन की अध्ययन निरंतरता बनाए रखने के लिए 5 रोचक बहुविकल्पीय प्रश्न!',
    type: 'quiz_reminder',
    read: false,
    createdAt: 'Today, 9:15 AM',
    createdAt_hi: 'आज, सुबह 9:15 बजे',
  },
  {
    id: 'notif_3',
    childId: 'c_diya',
    childName: 'Diya Sharma',
    childAvatar: '👧',
    title: 'New Opportunity Matched: NMMS Scholarship 2026',
    title_hi: 'नया अवसर मैच: राष्ट्रीय साधन-सह-मेधा छात्रवृत्ति (NMMSS) 2026',
    body: 'Diya matches all eligibility criteria for the ₹12,000/yr National Means-cum-Merit Scholarship.',
    body_hi: 'दिया ₹12,000/वर्ष की राष्ट्रीय साधन-सह-मेधा छात्रवृत्ति के सभी पात्रता मानदंडों को पूरा करती है।',
    type: 'scheme_match',
    read: true,
    createdAt: 'Yesterday, 2:00 PM',
    createdAt_hi: 'कल, दोपहर 2:00 बजे',
  },
  {
    id: 'notif_4',
    childId: 'c_aarav',
    childName: 'Aarav Sharma',
    childAvatar: '👦',
    title: 'Milestone Unlocked: 300+ Stars XP!',
    title_hi: 'नई उपलब्धि: 300+ सितारे (XP) पूरे!',
    body: 'Aarav earned the Junior Explorer badge after mastering the Plants & Fractions modules.',
    body_hi: 'पौधे और भिन्न मॉड्यूल में महारत हासिल करने पर आरव ने जूनियर एक्सप्लोरर बैज जीता।',
    type: 'milestone',
    read: true,
    createdAt: '2 days ago',
    createdAt_hi: '2 दिन पहले',
  },
  {
    id: 'notif_5',
    childId: 'c_diya',
    childName: 'Diya Sharma',
    childAvatar: '👧',
    title: 'Delhi Public School Notice: Pre-Board Schedule',
    title_hi: 'दिल्ली पब्लिक स्कूल सूचना: प्री-बोर्ड परीक्षा कार्यक्रम',
    body: 'School Connect: Official pre-board timetable released. First exam begins November 12th.',
    body_hi: 'स्कूल कनेक्ट: आधिकारिक प्री-बोर्ड समय-सारणी जारी। पहली परीक्षा 12 नवंबर से प्रारंभ।',
    type: 'school_update',
    read: false,
    createdAt: 'Today, 10:00 AM',
    createdAt_hi: 'आज, सुबह 10:00 बजे',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [viewRegister, setViewRegister] = useState<ViewRegister>('student');
  const [childrenList, setChildrenList] = useState<ChildState[]>(DEFAULT_CHILDREN);
  const [activeChildId, setActiveChildIdState] = useState<string>('c_diya');
  const [parentPhone, setParentPhone] = useState<string | null>('919876543210');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(DEFAULT_NOTIFICATIONS);
  const [cappedEventsCount, setCappedEventsCount] = useState<number>(0);

  // Per-child rich state maps
  const [syllabiByChild, setSyllabiByChild] = useState<Record<string, ChildSyllabusProfile>>(INITIAL_SYLLABI);
  const [plansByChild, setPlansByChild] = useState<Record<string, ChildStudyPlan>>(INITIAL_PLANS);
  const [vaultByChild, setVaultByChild] = useState<Record<string, ChildVaultEntry[]>>(INITIAL_VAULT);
  const [weakTopicsByChild, setWeakTopicsByChild] = useState<Record<string, string[]>>({
    c_diya: ['Velocity-Time Graph Slopes', 'Retardation Sign Convention'],
    c_aarav: ['Adding Unlike Fractions (LCM)'],
  });
  const [schoolsByChild, setSchoolsByChild] = useState<Record<string, ChildSchoolData>>(INITIAL_SCHOOLS);
  const [selectedExplainChapterIdx, setSelectedExplainChapterIdx] = useState<number>(0);

  const activeChild = childrenList.find((c) => c.id === activeChildId) || childrenList[0] || null;
  const themeVariant: ThemeVariant = activeChild && activeChild.grade_level <= 7 ? 'junior' : 'senior';

  const currentId = activeChild?.id || 'c_diya';
  const activeSyllabus =
    syllabiByChild[currentId] ||
    (themeVariant === 'junior' ? INITIAL_SYLLABI.c_aarav : INITIAL_SYLLABI.c_diya);
  const activeStudyPlan =
    plansByChild[currentId] ||
    (themeVariant === 'junior' ? INITIAL_PLANS.c_aarav : INITIAL_PLANS.c_diya);
  const activeVault =
    vaultByChild[currentId] ||
    (themeVariant === 'junior' ? INITIAL_VAULT.c_aarav : INITIAL_VAULT.c_diya);
  const activeWeakTopics = weakTopicsByChild[currentId] || [];
  const activeSchool =
    schoolsByChild[currentId] ||
    (themeVariant === 'junior' ? INITIAL_SCHOOLS.c_aarav : INITIAL_SCHOOLS.c_diya);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const openNotificationDrawer = () => setIsNotificationOpen(true);
  const closeNotificationDrawer = () => setIsNotificationOpen(false);
  const toggleNotificationDrawer = () => setIsNotificationOpen((prev) => !prev);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const addNotification = (
    n: Omit<AppNotification, 'id' | 'createdAt' | 'read'> &
      Partial<Pick<AppNotification, 'id' | 'createdAt' | 'read'>>
  ): { capped: boolean } => {
    // Enforce frequency cap: max 2 notifications created today per child
    const todayChildCount = notifications.filter(
      (item) =>
        item.childId === n.childId &&
        (item.createdAt.startsWith('Today') || item.createdAt === 'Just now')
    ).length;

    if (todayChildCount >= 3) {
      setCappedEventsCount((c) => c + 1);
      return { capped: true };
    }

    const newNotif: AppNotification = {
      id: n.id || 'notif_' + Math.random().toString(36).substring(2, 9),
      childId: n.childId,
      childName: n.childName,
      childAvatar: n.childAvatar,
      title: n.title,
      title_hi: n.title_hi || n.title,
      body: n.body,
      body_hi: n.body_hi || n.body,
      type: n.type,
      read: n.read ?? false,
      createdAt: n.createdAt || 'Just now',
      createdAt_hi: n.createdAt_hi || 'अभी',
    };
    setNotifications((prev) => [newNotif, ...prev]);
    return { capped: false };
  };

  const setActiveChildId = (id: string) => {
    setActiveChildIdState(id);
    setSelectedExplainChapterIdx(0);
  };

  const addChild = (newChild: Omit<ChildState, 'id' | 'stars_xp' | 'streak_days'>) => {
    const id = 'c_' + Math.random().toString(36).substring(2, 9);
    const isJun = newChild.grade_level <= 7;
    const created: ChildState = {
      ...newChild,
      name_hi: newChild.name_hi || newChild.name,
      id,
      stars_xp: 60,
      streak_days: 1,
    };
    setChildrenList((prev) => [...prev, created]);

    // Seed tailored per-child state so the new child has an isolated, class-appropriate workspace
    setSyllabiByChild((prev) => ({
      ...prev,
      [id]: {
        ...(isJun ? INITIAL_SYLLABI.c_aarav : INITIAL_SYLLABI.c_diya),
        version: 1,
        board: newChild.board,
        grade_level: newChild.grade_level,
      },
    }));
    setPlansByChild((prev) => ({
      ...prev,
      [id]: {
        ...(isJun ? INITIAL_PLANS.c_aarav : INITIAL_PLANS.c_diya),
        examTitle: `${newChild.board} Class ${newChild.grade_level} Term Assessment`,
        examTitle_hi: `${newChild.board} कक्षा ${newChild.grade_level} टर्म मूल्यांकन`,
      },
    }));
    setVaultByChild((prev) => ({
      ...prev,
      [id]: [
        {
          id: 'v_init_' + id,
          date: '2026-10-18',
          type: 'milestone',
          title: `${newChild.name}'s Learning Vault Initialized`,
          title_hi: `${newChild.name} का लर्निंग वॉल्ट प्रारंभ हुआ`,
          description: `Created personal Class ${newChild.grade_level} (${newChild.board}) learning space with +60 Welcome Stars XP.`,
          description_hi: `कक्षा ${newChild.grade_level} (${newChild.board}) व्यक्तिगत अध्ययन प्रोफ़ाइल +60 स्वागत सितारों के साथ बनी।`,
          badge: '🚀',
          category: 'Profile Milestone',
          category_hi: 'प्रोफ़ाइल उपलब्धि',
        },
      ],
    }));
    setSchoolsByChild((prev) => ({
      ...prev,
      [id]: {
        ...(isJun ? INITIAL_SCHOOLS.c_aarav : INITIAL_SCHOOLS.c_diya),
        isConnected: false,
      },
    }));
    setActiveChildIdState(id);
    setSelectedExplainChapterIdx(0);
  };

  const updateChildSyllabus = (
    childId: string,
    chapters: SyllabusChapterItem[],
    incrementVersion = true
  ) => {
    setSyllabiByChild((prev) => {
      const existing = prev[childId] || activeSyllabus;
      const nextVersion = incrementVersion ? existing.version + 1 : existing.version;
      return {
        ...prev,
        [childId]: {
          ...existing,
          version: nextVersion,
          confidence: 0.98,
          lastUpdated: '2026-10-18',
          chapters,
        },
      };
    });

    // Also update the day-wise study plan from the updated syllabus chapters
    setPlansByChild((prev) => {
      const existingPlan = prev[childId] || activeStudyPlan;
      const flatTopics: Array<{
        subject: SyllabusChapterItem['subject'];
        chapter: string;
        chapter_hi: string;
        topic: string;
        topic_hi: string;
      }> = [];
      chapters.forEach((ch) => {
        ch.topics.forEach((t, idx) => {
          flatTopics.push({
            subject: ch.subject,
            chapter: ch.title,
            chapter_hi: ch.title_hi || ch.title,
            topic: t,
            topic_hi: ch.topics_hi?.[idx] || t,
          });
        });
      });

      if (flatTopics.length === 0) return prev;

      const updatedDays = existingPlan.days.map((d, idx) => {
        const picked = flatTopics[idx % flatTopics.length];
        return {
          ...d,
          subject: picked.subject,
          chapter: picked.chapter,
          chapter_hi: picked.chapter_hi,
          topic: picked.topic,
          topic_hi: picked.topic_hi,
        };
      });

      return {
        ...prev,
        [childId]: {
          ...existingPlan,
          days: updatedDays,
        },
      };
    });
  };

  const reflowChildPlan = (childId: string) => {
    setPlansByChild((prev) => {
      const plan = prev[childId] || activeStudyPlan;
      const pendingDays = plan.days.filter((d) => d.status !== 'completed');
      const completedDays = plan.days.filter((d) => d.status === 'completed');
      const reordered = [...completedDays, ...pendingDays].map((d, idx) => ({
        ...d,
        day_number: idx + 1,
        status: d.status === 'missed' ? ('pending' as const) : d.status,
      }));
      return {
        ...prev,
        [childId]: {
          ...plan,
          reflowCount: plan.reflowCount + 1,
          days: reordered,
        },
      };
    });
  };

  const togglePlanDayComplete = (childId: string, date: string) => {
    setPlansByChild((prev) => {
      const plan = prev[childId] || activeStudyPlan;
      return {
        ...prev,
        [childId]: {
          ...plan,
          days: plan.days.map((d) =>
            d.date === date
              ? { ...d, status: d.status === 'completed' ? 'pending' : 'completed' }
              : d
          ),
        },
      };
    });
  };

  const addVaultMilestone = (
    childId: string,
    entry: Omit<ChildVaultEntry, 'id' | 'date'>
  ) => {
    const newEntry: ChildVaultEntry = {
      ...entry,
      id: 'v_' + Math.random().toString(36).substring(2, 9),
      date: '2026-10-18',
    };
    setVaultByChild((prev) => ({
      ...prev,
      [childId]: [newEntry, ...(prev[childId] || [])],
    }));
  };

  const recordQuizCompletion = (params: {
    childId: string;
    score: number;
    totalQuestions: number;
    subject: string;
    topic: string;
    topic_hi: string;
    weakTopicsDetected: string[];
  }) => {
    const starsEarned = params.score * 10;

    // 1. Update child XP & streak
    setChildrenList((prev) =>
      prev.map((c) =>
        c.id === params.childId
          ? {
              ...c,
              stars_xp: c.stars_xp + starsEarned,
              streak_days: c.streak_days + 1,
            }
          : c
      )
    );

    // 2. Mark today's study plan completed
    setPlansByChild((prev) => {
      const plan = prev[params.childId] || activeStudyPlan;
      return {
        ...prev,
        [params.childId]: {
          ...plan,
          days: plan.days.map((d, idx) => (idx === 0 ? { ...d, status: 'completed' } : d)),
        },
      };
    });

    // 3. Update weak topics for next-day resurfacing
    if (params.weakTopicsDetected.length > 0) {
      setWeakTopicsByChild((prev) => ({
        ...prev,
        [params.childId]: Array.from(
          new Set([...params.weakTopicsDetected, ...(prev[params.childId] || [])])
        ).slice(0, 4),
      }));
    }

    // 4. Add entry to child's Learning Vault
    addVaultMilestone(params.childId, {
      type: 'quiz_streak',
      title: `Completed ${params.topic} Quiz (${params.score}/${params.totalQuestions})`,
      title_hi: `${params.topic_hi} क्विज़ पूर्ण (${params.score}/${params.totalQuestions})`,
      description: `Earned +${starsEarned} Stars XP in ${params.subject} Daily Mastery Loop.`,
      description_hi: `${params.subject} दैनिक अभ्यास में +${starsEarned} सितारे (XP) अर्जित किए।`,
      badge: '🏆',
      category: 'Quiz Milestone',
      category_hi: 'क्विज़ उपलब्धि',
    });
  };

  const connectChildSchool = (childId: string, schoolCode: string) => {
    const schoolTitle = schoolCode.toUpperCase().includes('DPS')
      ? 'Delhi Public School, Sector 45'
      : 'St. Xavier International Academy';
    const schoolTitleHi = schoolCode.toUpperCase().includes('DPS')
      ? 'दिल्ली पब्लिक स्कूल, सेक्टर 45'
      : 'सेंट ज़ेवियर इंटरनेशनल अकादमी';

    setSchoolsByChild((prev) => {
      const curr = prev[childId] || activeSchool;
      return {
        ...prev,
        [childId]: {
          ...curr,
          isConnected: true,
          schoolName: schoolTitle,
          schoolName_hi: schoolTitleHi,
          disconnectSummary: null,
        },
      };
    });
  };

  const disconnectChildSchool = (childId: string) => {
    const vaultCount = (vaultByChild[childId] || activeVault).length;
    setSchoolsByChild((prev) => {
      const curr = prev[childId] || activeSchool;
      return {
        ...prev,
        [childId]: {
          ...curr,
          isConnected: false,
          disconnectSummary: {
            retention_guarantee:
              '100% of standalone learning profile, study plans, quiz history, and learning vault preserved permanently.',
            retention_guarantee_hi:
              'आपकी स्वतंत्र अध्ययन प्रोफ़ाइल, दैनिक योजना, क्विज़ इतिहास और लर्निंग वॉल्ट का 100% डेटा स्थायी रूप से सुरक्षित रखा गया है।',
            learning_vault_records_kept: Math.max(14, vaultCount),
            study_plans_kept: 1,
            quiz_history_kept: 28,
          },
        },
      };
    });
  };

  const logout = () => {
    setParentPhone(null);
  };

  const t = (key: string): string => {
    return DICTIONARY[locale]?.[key] || DICTIONARY['en']?.[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        locale,
        setLocale,
        viewRegister,
        setViewRegister,
        activeChild,
        childrenList,
        setActiveChildId,
        addChild,
        themeVariant,
        t,
        parentPhone,
        setParentPhone,
        logout,
        isNotificationOpen,
        openNotificationDrawer,
        closeNotificationDrawer,
        toggleNotificationDrawer,
        notifications,
        unreadCount,
        cappedEventsCount,
        markAllAsRead,
        markNotificationRead,
        addNotification,
        activeSyllabus,
        updateChildSyllabus,
        activeStudyPlan,
        reflowChildPlan,
        togglePlanDayComplete,
        activeVault,
        addVaultMilestone,
        activeWeakTopics,
        recordQuizCompletion,
        activeSchool,
        connectChildSchool,
        disconnectChildSchool,
        selectedExplainChapterIdx,
        setSelectedExplainChapterIdx,
      }}
    >
      <div
        data-theme-variant={themeVariant}
        data-view-register={viewRegister}
        className={
          themeVariant === 'junior'
            ? 'min-h-screen flex flex-col bg-gradient-to-b from-amber-50/35 via-slate-50 to-emerald-50/20'
            : 'min-h-screen flex flex-col bg-slate-50/90'
        }
      >
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

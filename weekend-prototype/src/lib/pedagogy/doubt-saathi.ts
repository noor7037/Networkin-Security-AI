export interface ChildProfileContext {
  id: string;
  name: string;
  grade_level: number;
  board: string;
  medium: string;
  streak_days: number;
  stars_xp: number;
}

export interface SyllabusContext {
  subject: string;
  activeChapter: string;
  topics: string[];
}

export interface QuizHistoryItem {
  subject: string;
  topic: string;
  score: number;
  total_questions: number;
  weak_topics: string[];
}

export interface DoubtSaathiPromptPayload {
  systemPrompt: string;
  userPrompt: string;
  metadata: {
    childId: string;
    childName: string;
    gradeLevel: number;
    medium: string;
    detectedWeakTopics: string[];
    isJunior: boolean;
  };
}

export function assembleDoubtSaathiContext(params: {
  child: ChildProfileContext;
  syllabus: SyllabusContext;
  quizHistory: QuizHistoryItem[];
  studentQuery: string;
  preferredLanguage?: 'en' | 'hi' | 'hinglish';
}): DoubtSaathiPromptPayload {
  const isJunior = params.child.grade_level <= 7;
  const lang = params.preferredLanguage || (params.child.medium === 'hindi' ? 'hi' : 'en');

  // Extract all weak topics from recent quiz attempts to reinforce learning
  const weakTopics = Array.from(
    new Set(params.quizHistory.flatMap((q) => q.weak_topics || []))
  );

  const systemPrompt = [
    `You are "Doubt Saathi", an expert Socratic AI learning companion created by NetCyberAI for Indian school students.`,
    `TARGET STUDENT: ${params.child.name}, Class ${params.child.grade_level} (${params.child.board} Board).`,
    `LANGUAGE INSTRUCTION: Explain in ${lang === 'hi' ? 'Hindi (Devanagari)' : lang === 'hinglish' ? 'Hinglish (conversational Hindi-English blend)' : 'clear Indian English'}.`,
    `PEDAGOGICAL GUARDRAILS:`,
    `1. Socratic Method: Never give bare direct answers to homework questions. Teach the underlying method so the student learns how to think.`,
    `2. Desi-Life Analogy: Every explanation MUST include a culturally relatable real-world Indian analogy (e.g., cricket, street markets, festivals, chai, bicycles).`,
    `3. Concept Verification: End with one quick multiple-choice check question to verify understanding.`,
    `4. Tone: Encouraging, supportive, age-appropriate for Class ${params.child.grade_level}.`,
  ].join('\n');

  const userPrompt = [
    `STUDENT CONTEXT:`,
    `- Current Chapter: ${params.syllabus.activeChapter} (${params.syllabus.subject})`,
    `- Syllabus Topics: ${params.syllabus.topics.join(', ')}`,
    weakTopics.length > 0 ? `- Previous Weak Topics to Reinforce: ${weakTopics.join(', ')}` : null,
    `- Learning Streak: ${params.child.streak_days} days | Stars: ${params.child.stars_xp} XP`,
    ``,
    `STUDENT QUERY:`,
    `"${params.studentQuery}"`,
  ]
    .filter(Boolean)
    .join('\n');

  return {
    systemPrompt,
    userPrompt,
    metadata: {
      childId: params.child.id,
      childName: params.child.name,
      gradeLevel: params.child.grade_level,
      medium: lang,
      detectedWeakTopics: weakTopics,
      isJunior,
    },
  };
}

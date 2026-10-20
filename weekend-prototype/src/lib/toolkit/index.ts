export interface ExamCountdown {
  days: number;
  hours: number;
  minutes: number;
  totalMilliseconds: number;
  isPast: boolean;
}

export interface BlueprintSection {
  name: string;
  sectionCode: string;
  questionsCount: number;
  marksPerQuestion: number;
  description: string;
}

export interface BlueprintSummary {
  sections: Array<BlueprintSection & { totalSectionMarks: number }>;
  totalMarks: number;
  totalQuestions: number;
  isStandard80Marks: boolean;
}

export interface SubjectTimetableEntry {
  subject: string;
  examDate: string;
  daysRemaining: number;
  chaptersCount: number;
  suggestedDaysPerChapter: number;
}

/**
 * Calculates countdown from reference date to exam date
 */
export function calculateExamCountdown(targetDate: string | Date, referenceDate: Date = new Date()): ExamCountdown {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const diffMs = target.getTime() - referenceDate.getTime();

  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      totalMilliseconds: 0,
      isPast: true,
    };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    days,
    hours,
    minutes,
    totalMilliseconds: diffMs,
    isPast: false,
  };
}

/**
 * Computes marks blueprint summation according to standard CBSE paper pattern
 */
export function calculateBlueprintMarksSum(sections: BlueprintSection[]): BlueprintSummary {
  let totalMarks = 0;
  let totalQuestions = 0;

  const sectionsWithMarks = sections.map((s) => {
    const totalSectionMarks = s.questionsCount * s.marksPerQuestion;
    totalMarks += totalSectionMarks;
    totalQuestions += s.questionsCount;
    return {
      ...s,
      totalSectionMarks,
    };
  });

  return {
    sections: sectionsWithMarks,
    totalMarks,
    totalQuestions,
    isStandard80Marks: totalMarks === 80,
  };
}

/**
 * Calculates timetable distribution across syllabus subjects until exam dates
 */
export function calculateSyllabusTimetable(params: {
  subjects: Array<{ name: string; examDate: string; chaptersCount: number }>;
  currentDate?: Date;
}): SubjectTimetableEntry[] {
  const now = params.currentDate || new Date();

  return params.subjects.map((sub) => {
    const examTime = new Date(sub.examDate).getTime();
    const daysRemaining = Math.max(0, Math.ceil((examTime - now.getTime()) / (1000 * 60 * 60 * 24)));
    const suggestedDaysPerChapter =
      sub.chaptersCount > 0 ? parseFloat((daysRemaining / sub.chaptersCount).toFixed(1)) : 0;

    return {
      subject: sub.name,
      examDate: sub.examDate,
      daysRemaining,
      chaptersCount: sub.chaptersCount,
      suggestedDaysPerChapter,
    };
  });
}

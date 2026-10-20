import { describe, it, expect } from 'vitest';
import {
  calculateExamCountdown,
  calculateBlueprintMarksSum,
  calculateSyllabusTimetable,
  BlueprintSection,
} from '../../src/lib/toolkit';

describe('A8: Exam-Day Toolkit Computations', () => {
  it('computes exact days, hours, and minutes for target exam countdown', () => {
    // Reference date: Oct 18, 2026, 09:00:00 UTC
    const refDate = new Date('2026-10-18T09:00:00.000Z');
    // Target exam: Nov 12, 2026, 09:00:00 UTC (exactly 25 days later)
    const examDate = new Date('2026-11-12T09:00:00.000Z');

    const countdown = calculateExamCountdown(examDate, refDate);

    expect(countdown.isPast).toBe(false);
    expect(countdown.days).toBe(25);
    expect(countdown.hours).toBe(0);
    expect(countdown.minutes).toBe(0);

    // Test with partial hours and minutes
    const examDateWithTime = new Date('2026-11-12T17:35:00.000Z');
    const cd2 = calculateExamCountdown(examDateWithTime, refDate);
    expect(cd2.days).toBe(25);
    expect(cd2.hours).toBe(8);
    expect(cd2.minutes).toBe(35);
  });

  it('marks isPast: true when exam date has elapsed', () => {
    const refDate = new Date('2026-10-18T09:00:00.000Z');
    const pastExamDate = new Date('2026-10-10T09:00:00.000Z');

    const countdown = calculateExamCountdown(pastExamDate, refDate);
    expect(countdown.isPast).toBe(true);
    expect(countdown.days).toBe(0);
  });

  it('sums CBSE question paper blueprint sections to exactly 80 theory marks', () => {
    const standardCbseBlueprint: BlueprintSection[] = [
      {
        sectionCode: 'A',
        name: 'Objective & MCQs',
        questionsCount: 20,
        marksPerQuestion: 1,
        description: 'Single-answer objective questions testing recall and understanding',
      },
      {
        sectionCode: 'B',
        name: 'Very Short Answer',
        questionsCount: 6,
        marksPerQuestion: 2,
        description: 'Brief conceptual questions (30-50 words)',
      },
      {
        sectionCode: 'C',
        name: 'Short Answer',
        questionsCount: 7,
        marksPerQuestion: 3,
        description: 'Numerical problems and definitions (50-80 words)',
      },
      {
        sectionCode: 'D',
        name: 'Long Answer & Derivations',
        questionsCount: 3,
        marksPerQuestion: 5,
        description: 'Complete proofs, derivations, and multi-part numericals',
      },
      {
        sectionCode: 'E',
        name: 'Case-Based Source Analysis',
        questionsCount: 3,
        marksPerQuestion: 4,
        description: 'Integrated case studies with real-world application sub-questions',
      },
    ];

    const result = calculateBlueprintMarksSum(standardCbseBlueprint);

    // Section calculations:
    // A: 20 * 1 = 20
    // B: 6 * 2 = 12
    // C: 7 * 3 = 21
    // D: 3 * 5 = 15
    // E: 3 * 4 = 12
    // Sum: 20 + 12 + 21 + 15 + 12 = 80 Marks!
    expect(result.sections[0].totalSectionMarks).toBe(20);
    expect(result.sections[1].totalSectionMarks).toBe(12);
    expect(result.sections[2].totalSectionMarks).toBe(21);
    expect(result.sections[3].totalSectionMarks).toBe(15);
    expect(result.sections[4].totalSectionMarks).toBe(12);

    expect(result.totalMarks).toBe(80);
    expect(result.totalQuestions).toBe(39);
    expect(result.isStandard80Marks).toBe(true);
  });

  it('calculates syllabus timetable pace and days remaining per subject', () => {
    const refDate = new Date('2026-10-18T00:00:00.000Z');
    const subjects = [
      { name: 'Science', examDate: '2026-11-12T00:00:00.000Z', chaptersCount: 5 },
      { name: 'Mathematics', examDate: '2026-11-18T00:00:00.000Z', chaptersCount: 6 },
      { name: 'English', examDate: '2026-11-24T00:00:00.000Z', chaptersCount: 4 },
    ];

    const timetable = calculateSyllabusTimetable({ subjects, currentDate: refDate });

    expect(timetable.length).toBe(3);
    expect(timetable[0].subject).toBe('Science');
    expect(timetable[0].daysRemaining).toBe(25);
    // 25 days / 5 chapters = 5.0 days per chapter
    expect(timetable[0].suggestedDaysPerChapter).toBe(5.0);

    expect(timetable[1].subject).toBe('Mathematics');
    expect(timetable[1].daysRemaining).toBe(31);
    // 31 days / 6 chapters = 5.2 days per chapter
    expect(timetable[1].suggestedDaysPerChapter).toBe(5.2);
  });
});

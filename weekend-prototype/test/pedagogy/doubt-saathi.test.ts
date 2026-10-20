import { describe, it, expect } from 'vitest';
import { assembleDoubtSaathiContext } from '../../src/lib/pedagogy/doubt-saathi';

describe('A6: Doubt Saathi Context Builder Assembly', () => {
  const mockChild = {
    id: 'c_diya',
    name: 'Diya Sharma',
    grade_level: 10,
    board: 'CBSE',
    medium: 'bilingual',
    streak_days: 12,
    stars_xp: 890,
  };

  const mockSyllabus = {
    subject: 'Science',
    activeChapter: 'Motion',
    topics: ['Acceleration', 'Velocity-Time Graphs', 'Equations of Motion'],
  };

  const mockQuizHistory = [
    {
      subject: 'Science',
      topic: 'Acceleration',
      score: 2,
      total_questions: 5,
      weak_topics: ['v-t graph slope calculations', 'retardation sign convention'],
    },
    {
      subject: 'Science',
      topic: 'Equations of Motion',
      score: 4,
      total_questions: 5,
      weak_topics: ['third equation of motion derivation'],
    },
  ];

  it('assembles child profile, grade level, and board into Socratic prompt', () => {
    const payload = assembleDoubtSaathiContext({
      child: mockChild,
      syllabus: mockSyllabus,
      quizHistory: mockQuizHistory,
      studentQuery: 'How do I find acceleration from a v-t graph?',
    });

    expect(payload.systemPrompt).toContain('Diya Sharma');
    expect(payload.systemPrompt).toContain('Class 10');
    expect(payload.systemPrompt).toContain('CBSE Board');
    expect(payload.metadata.childName).toBe('Diya Sharma');
    expect(payload.metadata.gradeLevel).toBe(10);
  });

  it('embeds active syllabus chapter and topics in student context', () => {
    const payload = assembleDoubtSaathiContext({
      child: mockChild,
      syllabus: mockSyllabus,
      quizHistory: mockQuizHistory,
      studentQuery: 'What is acceleration?',
    });

    expect(payload.userPrompt).toContain('Motion (Science)');
    expect(payload.userPrompt).toContain('Acceleration, Velocity-Time Graphs, Equations of Motion');
  });

  it('embeds weak topics from past quiz history for pedagogical reinforcement', () => {
    const payload = assembleDoubtSaathiContext({
      child: mockChild,
      syllabus: mockSyllabus,
      quizHistory: mockQuizHistory,
      studentQuery: 'I am confused about slopes.',
    });

    expect(payload.metadata.detectedWeakTopics).toContain('v-t graph slope calculations');
    expect(payload.metadata.detectedWeakTopics).toContain('retardation sign convention');
    expect(payload.metadata.detectedWeakTopics).toContain('third equation of motion derivation');
    expect(payload.userPrompt).toContain('v-t graph slope calculations');
  });

  it('configures pedagogical guardrails: Socratic method, desi analogy, no bare answers', () => {
    const payload = assembleDoubtSaathiContext({
      child: mockChild,
      syllabus: mockSyllabus,
      quizHistory: mockQuizHistory,
      studentQuery: 'Just give me the answer to question 4',
      preferredLanguage: 'hi',
    });

    expect(payload.systemPrompt).toContain('Never give bare direct answers');
    expect(payload.systemPrompt).toContain('Desi-Life Analogy');
    expect(payload.systemPrompt).toContain('Hindi (Devanagari)');
    expect(payload.metadata.medium).toBe('hi');
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { resetTestDb, query } from '../../src/lib/db';
import {
  generateStudyPlan,
  getStudyPlan,
  reflowMissedDays,
  completeQuiz,
  generateDailyQuizForChild,
} from '../../src/lib/plans-quizzes';
import { aiRouter } from '../../src/lib/ai-router';

describe('A4: Day-wise Study Plan & Quiz Loop', () => {
  const childId = 'child_plan_test';

  beforeEach(async () => {
    await resetTestDb();
    await query("INSERT INTO cx_parent_accounts (id, phone_number) VALUES ('p_test', '919876543210')");
    await query(
      "INSERT INTO cx_child_profiles (id, parent_id, name, grade_level, stars_xp, streak_days) VALUES ($1, 'p_test', 'Aarav', 9, 100, 2)",
      [childId]
    );
  });

  it('generates a day-wise plan until exam date', async () => {
    const futureExamDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const plan = await generateStudyPlan({
      childId,
      examDate: futureExamDate,
      syllabusSubjects: {
        Science: {
          chapters: [
            { title: 'Motion', topics: ['Velocity', 'Acceleration', 'Equations of Motion'] },
            { title: 'Tissues', topics: ['Plant Tissues', 'Animal Tissues'] },
          ],
        },
      },
    });

    expect(plan.days.length).toBeGreaterThanOrEqual(14);
    expect(plan.reflow_count).toBe(0);
    expect(plan.days[0].status).toBe('pending');
  });

  it('smoothly reflows missed days starting from today without backlog walls', async () => {
    // Manually insert a plan with past missed dates
    const pastDate = '2026-10-01';
    const futureDate = '2026-10-25';

    const days = [
      { date: pastDate, day_number: 1, subject: 'Science', chapter: 'Motion', topic: 'Velocity', status: 'missed' },
      { date: futureDate, day_number: 2, subject: 'Science', chapter: 'Motion', topic: 'Acceleration', status: 'pending' },
    ];

    await query(
      `INSERT INTO cx_study_plans (id, child_id, exam_date, days, reflow_count)
       VALUES ('plan_manual', $1, '2026-11-01', $2, 0)`,
      [childId, JSON.stringify(days)]
    );

    const reflowed = await reflowMissedDays(childId);
    expect(reflowed).not.toBeNull();
    expect(reflowed!.reflow_count).toBe(1);

    const todayStr = new Date().toISOString().split('T')[0];
    // The first item should now be scheduled on or after today
    expect(reflowed!.days[0].date >= todayStr).toBe(true);
  });

  it('completes quiz, updates stars XP, increments streak, and records vault entry', async () => {
    const result = await completeQuiz({
      childId,
      subject: 'Science',
      chapter: 'Motion',
      topic: 'Acceleration',
      score: 5,
      totalQuestions: 5,
      weakTopics: [],
    });

    expect(result.starsEarned).toBe(50);
    expect(result.newStreak).toBe(3); // 2 + 1
    expect(result.totalStars).toBe(150); // 100 + 50
    expect(result.celebrationTitle).toContain('Mastery');

    // Verify vault entry recorded
    const vault = await query('SELECT * FROM cx_vault_entries WHERE child_id = $1', [childId]);
    expect(vault.rows.length).toBe(1);
    expect(vault.rows[0].entry_type).toBe('quiz_streak');
  });

  it('adapts quiz question count by grade level (5 for Junior, 10 for Senior)', async () => {
    const juniorQuiz = await aiRouter.generateQuiz({
      gradeLevel: 6,
      subject: 'Science',
      chapter: 'Motion',
      topic: 'Speed',
    });
    expect(juniorQuiz.length).toBe(5);

    const seniorQuiz = await aiRouter.generateQuiz({
      gradeLevel: 10,
      subject: 'Science',
      chapter: 'Motion',
      topic: 'Acceleration',
    });
    expect(seniorQuiz.length).toBe(10);
  });

  it('resurfaces weak topics from previous quizzes into next day quiz questions', async () => {
    // Child took a quiz yesterday and got stuck on 'v-t graph slope' and 'Inertia of Direction'
    await completeQuiz({
      childId,
      subject: 'Science',
      chapter: 'Motion',
      topic: 'Acceleration',
      score: 2,
      totalQuestions: 5,
      weakTopics: ['Velocity-Time Graph Slope', 'Inertia of Direction'],
    });

    // Generating daily quiz for the next day should detect and resurface those weak topics
    const dailyQuiz = await generateDailyQuizForChild({
      childId,
      gradeLevel: 9,
      subject: 'Science',
      chapter: 'Motion',
      topic: 'Equations of Motion',
    });

    expect(dailyQuiz.resurfacedTopics).toContain('Velocity-Time Graph Slope');
    expect(dailyQuiz.resurfacedTopics).toContain('Inertia of Direction');

    // Verify questions carry weak topic revision markers
    const hasResurfacedQuestion = dailyQuiz.questions.some(
      (q) => q.subtopic === 'Velocity-Time Graph Slope' || q.question.includes('Velocity-Time Graph Slope')
    );
    expect(hasResurfacedQuestion).toBe(true);
  });
});

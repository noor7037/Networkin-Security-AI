import { query } from '../db';
import { aiRouter, QuizQuestion } from '../ai-router';

export interface DayPlanItem {
  date: string; // YYYY-MM-DD
  day_number: number;
  subject: string;
  chapter: string;
  topic: string;
  status: 'pending' | 'completed' | 'missed';
  quiz_completed?: boolean;
}

export interface StudyPlan {
  id: string;
  child_id: string;
  exam_date: string;
  days: DayPlanItem[];
  reflow_count: number;
  last_reflowed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export async function generateStudyPlan(params: {
  childId: string;
  examDate: string; // YYYY-MM-DD
  syllabusSubjects: Record<string, { chapters: Array<{ title: string; topics: string[] }> }>;
}): Promise<StudyPlan> {
  const planId = 'plan_' + Math.random().toString(36).substring(2, 10);
  const now = new Date();
  const exam = new Date(params.examDate);

  // Flatten topics across subjects
  const topicList: Array<{ subject: string; chapter: string; topic: string }> = [];
  for (const [subjName, subjData] of Object.entries(params.syllabusSubjects)) {
    for (const ch of subjData.chapters) {
      for (const t of ch.topics) {
        topicList.push({
          subject: subjName,
          chapter: ch.title,
          topic: t,
        });
      }
    }
  }

  // Calculate day-wise distribution
  const totalDays = Math.max(7, Math.ceil((exam.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const days: DayPlanItem[] = [];

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];
    const item = topicList[i % topicList.length] || {
      subject: 'Science',
      chapter: 'Motion',
      topic: 'Acceleration & Formulas',
    };

    days.push({
      date: dateStr,
      day_number: i + 1,
      subject: item.subject,
      chapter: item.chapter,
      topic: item.topic,
      status: i === 0 ? 'pending' : 'pending',
    });
  }

  // Delete previous plan for child if exists
  await query('DELETE FROM cx_study_plans WHERE child_id = $1', [params.childId]);

  await query(
    `INSERT INTO cx_study_plans (id, child_id, exam_date, days, reflow_count, updated_at)
     VALUES ($1, $2, $3, $4, 0, CURRENT_TIMESTAMP)`,
    [planId, params.childId, params.examDate, JSON.stringify(days)]
  );

  return {
    id: planId,
    child_id: params.childId,
    exam_date: params.examDate,
    days,
    reflow_count: 0,
  };
}

export async function getStudyPlan(childId: string): Promise<StudyPlan | null> {
  const res = await query<StudyPlan>(
    'SELECT * FROM cx_study_plans WHERE child_id = $1 ORDER BY updated_at DESC LIMIT 1',
    [childId]
  );
  if (res.rows.length === 0) return null;

  const plan = res.rows[0];
  if (typeof plan.days === 'string') {
    plan.days = JSON.parse(plan.days);
  }
  return plan;
}

export async function reflowMissedDays(childId: string): Promise<StudyPlan | null> {
  const plan = await getStudyPlan(childId);
  if (!plan) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const pendingOrMissedPastTopics: DayPlanItem[] = [];
  const futureDays: DayPlanItem[] = [];

  for (const day of plan.days) {
    if (day.date < todayStr && day.status !== 'completed') {
      day.status = 'missed';
      pendingOrMissedPastTopics.push(day);
    } else {
      futureDays.push(day);
    }
  }

  // If no past missed days, no reflow needed
  if (pendingOrMissedPastTopics.length === 0) {
    return plan;
  }

  // Reflow logic: Smoothly redistribute missed topics starting from today onwards without backlog walls
  const newDays: DayPlanItem[] = [];
  let dayOffset = 0;
  const now = new Date();

  // Combine missed topics and remaining future topics
  const allRemaining = [...pendingOrMissedPastTopics, ...futureDays];

  for (let i = 0; i < allRemaining.length; i++) {
    const d = new Date(now.getTime() + dayOffset * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];
    newDays.push({
      ...allRemaining[i],
      date: dateStr,
      day_number: i + 1,
      status: 'pending',
    });
    dayOffset++;
  }

  const newReflowCount = (plan.reflow_count || 0) + 1;

  await query(
    `UPDATE cx_study_plans 
     SET days = $1, reflow_count = $2, last_reflowed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
     WHERE id = $3`,
    [JSON.stringify(newDays), newReflowCount, plan.id]
  );

  return {
    ...plan,
    days: newDays,
    reflow_count: newReflowCount,
    last_reflowed_at: new Date().toISOString(),
  };
}

export async function completeQuiz(params: {
  childId: string;
  subject: string;
  chapter: string;
  topic: string;
  score: number;
  totalQuestions: number;
  weakTopics?: string[];
}): Promise<{
  quizId: string;
  starsEarned: number;
  newStreak: number;
  totalStars: number;
  celebrationTitle: string;
}> {
  const quizId = 'quiz_' + Math.random().toString(36).substring(2, 10);
  const weak = params.weakTopics || [];

  await query(
    `INSERT INTO cx_quizzes (id, child_id, subject, chapter, topic, score, total_questions, weak_topics, completed_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)`,
    [quizId, params.childId, params.subject, params.chapter, params.topic, params.score, params.totalQuestions, JSON.stringify(weak)]
  );

  // Mark topic completed in today's study plan
  const plan = await getStudyPlan(params.childId);
  if (plan) {
    const todayStr = new Date().toISOString().split('T')[0];
    for (const d of plan.days) {
      if (d.date === todayStr && d.topic.toLowerCase().includes(params.topic.toLowerCase().slice(0, 5))) {
        d.status = 'completed';
        d.quiz_completed = true;
      }
    }
    await query(
      'UPDATE cx_study_plans SET days = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [JSON.stringify(plan.days), plan.id]
    );
  }

  // Update child's stars and streak
  const starsEarned = params.score * 10;
  const childRes = await query(
    'SELECT stars_xp, streak_days FROM cx_child_profiles WHERE id = $1',
    [params.childId]
  );

  let totalStars = starsEarned;
  let newStreak = 1;
  if (childRes.rows.length > 0) {
    totalStars += (childRes.rows[0].stars_xp || 0);
    newStreak = (childRes.rows[0].streak_days || 1) + 1;
    await query(
      'UPDATE cx_child_profiles SET stars_xp = $1, streak_days = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
      [totalStars, newStreak, params.childId]
    );
  }

  // Add vault entry
  const vaultId = 'v_' + Math.random().toString(36).substring(2, 10);
  await query(
    `INSERT INTO cx_vault_entries (id, child_id, entry_type, title, description, badge_icon, metadata)
     VALUES ($1, $2, 'quiz_streak', $3, $4, 'trophy', $5)`,
    [
      vaultId,
      params.childId,
      `Mastered ${params.topic}`,
      `Scored ${params.score}/${params.totalQuestions} in ${params.subject} quiz. Current streak: ${newStreak} days!`,
      JSON.stringify({ score: params.score, total: params.totalQuestions, subject: params.subject, topic: params.topic }),
    ]
  );

  return {
    quizId,
    starsEarned,
    newStreak,
    totalStars,
    celebrationTitle: params.score >= params.totalQuestions * 0.8 ? 'Outstanding Mastery! 🌟' : 'Great Effort! Keep Learning! 🚀',
  };
}

export async function getWeakTopicsForChild(childId: string): Promise<string[]> {
  const res = await query<{ weak_topics: string | string[] }>(
    `SELECT weak_topics FROM cx_quizzes 
     WHERE child_id = $1 AND weak_topics IS NOT NULL
     ORDER BY completed_at DESC LIMIT 5`,
    [childId]
  );
  const weakSet = new Set<string>();
  for (const row of res.rows) {
    const list = typeof row.weak_topics === 'string' ? JSON.parse(row.weak_topics) : (row.weak_topics || []);
    if (Array.isArray(list)) {
      list.forEach((t) => weakSet.add(t));
    }
  }
  return Array.from(weakSet);
}

export async function generateDailyQuizForChild(params: {
  childId: string;
  gradeLevel: number;
  subject: string;
  chapter: string;
  topic: string;
}): Promise<{
  questions: QuizQuestion[];
  resurfacedTopics: string[];
}> {
  const weakTopics = await getWeakTopicsForChild(params.childId);
  const questions = await aiRouter.generateQuiz({
    gradeLevel: params.gradeLevel,
    subject: params.subject,
    chapter: params.chapter,
    topic: params.topic,
    resurfaceWeakTopics: weakTopics,
  });

  return {
    questions,
    resurfacedTopics: weakTopics,
  };
}

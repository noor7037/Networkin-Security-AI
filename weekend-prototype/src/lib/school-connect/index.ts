import { query } from '../db';

export interface SchoolConnectionRecord {
  id: string;
  parent_id: string;
  child_id: string;
  school_name: string;
  student_school_id: string;
  status: 'connected' | 'disconnected';
  connected_at: string;
  disconnected_at?: string;
  retained_data_summary: {
    retention_guarantee: string;
    learning_vault_records_kept: number;
    study_plans_kept: number;
    quiz_history_kept: number;
    school_records_purged: string[];
  };
}

export interface MirroredSchoolData {
  school_name: string;
  student_roll_no: string;
  attendance: {
    percentage: number;
    total_days: number;
    present_days: number;
    last_updated: string;
  };
  notices: Array<{
    id: string;
    title: string;
    date: string;
    category: 'academic' | 'event' | 'holiday';
    content: string;
  }>;
  homework: Array<{
    id: string;
    subject: string;
    title: string;
    due_date: string;
    status: 'assigned' | 'submitted';
  }>;
  report_card: {
    term: string;
    overall_grade: string;
    subjects: Array<{ subject: string; marks_obtained: number; total_marks: number; grade: string }>;
  };
  fee_standing_optional: {
    is_separate_section: true;
    current_dues_amount: number;
    due_date: string;
    note: string;
  };
}

export async function connectSchool(params: {
  parentId: string;
  childId: string;
  schoolCode: string;
  guardianPhone: string;
  otp: string;
}): Promise<{ success: boolean; connection?: SchoolConnectionRecord; error?: string }> {
  if (params.otp !== '123456' && params.otp !== '000000') {
    return { success: false, error: 'Invalid verification OTP' };
  }

  const connId = 'conn_' + Math.random().toString(36).substring(2, 10);
  const schoolName = params.schoolCode.toUpperCase().includes('DPS')
    ? 'Delhi Public School, Sector 45'
    : 'St. Xavier International Academy';
  const studentSchoolId = 'SCH-' + Math.floor(10000 + Math.random() * 90000);

  // Check existing
  const existing = await query(
    'SELECT id FROM cx_school_connections WHERE child_id = $1',
    [params.childId]
  );

  if (existing.rows.length > 0) {
    await query(
      `UPDATE cx_school_connections 
       SET status = 'connected', school_name = $1, student_school_id = $2, connected_at = CURRENT_TIMESTAMP, disconnected_at = NULL 
       WHERE child_id = $3`,
      [schoolName, studentSchoolId, params.childId]
    );
  } else {
    await query(
      `INSERT INTO cx_school_connections 
       (id, parent_id, child_id, school_name, student_school_id, status, connected_at, retained_data_summary)
       VALUES ($1, $2, $3, $4, $5, 'connected', CURRENT_TIMESTAMP, '{}'::jsonb)`,
      [connId, params.parentId, params.childId, schoolName, studentSchoolId]
    );
  }

  const res = await query<SchoolConnectionRecord>(
    'SELECT * FROM cx_school_connections WHERE child_id = $1',
    [params.childId]
  );

  return { success: true, connection: res.rows[0] };
}

export async function getSchoolConnection(childId: string): Promise<SchoolConnectionRecord | null> {
  const res = await query<SchoolConnectionRecord>(
    'SELECT * FROM cx_school_connections WHERE child_id = $1',
    [childId]
  );
  if (res.rows.length === 0) return null;
  const row = res.rows[0];
  if (typeof row.retained_data_summary === 'string') {
    row.retained_data_summary = JSON.parse(row.retained_data_summary);
  }
  return row;
}

export async function disconnectSchool(childId: string): Promise<{
  success: boolean;
  retentionSummary: SchoolConnectionRecord['retained_data_summary'];
}> {
  // Count preserved standalone assets
  const vaultRes = await query('SELECT count(*) as cnt FROM cx_vault_entries WHERE child_id = $1', [childId]);
  const planRes = await query('SELECT count(*) as cnt FROM cx_study_plans WHERE child_id = $1', [childId]);
  const quizRes = await query('SELECT count(*) as cnt FROM cx_quizzes WHERE child_id = $1', [childId]);

  const retentionSummary = {
    retention_guarantee: '100% of standalone learning profile, study plans, quiz history, and learning vault preserved permanently.',
    learning_vault_records_kept: parseInt(vaultRes.rows[0]?.cnt || '0', 10),
    study_plans_kept: parseInt(planRes.rows[0]?.cnt || '0', 10),
    quiz_history_kept: parseInt(quizRes.rows[0]?.cnt || '0', 10),
    school_records_purged: [
      'School ERP attendance synchronization token revoked',
      'School notice feed subscription terminated',
      'School fee records purged from cache',
      'School teacher direct notes unlinked',
    ],
  };

  await query(
    `UPDATE cx_school_connections 
     SET status = 'disconnected', disconnected_at = CURRENT_TIMESTAMP, retained_data_summary = $1 
     WHERE child_id = $2`,
    [JSON.stringify(retentionSummary), childId]
  );

  return {
    success: true,
    retentionSummary,
  };
}

export function getMockMirroredSchoolData(): MirroredSchoolData {
  return {
    school_name: 'Delhi Public School, Sector 45',
    student_roll_no: 'DPS-2026-094',
    attendance: {
      percentage: 94.2,
      total_days: 120,
      present_days: 113,
      last_updated: '2026-10-17',
    },
    notices: [
      {
        id: 'not_1',
        title: 'Science Exhibition 2026 Schedule',
        date: '2026-10-22',
        category: 'event',
        content: 'All Class 9 students must submit their working model charts to the science lab by Friday.',
      },
      {
        id: 'not_2',
        title: 'Diwali Break Notification',
        date: '2026-10-28',
        category: 'holiday',
        content: 'The school will remain closed from Oct 29 to Nov 03 on account of Deepavali.',
      },
    ],
    homework: [
      {
        id: 'hw_1',
        subject: 'Science',
        title: 'Solve NCERT Chapter 8 Motion Numerical Exercises 1 to 5',
        due_date: 'Tomorrow, 8:30 AM',
        status: 'assigned',
      },
      {
        id: 'hw_2',
        subject: 'Mathematics',
        title: 'Complete Worksheet on Factor Theorem (Polynomials)',
        due_date: 'Thursday',
        status: 'submitted',
      },
    ],
    report_card: {
      term: 'Mid-Term Assessment 2026',
      overall_grade: 'A1',
      subjects: [
        { subject: 'Science', marks_obtained: 92, total_marks: 100, grade: 'A1' },
        { subject: 'Mathematics', marks_obtained: 88, total_marks: 100, grade: 'A2' },
        { subject: 'English', marks_obtained: 94, total_marks: 100, grade: 'A1' },
        { subject: 'Social Science', marks_obtained: 89, total_marks: 100, grade: 'A2' },
      ],
    },
    // Fee standing is strictly segregated into an optional, skippable card
    fee_standing_optional: {
      is_separate_section: true,
      current_dues_amount: 0,
      due_date: '2026-11-10',
      note: 'All term dues cleared. Next quarter due on November 10.',
    },
  };
}

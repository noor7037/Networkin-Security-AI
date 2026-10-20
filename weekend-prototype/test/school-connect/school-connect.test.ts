import { describe, it, expect, beforeEach } from 'vitest';
import { resetTestDb, query } from '../../src/lib/db';
import {
  connectSchool,
  getSchoolConnection,
  disconnectSchool,
  getMockMirroredSchoolData,
} from '../../src/lib/school-connect';

describe('A10: School Connect & Disconnect Retention Guarantee', () => {
  const parentId = 'p_school_test';
  const childId = 'c_school_test';

  beforeEach(async () => {
    await resetTestDb();
    await query("INSERT INTO cx_parent_accounts (id, phone_number) VALUES ($1, '919876543210')", [parentId]);
    await query(
      "INSERT INTO cx_child_profiles (id, parent_id, name, grade_level) VALUES ($1, $2, 'Diya', 9)",
      [childId, parentId]
    );
    // Add standalone learning assets to child
    await query(
      "INSERT INTO cx_vault_entries (id, child_id, entry_type, title) VALUES ('v1', $1, 'milestone', 'Chapter 1 Mastered')",
      [childId]
    );
    await query(
      "INSERT INTO cx_quizzes (id, child_id, subject, chapter, topic, score) VALUES ('q1', $1, 'Science', 'Motion', 'Velocity', 5)",
      [childId]
    );
  });

  it('connects to school with OTP and returns school connection record', async () => {
    const res = await connectSchool({
      parentId,
      childId,
      schoolCode: 'DPS45',
      guardianPhone: '919876543210',
      otp: '123456',
    });

    expect(res.success).toBe(true);
    expect(res.connection?.status).toBe('connected');
    expect(res.connection?.school_name).toContain('Delhi Public School');
  });

  it('guarantees fee surface is segregated into a separate optional section', () => {
    const data = getMockMirroredSchoolData();
    expect(data.fee_standing_optional).toBeDefined();
    expect(data.fee_standing_optional.is_separate_section).toBe(true);
    // Academic notices and homework are completely independent of fee standing
    expect(data.attendance.percentage).toBeGreaterThan(90);
    expect(data.report_card.subjects.length).toBeGreaterThan(0);
  });

  it('safely disconnects school while preserving 100% of standalone learning data', async () => {
    // First connect
    await connectSchool({
      parentId,
      childId,
      schoolCode: 'DPS45',
      guardianPhone: '919876543210',
      otp: '123456',
    });

    // Now disconnect
    const disconnectRes = await disconnectSchool(childId);
    expect(disconnectRes.success).toBe(true);
    expect(disconnectRes.retentionSummary.learning_vault_records_kept).toBeGreaterThanOrEqual(1);
    expect(disconnectRes.retentionSummary.quiz_history_kept).toBeGreaterThanOrEqual(1);

    // Verify school status is marked disconnected in database
    const conn = await getSchoolConnection(childId);
    expect(conn?.status).toBe('disconnected');
    expect(conn?.disconnected_at).toBeDefined();

    // Verify child's learning vault entry survived
    const vault = await query('SELECT * FROM cx_vault_entries WHERE child_id = $1', [childId]);
    expect(vault.rows.length).toBe(1);
    expect(vault.rows[0].title).toBe('Chapter 1 Mastered');
  });
});

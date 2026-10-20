import { describe, it, expect, beforeEach } from 'vitest';
import { query, runMigrations, resetTestDb } from '../../src/lib/db';

describe('Database Schema & Migrations (cx_* prefix)', () => {
  beforeEach(async () => {
    await resetTestDb();
  });

  it('proves all 9 cx_ consumer tables exist with correct prefixes', async () => {
    await runMigrations();
    const res = await query<{ table_name: string }>(
      `SELECT table_name FROM information_schema.tables 
       WHERE table_schema = 'public' AND table_name LIKE 'cx_%' 
       ORDER BY table_name ASC`
    );

    const tableNames = res.rows.map((r) => r.table_name);
    
    expect(tableNames).toContain('cx_parent_accounts');
    expect(tableNames).toContain('cx_child_profiles');
    expect(tableNames).toContain('cx_syllabus_profiles');
    expect(tableNames).toContain('cx_study_plans');
    expect(tableNames).toContain('cx_quizzes');
    expect(tableNames).toContain('cx_vault_entries');
    expect(tableNames).toContain('cx_opportunities');
    expect(tableNames).toContain('cx_school_connections');
    expect(tableNames).toContain('cx_notifications');
    expect(tableNames.length).toBeGreaterThanOrEqual(9);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { resetTestDb, query } from '../../src/lib/db';
import { aiRouter } from '../../src/lib/ai-router';

describe('A2: Syllabus Scan & Profile Persistence', () => {
  beforeEach(async () => {
    await resetTestDb();
  });

  it('extracts syllabus structure with high confidence when unambiguous', async () => {
    const result = await aiRouter.extractSyllabus({
      rawTextSnippet: 'CBSE Class 9 Science Chapter 8 Motion and Chapter 6 Tissues',
    });

    expect(result.board).toBe('CBSE');
    expect(result.grade_level).toBe(9);
    expect(result.confidence).toBeGreaterThanOrEqual(0.85);
    expect(result.clarifying_question).toBeUndefined();
    expect(result.subjects.Science.chapters.length).toBeGreaterThanOrEqual(2);
  });

  it('triggers a clarifying question when confidence falls below 0.85 due to term ambiguity', async () => {
    const result = await aiRouter.extractSyllabus({
      rawTextSnippet: 'Syllabus covering both Term 1 and Term 2 units',
    });

    expect(result.confidence).toBeLessThan(0.85);
    expect(result.clarifying_question).toBeDefined();
    expect(result.clarifying_question).toContain('Which term exam');
  });

  it('persists and versions syllabus profiles in cx_syllabus_profiles', async () => {
    const dummyChildId = 'child_test_123';
    // Insert parent and child first
    await query("INSERT INTO cx_parent_accounts (id, phone_number) VALUES ('p_test', '919999999999')");
    await query(
      "INSERT INTO cx_child_profiles (id, parent_id, name, grade_level) VALUES ($1, 'p_test', 'Rohan', 9)",
      [dummyChildId]
    );

    const extraction = await aiRouter.extractSyllabus({ rawTextSnippet: 'NCERT Physics Motion' });

    // Save version 1
    await query(
      `INSERT INTO cx_syllabus_profiles (id, child_id, version, board, grade_level, subjects, confidence)
       VALUES ('syl_1', $1, 1, $2, $3, $4, $5)`,
      [dummyChildId, extraction.board, extraction.grade_level, JSON.stringify(extraction.subjects), extraction.confidence]
    );

    // Save version 2 (with parent corrections)
    const modifiedSubjects = { ...extraction.subjects };
    modifiedSubjects.Science.chapters[0].title = 'Tissues (Plant & Animal Focused)';

    await query(
      `INSERT INTO cx_syllabus_profiles (id, child_id, version, board, grade_level, subjects, confidence)
       VALUES ('syl_2', $1, 2, $2, $3, $4, 1.0)`,
      [dummyChildId, extraction.board, extraction.grade_level, JSON.stringify(modifiedSubjects)]
    );

    const history = await query(
      'SELECT version, subjects FROM cx_syllabus_profiles WHERE child_id = $1 ORDER BY version ASC',
      [dummyChildId]
    );

    expect(history.rows.length).toBe(2);
    expect(history.rows[0].version).toBe(1);
    expect(history.rows[1].version).toBe(2);
  });
});

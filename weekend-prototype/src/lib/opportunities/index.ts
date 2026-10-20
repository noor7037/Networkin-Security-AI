import { query } from '../db';
import { OpportunityItem, SEEDED_OPPORTUNITIES } from './data';

export * from './data';

export async function seedOpportunities(): Promise<void> {
  for (const opp of SEEDED_OPPORTUNITIES) {
    const existing = await query('SELECT id FROM cx_opportunities WHERE id = $1', [opp.id]);
    if (existing.rows.length === 0) {
      await query(
        `INSERT INTO cx_opportunities 
         (id, title, organization, type, eligible_grades, eligible_states, deadline, benefit_summary, official_url, last_verified_on, status, founder_review_status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          opp.id,
          opp.title,
          opp.organization,
          opp.type,
          JSON.stringify(opp.eligible_grades),
          JSON.stringify(opp.eligible_states),
          opp.deadline,
          opp.benefit_summary,
          opp.official_url,
          opp.last_verified_on,
          opp.status,
          opp.founder_review_status,
        ]
      );
    }
  }
}

export async function archiveExpiredOpportunities(referenceDate?: string): Promise<number> {
  const ref = referenceDate || new Date().toISOString().split('T')[0];
  const res = await query(
    `UPDATE cx_opportunities 
     SET status = 'archived' 
     WHERE deadline < $1 AND status != 'archived'`,
    [ref]
  );
  return res.rows.length;
}

export async function getMatchedOpportunitiesForChild(childGrade: number, state: string = 'All India'): Promise<OpportunityItem[]> {
  await seedOpportunities();
  await archiveExpiredOpportunities();

  // Strict trust rule: ONLY active, verified and approved opportunities reach parent/child view
  const res = await query<OpportunityItem>(
    `SELECT * FROM cx_opportunities 
     WHERE status = 'verified' AND founder_review_status = 'approved' AND deadline >= CURRENT_DATE::text
     ORDER BY deadline ASC`
  );

  return res.rows
    .map((r) => ({
      ...r,
      eligible_grades: typeof r.eligible_grades === 'string' ? JSON.parse(r.eligible_grades) : r.eligible_grades,
      eligible_states: typeof r.eligible_states === 'string' ? JSON.parse(r.eligible_states) : r.eligible_states,
    }))
    .filter((opp) => {
      const gradeMatch = opp.eligible_grades.includes(childGrade);
      const stateMatch = opp.eligible_states.includes('All India') || opp.eligible_states.includes(state);
      return gradeMatch && stateMatch;
    });
}

export async function getFounderReviewQueue(): Promise<OpportunityItem[]> {
  await seedOpportunities();
  // Founder queue tracks pending reviews, candidate schemes, and archived past-deadline items
  const res = await query<OpportunityItem>(
    `SELECT * FROM cx_opportunities 
     WHERE founder_review_status = 'pending_review' OR status IN ('candidate', 'archived')
     ORDER BY created_at DESC`
  );

  return res.rows.map((r) => ({
    ...r,
    eligible_grades: typeof r.eligible_grades === 'string' ? JSON.parse(r.eligible_grades) : r.eligible_grades,
    eligible_states: typeof r.eligible_states === 'string' ? JSON.parse(r.eligible_states) : r.eligible_states,
  }));
}

export async function approveOpportunity(id: string): Promise<boolean> {
  const res = await query(
    `UPDATE cx_opportunities 
     SET status = 'verified', founder_review_status = 'approved', last_verified_on = CURRENT_DATE::text 
     WHERE id = $1`,
    [id]
  );
  return (res.rows.length ?? 0) >= 0;
}

export async function rejectOpportunity(id: string): Promise<boolean> {
  const res = await query(
    `UPDATE cx_opportunities 
     SET founder_review_status = 'rejected' 
     WHERE id = $1`,
    [id]
  );
  return (res.rows.length ?? 0) >= 0;
}

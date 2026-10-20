import { describe, it, expect, beforeEach } from 'vitest';
import { resetTestDb, query } from '../../src/lib/db';
import {
  getMatchedOpportunitiesForChild,
  getFounderReviewQueue,
  approveOpportunity,
  rejectOpportunity,
  seedOpportunities,
  archiveExpiredOpportunities,
} from '../../src/lib/opportunities';

describe('A9: Opportunities Engine & Provenance Standard', () => {
  beforeEach(async () => {
    await resetTestDb();
    await seedOpportunities();
  });

  it('matches verified opportunities by child grade and state', async () => {
    // Class 9 child
    const matchesGrade9 = await getMatchedOpportunitiesForChild(9, 'All India');
    expect(matchesGrade9.length).toBeGreaterThanOrEqual(10);

    const titles = matchesGrade9.map((o) => o.title);
    expect(titles).toContain('National Means-cum-Merit Scholarship Scheme (NMMSS)');
    expect(titles).toContain('PM YASASVI Scholarship Scheme for Young Achievers');
    expect(titles).toContain('INSPIRE Awards - MANAK (Million Minds Augmenting National Aspiration)');

    // Strict trust rule: UNVERIFIED candidate schemes must NEVER be returned to parents
    expect(titles).not.toContain('Uttar Pradesh Pre-Matric SC/ST Fee Reimbursement (Candidate)');
  });

  it('proves every verified opportunity has an official source URL and verified date', async () => {
    const verifiedList = await getMatchedOpportunitiesForChild(9);
    for (const item of verifiedList) {
      expect(item.official_url).toMatch(/^https?:\/\//);
      expect(item.last_verified_on).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(item.status).toBe('verified');
      expect(item.founder_review_status).toBe('approved');
    }
  });

  it('surfaces candidate schemes in the Founder Review Queue and allows approval', async () => {
    const queue = await getFounderReviewQueue();
    expect(queue.length).toBeGreaterThanOrEqual(1);

    const candidate = queue.find((q) => q.id === 'opp_cand_up_prematric');
    expect(candidate).toBeDefined();
    expect(candidate?.founder_review_status).toBe('pending_review');

    // Founder reviews and approves
    await approveOpportunity(candidate!.id);

    // Verify it is now approved in database
    const dbCheck = await query('SELECT status, founder_review_status FROM cx_opportunities WHERE id = $1', [candidate!.id]);
    expect(dbCheck.rows[0].status).toBe('verified');
    expect(dbCheck.rows[0].founder_review_status).toBe('approved');
  });

  it('moves past-deadline opportunities to archived status (invisible to parents, visible in founder queue)', async () => {
    // Insert an expired opportunity whose deadline passed yesterday
    const pastDeadline = '2026-10-01';
    await query(
      `INSERT INTO cx_opportunities 
       (id, title, organization, type, eligible_grades, eligible_states, deadline, benefit_summary, official_url, last_verified_on, status, founder_review_status)
       VALUES ('opp_expired_test', 'Expired National Science Fair 2026', 'Govt of India', 'exam', '[9, 10]', '["All India"]', $1, '₹5,000 cash grant', 'https://dst.gov.in', '2026-09-01', 'verified', 'approved')`,
      [pastDeadline]
    );

    // Trigger archive process
    await archiveExpiredOpportunities();

    // Verify it is archived in DB
    const dbCheck = await query('SELECT status FROM cx_opportunities WHERE id = $1', ['opp_expired_test']);
    expect(dbCheck.rows[0].status).toBe('archived');

    // Invisible to parents: MUST NOT appear in getMatchedOpportunitiesForChild
    const parentMatches = await getMatchedOpportunitiesForChild(9);
    const inParentView = parentMatches.some((o) => o.id === 'opp_expired_test');
    expect(inParentView).toBe(false);

    // Visible in founder review queue for historical tracking
    const founderQueue = await getFounderReviewQueue();
    const inFounderQueue = founderQueue.some((o) => o.id === 'opp_expired_test');
    expect(inFounderQueue).toBe(true);
  });
});

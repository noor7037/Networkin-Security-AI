import { describe, it, expect, beforeEach } from 'vitest';
import { resetTestDb, query } from '../../src/lib/db';
import {
  createNotification,
  getNotificationsForParent,
  groupNotificationsByChild,
  compileWeeklyDigest,
  queueWhatsAppDigest,
} from '../../src/lib/notifications';

describe('A7: Notification Center Frequency Caps & Grouping', () => {
  const parentId = 'p_notif_test';
  const child1Id = 'c_diya';
  const child2Id = 'c_aarav';

  beforeEach(async () => {
    await resetTestDb();
    await query("INSERT INTO cx_parent_accounts (id, phone_number) VALUES ($1, '919876543210')", [parentId]);
    await query(
      "INSERT INTO cx_child_profiles (id, parent_id, name, grade_level) VALUES ($1, $2, 'Diya Sharma', 10)",
      [child1Id, parentId]
    );
    await query(
      "INSERT INTO cx_child_profiles (id, parent_id, name, grade_level) VALUES ($1, $2, 'Aarav Sharma', 6)",
      [child2Id, parentId]
    );
  });

  it('enforces daily frequency cap: max 2 notifications per child per day', async () => {
    // 1st notification today for Diya
    const n1 = await createNotification({
      parentId,
      childId: child1Id,
      title: 'Daily Study Plan Ready',
      body: '4 focused problems on Trigonometry',
      type: 'daily_plan',
    });
    expect(n1.is_frequency_capped).toBeFalsy();

    // 2nd notification today for Diya
    const n2 = await createNotification({
      parentId,
      childId: child1Id,
      title: 'Quiz Due',
      body: 'Take 5 minutes to complete your practice quiz',
      type: 'quiz_reminder',
    });
    expect(n2.is_frequency_capped).toBeFalsy();

    // 3rd notification today for Diya -> MUST be frequency capped to prevent spam!
    const n3 = await createNotification({
      parentId,
      childId: child1Id,
      title: 'Extra practice nudge',
      body: 'Additional questions available',
      type: 'quiz_reminder',
    });
    expect(n3.is_frequency_capped).toBe(true);

    // Verify only 2 notifications are stored in the database for Diya
    const inDb = await query('SELECT count(*) as count FROM cx_notifications WHERE child_id = $1', [child1Id]);
    expect(parseInt(inDb.rows[0].count, 10)).toBe(2);
  });

  it('isolates frequency caps per child independently', async () => {
    // Diya receives 2 notifications (hitting her daily cap)
    await createNotification({ parentId, childId: child1Id, title: 'Plan Diya', body: 'Body', type: 'daily_plan' });
    await createNotification({ parentId, childId: child1Id, title: 'Quiz Diya', body: 'Body', type: 'quiz_reminder' });

    // Aarav should STILL be able to receive his 1st notification because caps are per-child!
    const aaravNotif = await createNotification({
      parentId,
      childId: child2Id,
      title: 'Aarav Daily Science Plan',
      body: 'Plant Tissues exploration',
      type: 'daily_plan',
    });
    expect(aaravNotif.is_frequency_capped).toBeFalsy();

    const inDbAarav = await query('SELECT count(*) as count FROM cx_notifications WHERE child_id = $1', [child2Id]);
    expect(parseInt(inDbAarav.rows[0].count, 10)).toBe(1);
  });

  it('returns notifications with per-child labels', async () => {
    await createNotification({ parentId, childId: child1Id, title: 'Diya Plan', body: 'Plan content', type: 'daily_plan' });
    await createNotification({ parentId, childId: child2Id, title: 'Aarav Quiz', body: 'Quiz content', type: 'quiz_reminder' });

    const parentNotifs = await getNotificationsForParent(parentId);
    expect(parentNotifs.length).toBe(2);

    const diyaItem = parentNotifs.find((n) => n.child_id === child1Id);
    expect(diyaItem).toBeDefined();
    expect(diyaItem?.child_name).toBe('Diya Sharma');

    const aaravItem = parentNotifs.find((n) => n.child_id === child2Id);
    expect(aaravItem).toBeDefined();
    expect(aaravItem?.child_name).toBe('Aarav Sharma');
  });

  it('groups notifications by child and compiles weekly Sunday digest', async () => {
    await createNotification({ parentId, childId: child1Id, title: 'Diya Math Streak', body: '12 days', type: 'milestone' });
    await createNotification({ parentId, childId: child2Id, title: 'Aarav Stars XP', body: '300 stars', type: 'milestone' });

    const list = await getNotificationsForParent(parentId);
    const groups = groupNotificationsByChild(list);

    expect(groups[child1Id]).toBeDefined();
    expect(groups[child2Id]).toBeDefined();
    expect(groups[child1Id].length).toBe(1);
    expect(groups[child2Id].length).toBe(1);

    const digest = compileWeeklyDigest({ parentPhone: '919876543210', notifications: list });
    expect(digest.summaryTitle).toContain('Family Learning Digest');
    expect(digest.childSummaries.length).toBe(2);

    // Queue digest via WhatsApp stub
    const queued = await queueWhatsAppDigest({
      phone: '919876543210',
      parentName: 'Sharma Family',
      childName: 'Diya & Aarav',
      digestSummary: 'Weekly progress summary',
    });
    expect(queued.queued).toBe(true);
    expect(queued.messageId).toMatch(/^wa_/);
  });
});

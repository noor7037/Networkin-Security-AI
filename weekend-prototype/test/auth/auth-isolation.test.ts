// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest';
import { resetTestDb } from '../../src/lib/db';
import {
  sendOtp,
  verifyOtp,
  addChildProfile,
  getChildrenForParent,
  getChildById,
  verifySessionToken,
} from '../../src/lib/auth';

describe('A1: Accounts & Per-Child Isolation', () => {
  beforeEach(async () => {
    await resetTestDb();
  });

  it('sends mock WhatsApp OTP and verifies session token', async () => {
    const sendRes = await sendOtp('919876543210');
    expect(sendRes.success).toBe(true);
    expect(sendRes.devCode).toBe('123456');

    const verifyRes = await verifyOtp('919876543210', '123456');
    expect(verifyRes.success).toBe(true);
    expect(verifyRes.token).toBeDefined();

    const session = await verifySessionToken(verifyRes.token!);
    expect(session).not.toBeNull();
    expect(session?.phone).toBe('919876543210');
  });

  it('proves multiple children can be added and child-A data never leaks to child-B', async () => {
    // Parent 1 with 2 children
    const auth1 = await verifyOtp('919876543210', '123456');
    const session1 = (await verifySessionToken(auth1.token!))!;

    const childA = await addChildProfile(session1.parentId, {
      name: 'Aarav Sharma',
      grade_level: 5,
      board: 'CBSE',
      medium: 'hindi',
    });

    const childB = await addChildProfile(session1.parentId, {
      name: 'Diya Sharma',
      grade_level: 10,
      board: 'CBSE',
      medium: 'english',
    });

    // Parent 2 with 1 child
    const auth2 = await verifyOtp('919111222333', '123456');
    const session2 = (await verifySessionToken(auth2.token!))!;

    const childC = await addChildProfile(session2.parentId, {
      name: 'Kabir Verma',
      grade_level: 9,
      board: 'ICSE',
      medium: 'english',
    });

    // Verify parent 1 only sees Child A and Child B
    const parent1Children = await getChildrenForParent(session1.parentId);
    expect(parent1Children.length).toBe(2);
    expect(parent1Children.map((c) => c.name)).toContain('Aarav Sharma');
    expect(parent1Children.map((c) => c.name)).toContain('Diya Sharma');
    expect(parent1Children.map((c) => c.name)).not.toContain('Kabir Verma');

    // Strict boundary test: Parent 2 cannot fetch Child A even if ID is known
    const leakCheck = await getChildById(childA.id, session2.parentId);
    expect(leakCheck).toBeNull();

    // Verify grade-level attributes
    expect(childA.grade_level).toBe(5);
    expect(childB.grade_level).toBe(10);
  });
});

import { SignJWT, jwtVerify } from 'jose';
import { query } from '../db';

const JWT_SECRET = new TextEncoder().encode(
  process.env.APP_SESSION_SECRET || 'dev-placeholder-not-a-secret'
);

export interface SessionPayload {
  parentId: string;
  phone: string;
  activeChildId: string | null;
  locale: 'en' | 'hi';
}

export interface ChildProfile {
  id: string;
  parent_id: string;
  name: string;
  avatar: string;
  grade_level: number;
  board: string;
  medium: string;
  stars_xp: number;
  streak_days: number;
  created_at?: string;
  updated_at?: string;
}

// In-memory OTP store for mock dev/test verification
const pendingOtps = new Map<string, { code: string; expiresAt: number }>();

export async function sendOtp(phoneNumber: string): Promise<{ success: boolean; devCode: string; message: string }> {
  // Normalize phone number (digits only)
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  // Deterministic dev code: 123456, or predictable 6-digit code
  const code = '123456';
  pendingOtps.set(cleanPhone, {
    code,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  });

  return {
    success: true,
    devCode: code,
    message: `Verification code sent to +${cleanPhone}`,
  };
}

export async function verifyOtp(phoneNumber: string, code: string): Promise<{ success: boolean; token?: string; error?: string }> {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const record = pendingOtps.get(cleanPhone);

  // In test/dev mode, allow 123456 anytime or match stored code
  const isValid = (record && record.code === code && record.expiresAt > Date.now()) || code === '123456';
  if (!isValid) {
    return { success: false, error: 'Invalid or expired verification code' };
  }

  // Find or create parent account
  const existingParent = await query(
    'SELECT * FROM cx_parent_accounts WHERE phone_number = $1',
    [cleanPhone]
  );

  let parentId: string;
  let locale: 'en' | 'hi' = 'en';

  if (existingParent.rows.length > 0) {
    parentId = existingParent.rows[0].id;
    locale = existingParent.rows[0].locale || 'en';
  } else {
    parentId = 'p_' + Math.random().toString(36).substring(2, 10);
    await query(
      'INSERT INTO cx_parent_accounts (id, phone_number, locale) VALUES ($1, $2, $3)',
      [parentId, cleanPhone, locale]
    );
  }

  // Get active child if exists
  const children = await query(
    'SELECT id FROM cx_child_profiles WHERE parent_id = $1 ORDER BY created_at ASC LIMIT 1',
    [parentId]
  );
  const activeChildId = children.rows.length > 0 ? children.rows[0].id : null;

  const token = await createSessionToken({
    parentId,
    phone: cleanPhone,
    activeChildId,
    locale,
  });

  return { success: true, token };
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch (err) {
    return null;
  }
}

export async function getChildrenForParent(parentId: string): Promise<ChildProfile[]> {
  const res = await query<ChildProfile>(
    'SELECT * FROM cx_child_profiles WHERE parent_id = $1 ORDER BY grade_level ASC, created_at ASC',
    [parentId]
  );
  return res.rows;
}

export async function addChildProfile(
  parentId: string,
  params: {
    name: string;
    grade_level: number;
    board?: string;
    medium?: string;
    avatar?: string;
  }
): Promise<ChildProfile> {
  const id = 'c_' + Math.random().toString(36).substring(2, 10);
  const avatar = params.avatar || (params.grade_level <= 7 ? 'avatar_junior' : 'avatar_senior');
  const board = params.board || 'CBSE';
  const medium = params.medium || 'english';

  await query(
    `INSERT INTO cx_child_profiles (id, parent_id, name, avatar, grade_level, board, medium, stars_xp, streak_days)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 50, 1)`,
    [id, parentId, params.name, avatar, params.grade_level, board, medium]
  );

  const res = await query<ChildProfile>('SELECT * FROM cx_child_profiles WHERE id = $1', [id]);
  return res.rows[0];
}

export async function getChildById(childId: string, parentId?: string): Promise<ChildProfile | null> {
  let sql = 'SELECT * FROM cx_child_profiles WHERE id = $1';
  const params: any[] = [childId];
  if (parentId) {
    sql += ' AND parent_id = $2';
    params.push(parentId);
  }
  const res = await query<ChildProfile>(sql, params);
  return res.rows[0] || null;
}

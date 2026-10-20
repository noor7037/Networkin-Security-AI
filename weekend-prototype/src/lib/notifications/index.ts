import { query } from '../db';

export interface NotificationItem {
  id: string;
  parent_id: string;
  child_id: string | null;
  child_name?: string;
  title: string;
  body: string;
  type: 'daily_plan' | 'quiz_reminder' | 'weekly_digest' | 'scheme_match' | 'milestone';
  read_at: string | null;
  created_at: string;
  is_frequency_capped?: boolean;
}

export async function createNotification(params: {
  parentId: string;
  childId?: string;
  title: string;
  body: string;
  type: NotificationItem['type'];
}): Promise<NotificationItem> {
  const id = 'notif_' + Math.random().toString(36).substring(2, 10);

  // Frequency capping check: max 2 notifications per child per day for non-digest types
  if (params.childId && params.type !== 'weekly_digest') {
    const todayRes = await query<{ count: string }>(
      `SELECT count(*) as count FROM cx_notifications 
       WHERE child_id = $1 AND created_at >= CURRENT_DATE`,
      [params.childId]
    );
    const countToday = parseInt(todayRes.rows[0]?.count || '0', 10);
    if (countToday >= 2) {
      // Frequency capped: max 2 notifications per child per day to prevent spam
      return {
        id,
        parent_id: params.parentId,
        child_id: params.childId || null,
        title: params.title,
        body: params.body,
        type: params.type,
        read_at: null,
        created_at: new Date().toISOString(),
        is_frequency_capped: true,
      };
    }
  }

  await query(
    `INSERT INTO cx_notifications (id, parent_id, child_id, title, body, type, read_at)
     VALUES ($1, $2, $3, $4, $5, $6, NULL)`,
    [id, params.parentId, params.childId || null, params.title, params.body, params.type]
  );

  return {
    id,
    parent_id: params.parentId,
    child_id: params.childId || null,
    title: params.title,
    body: params.body,
    type: params.type,
    read_at: null,
    created_at: new Date().toISOString(),
  };
}

export async function getNotificationsForParent(parentId: string, childId?: string): Promise<NotificationItem[]> {
  let sql = `
    SELECT n.*, c.name as child_name 
    FROM cx_notifications n
    LEFT JOIN cx_child_profiles c ON n.child_id = c.id
    WHERE n.parent_id = $1
  `;
  const params: any[] = [parentId];

  if (childId) {
    sql += ' AND (n.child_id = $2 OR n.child_id IS NULL)';
    params.push(childId);
  }

  sql += ' ORDER BY n.created_at DESC LIMIT 50';

  const res = await query<NotificationItem>(sql, params);
  return res.rows;
}

export async function markNotificationAsRead(id: string): Promise<void> {
  await query('UPDATE cx_notifications SET read_at = CURRENT_TIMESTAMP WHERE id = $1', [id]);
}

// WhatsApp delivery queue adapter (stubbed per spec §9)
export async function queueWhatsAppDigest(params: {
  phone: string;
  parentName: string;
  childName: string;
  digestSummary: string;
}): Promise<{ queued: boolean; messageId: string }> {
  // Stubbed WhatsApp adapter
  return {
    queued: true,
    messageId: 'wa_' + Math.random().toString(36).substring(2, 10),
  };
}

export function groupNotificationsByChild(notifications: NotificationItem[]): Record<string, NotificationItem[]> {
  const groups: Record<string, NotificationItem[]> = {};
  for (const n of notifications) {
    const key = n.child_id || 'general';
    if (!groups[key]) groups[key] = [];
    groups[key].push(n);
  }
  return groups;
}

export function compileWeeklyDigest(params: {
  parentPhone: string;
  notifications: NotificationItem[];
}): {
  summaryTitle: string;
  childSummaries: Array<{ childId: string; childName: string; itemCount: number; headlines: string[] }>;
} {
  const groups = groupNotificationsByChild(params.notifications);
  const childSummaries = Object.entries(groups).map(([childId, items]) => {
    const childName = items[0]?.child_name || (childId === 'general' ? 'Family General' : 'Child');
    return {
      childId,
      childName,
      itemCount: items.length,
      headlines: items.map((i) => i.title),
    };
  });

  return {
    summaryTitle: 'NetCyberAI Sunday Family Learning Digest',
    childSummaries,
  };
}

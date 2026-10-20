import fs from 'fs';
import path from 'path';

export interface QueryResult<T = any> {
  rows: T[];
}

interface DbClient {
  query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>>;
  exec(sql: string): Promise<void>;
  close?(): Promise<void>;
}

let dbInstance: DbClient | null = null;
let migrationsRan = false;

export async function getDb(): Promise<DbClient> {
  if (dbInstance) {
    if (!migrationsRan) {
      await runMigrations(dbInstance);
      migrationsRan = true;
    }
    return dbInstance;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    const { Pool } = await import('pg');
    const pool = new Pool({ connectionString: databaseUrl });
    dbInstance = {
      query: async <T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> => {
        const res = await pool.query(sql, params);
        return { rows: res.rows };
      },
      exec: async (sql: string): Promise<void> => {
        await pool.query(sql);
      },
      close: async () => {
        await pool.end();
      },
    };
  } else {
    // Standalone embedded Postgres via PGlite
    const { PGlite } = await import('@electric-sql/pglite');
    // Store in .pglite_data for persistence across runs, or memory in tests
    const dataDir = process.env.NODE_ENV === 'test' 
      ? undefined 
      : path.join(process.cwd(), '.pgdata');
      
    const pglite = new PGlite(dataDir);
    dbInstance = {
      query: async <T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> => {
        const res = await pglite.query<T>(sql, params);
        return { rows: res.rows };
      },
      exec: async (sql: string): Promise<void> => {
        await pglite.exec(sql);
      },
      close: async () => {
        await pglite.close();
      },
    };
  }

  if (!migrationsRan) {
    await runMigrations(dbInstance);
    migrationsRan = true;
  }

  return dbInstance;
}

export async function runMigrations(client?: DbClient): Promise<void> {
  const db = client || (await getDb());
  const migrationsDir = path.join(process.cwd(), 'migrations');
  
  if (!fs.existsSync(migrationsDir)) {
    return;
  }

  const migrationFiles = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of migrationFiles) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    await db.exec(sql);
  }
}

export async function query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
  const db = await getDb();
  return db.query<T>(sql, params);
}

export async function resetTestDb(): Promise<void> {
  migrationsRan = false;
  if (dbInstance && dbInstance.close) {
    try {
      await dbInstance.close();
    } catch (e) {
      // ignore
    }
  }
  dbInstance = null;
  const db = await getDb();
  await runMigrations(db);
}

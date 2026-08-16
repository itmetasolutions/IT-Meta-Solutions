import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

// Serverless functions can run many concurrent instances, each holding its own
// connections — keep the per-instance pool small so we don't exhaust the
// database's connection limit. Use a "pooled" (pgbouncer/transaction-mode)
// connection string from Supabase/Neon if your plan has a low connection cap.
export const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 10_000,
    })
  : null;

export const isDbConfigured = () => Boolean(pool);

let schemaReadyPromise = null;

// Lazily ensures the schema exists. Safe to call on every cold start — the
// DDL is idempotent, and concurrent calls across instances just race
// harmlessly on IF NOT EXISTS.
export function ensureSchema() {
  if (!pool) return Promise.resolve();
  if (!schemaReadyPromise) {
    schemaReadyPromise = pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        service TEXT,
        budget TEXT,
        message TEXT,
        source TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS chat_conversations (
        id SERIAL PRIMARY KEY,
        visitor_id TEXT UNIQUE NOT NULL,
        visitor_name TEXT,
        visitor_email TEXT,
        status TEXT NOT NULL DEFAULT 'open',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        last_message_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        conversation_id INTEGER NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
        sender TEXT NOT NULL CHECK (sender IN ('visitor', 'admin', 'bot')),
        body TEXT NOT NULL,
        read_by_admin BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id);

      CREATE TABLE IF NOT EXISTS reviews_cache (
        id SERIAL PRIMARY KEY,
        payload JSONB NOT NULL,
        generated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `).then(() => console.log('Database schema ready.'));
  }
  return schemaReadyPromise;
}

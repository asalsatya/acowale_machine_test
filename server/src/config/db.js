'use strict';

const path = require('path');
const { createClient } = require('@libsql/client');
const env = require('./env');

let client;

const getDb = () => {
  if (!client) {
    const rawPath = env.DB_PATH;
    const url     = rawPath === ':memory:' ? ':memory:' : `file:${path.resolve(rawPath)}`;
    client = createClient({ url });
  }
  return client;
};

const initDb = async () => {
  const db = getDb();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS feedback (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      category    TEXT    NOT NULL,
      comment     TEXT    NOT NULL,
      email       TEXT,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_feedback_category   ON feedback(category)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at)`);
};

const resetClient = () => { client = null; };

module.exports = { getDb, initDb, resetClient };

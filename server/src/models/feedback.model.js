'use strict';

const { getDb } = require('../config/db');

const VALID_CATEGORIES = ['bug', 'feature', 'general', 'billing', 'support'];

const insertFeedback = async (data) => {
  const db = getDb();
  const result = await db.execute({
    sql: 'INSERT INTO feedback (category, comment, email) VALUES (?, ?, ?)',
    args: [data.category, data.comment, data.email || null],
  });
  const row = await db.execute({
    sql: 'SELECT * FROM feedback WHERE id = ?',
    args: [result.lastInsertRowid],
  });
  return row.rows[0];
};

const findFeedback = async ({ category, keyword, from, to, page = 1, limit = 20 } = {}) => {
  const db = getDb();
  const conditions = [];
  const params = [];

  if (category) { conditions.push('category = ?');                      params.push(category); }
  if (keyword)  { conditions.push('(comment LIKE ? OR email LIKE ?)'); params.push(`%${keyword}%`, `%${keyword}%`); }
  if (from)     { conditions.push('created_at >= ?');                   params.push(from); }
  if (to)       { conditions.push('created_at <= ?');                   params.push(to + ' 23:59:59'); }

  const where  = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const offset = (page - 1) * limit;

  const rowsResult  = await db.execute({ sql: `SELECT * FROM feedback ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, args: [...params, limit, offset] });
  const countResult = await db.execute({ sql: `SELECT COUNT(*) as total FROM feedback ${where}`, args: params });

  return {
    rows:  rowsResult.rows,
    total: Number(countResult.rows[0].total),
    page:  Number(page),
    limit: Number(limit),
  };
};

module.exports = { VALID_CATEGORIES, insertFeedback, findFeedback };

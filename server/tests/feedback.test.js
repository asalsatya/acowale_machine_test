import { describe, it, expect, beforeAll, vi } from 'vitest';
import request from 'supertest';

process.env.NODE_ENV      = 'test';
process.env.DB_PATH       = ':memory:';
process.env.ADMIN_API_KEY = 'test-admin-key';

vi.resetModules();

let app;

beforeAll(async () => {
  const dbModule = require('../src/config/db.js');
  dbModule.resetClient();
  await dbModule.initDb();

  const appModule = require('../src/app.js');
  app = appModule;
});

describe('GET /health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok' });
  });
});

describe('POST /api/feedback', () => {
  it('creates feedback with valid body', async () => {
    const res = await request(app).post('/api/feedback').send({
      category: 'bug',
      comment:  'This is a valid bug report with enough characters.',
      email:    'test@example.com',
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.feedback).toMatchObject({ category: 'bug' });
  });

  it('rejects a short comment', async () => {
    const res = await request(app).post('/api/feedback').send({ category: 'general', comment: 'too short' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.details).toHaveProperty('comment');
  });

  it('rejects an invalid category', async () => {
    const res = await request(app).post('/api/feedback').send({ category: 'unknown', comment: 'This comment is long enough to pass length validation.' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('rejects an invalid email', async () => {
    const res = await request(app).post('/api/feedback').send({ category: 'feature', comment: 'This comment is long enough to pass length validation.', email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body.details).toHaveProperty('email');
  });
});

describe('GET /api/feedback', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).get('/api/feedback');
    expect(res.status).toBe(401);
  });

  it('returns feedback list with valid api-key', async () => {
    const res = await request(app).get('/api/feedback').set('x-api-key', 'test-admin-key');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('rows');
    expect(res.body.data).toHaveProperty('total');
  });

  it('supports pagination params', async () => {
    const res = await request(app).get('/api/feedback?page=1&limit=5').set('x-api-key', 'test-admin-key');
    expect(res.status).toBe(200);
    expect(res.body.data.limit).toBe(5);
  });
});

describe('GET /api/analytics/summary', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).get('/api/analytics/summary');
    expect(res.status).toBe(401);
  });

  it('returns summary data with valid api-key', async () => {
    const res = await request(app).get('/api/analytics/summary').set('x-api-key', 'test-admin-key');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('total');
    expect(res.body.data).toHaveProperty('byCategory');
    expect(res.body.data).toHaveProperty('trend');
    expect(res.body.data).toHaveProperty('thisWeekCount');
    expect(res.body.data).toHaveProperty('weekTrend');
    expect(res.body.data).toHaveProperty('topCategory');
    expect(res.body.data.trend).toHaveLength(7);
  });
});

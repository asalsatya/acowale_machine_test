require('dotenv').config();

const { initDb, getDb } = require('./src/config/db');

const SAMPLES = [
  { category: 'bug',     comment: 'The login page throws a 500 error when I try to reset my password with a very long email address.', email: 'alice@example.com' },
  { category: 'feature', comment: 'Would love a dark mode option. The current white background is hard on the eyes during long sessions.', email: 'bob@example.com' },
  { category: 'general', comment: 'Great product overall! Onboarding was smooth and the docs are excellent.', email: '' },
  { category: 'billing', comment: 'I was charged twice this month. Please refund the duplicate transaction as soon as possible.', email: 'charlie@example.com' },
  { category: 'support', comment: 'Response time from the support team was under 2 hours. Very impressed!', email: 'diana@example.com' },
  { category: 'bug',     comment: 'CSV export silently drops rows when there are more than 1000 records. Data truncation without a warning is a data-integrity issue.', email: '' },
  { category: 'feature', comment: 'Please add a Slack integration so we can receive real-time notifications without checking the dashboard constantly.', email: 'evan@example.com' },
  { category: 'general', comment: 'The search functionality needs improvement — partial matches are not working correctly for multi-word queries.', email: '' },
  { category: 'billing', comment: 'The invoice PDF is missing the company VAT number field. This is required for EU compliance.', email: 'fiona@example.com' },
  { category: 'support', comment: 'The knowledge base articles are outdated. Several screenshots reference the old UI from two versions ago.', email: '' },
  { category: 'bug',     comment: 'Mobile navigation menu does not close after selecting an item on iOS Safari 17.', email: 'george@example.com' },
  { category: 'feature', comment: 'Add bulk-delete for archived records. Currently have to delete one at a time which is very tedious.', email: 'helen@example.com' },
  { category: 'general', comment: 'The API documentation is excellent! Really appreciate the interactive examples.', email: '' },
  { category: 'billing', comment: 'Can you add support for annual billing to save on monthly fees? Many of us would switch immediately.', email: 'ivan@example.com' },
  { category: 'support', comment: 'Received conflicting information from two different support agents about the data retention policy.', email: '' },
  { category: 'bug',     comment: 'Filter by date range does not account for timezones, showing incorrect results for users in UTC-5 and beyond.', email: 'julia@example.com' },
  { category: 'feature', comment: 'Two-factor authentication via authenticator app (not just SMS) would greatly improve security for enterprise users.', email: 'kevin@example.com' },
  { category: 'general', comment: 'Really enjoying the new dashboard design. Much cleaner than the previous version!', email: '' },
  { category: 'billing', comment: 'Payment failed with my corporate Amex card even though the card is valid. Visa works fine.', email: 'lisa@example.com' },
  { category: 'support', comment: 'The live chat widget sometimes takes 5+ minutes to connect to an agent during business hours.', email: 'mike@example.com' },
];

function randomDateWithinDays(maxDays) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * maxDays));
  d.setHours(Math.floor(Math.random() * 23), Math.floor(Math.random() * 59), 0, 0);
  return d.toISOString().replace('T', ' ').slice(0, 19);
}

(async () => {
  await initDb();
  const db = getDb();
  for (const item of SAMPLES) {
    await db.execute({
      sql: 'INSERT INTO feedback (category, comment, email, created_at) VALUES (?, ?, ?, ?)',
      args: [item.category, item.comment, item.email || null, randomDateWithinDays(14)],
    });
  }
  const result = await db.execute('SELECT COUNT(*) as total FROM feedback');
  console.log(`Seed complete. Total feedback rows: ${result.rows[0].total}`);
  process.exit(0);
})();

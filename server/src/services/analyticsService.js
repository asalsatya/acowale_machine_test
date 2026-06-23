'use strict';

const { getDb } = require('../config/db');

const getSummary = async () => {
  const db = getDb();

  const totalResult = await db.execute('SELECT COUNT(*) as total FROM feedback');
  const total = Number(totalResult.rows[0].total);

  const byCategoryResult = await db.execute(
    'SELECT category, COUNT(*) as count FROM feedback GROUP BY category ORDER BY count DESC'
  );
  const byCategory = byCategoryResult.rows.map((r) => ({ category: r.category, count: Number(r.count) }));

  const thisWeekResult = await db.execute(`
    SELECT COUNT(*) as count FROM feedback 
    WHERE created_at >= date('now', '-7 days')
  `);
  const previousWeekResult = await db.execute(`
    SELECT COUNT(*) as count FROM feedback 
    WHERE created_at >= date('now', '-14 days') 
      AND created_at < date('now', '-7 days')
  `);
  
  const thisWeekCount = Number(thisWeekResult.rows[0].count);
  const previousWeekCount = Number(previousWeekResult.rows[0].count);
  
  let weekTrend = 0;
  if (previousWeekCount === 0) {
    weekTrend = thisWeekCount > 0 ? 100 : 0;
  } else {
    weekTrend = Math.round(((thisWeekCount - previousWeekCount) / previousWeekCount) * 100);
  }

  const topCategory = byCategory.length > 0 ? byCategory[0].category : 'N/A';

  const trendResult = await db.execute(`
    SELECT date(created_at) as day, COUNT(*) as count
    FROM feedback
    WHERE created_at >= date('now', '-6 days')
    GROUP BY day
    ORDER BY day ASC
  `);

  const trendMap = Object.fromEntries(trendResult.rows.map((r) => [r.day, Number(r.count)]));
  const trend = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const day = d.toISOString().slice(0, 10);
    trend.push({ day, count: trendMap[day] || 0 });
  }

  return { total, byCategory, trend, thisWeekCount, weekTrend, topCategory };
};

module.exports = { getSummary };

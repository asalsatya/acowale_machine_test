const { createClient } = require('@libsql/client');
const client = createClient({ url: 'file:server/database.sqlite' });
client.execute('SELECT id, created_at FROM feedback ORDER BY created_at DESC LIMIT 5').then(res => {
  console.log(res.rows);
  process.exit(0);
});

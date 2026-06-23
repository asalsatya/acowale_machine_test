const { createClient } = require('@libsql/client');
const client = createClient({ url: 'file:data/crm.db' });
client.execute("DELETE FROM feedback WHERE id = 43")
  .then(() => {
    process.exit(0);
  });

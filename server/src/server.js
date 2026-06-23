'use strict';

require('dotenv').config();

const app    = require('./app');
const env    = require('./config/env');
const logger = require('./middleware/logger');
const { initDb } = require('./config/db');

(async () => {
  await initDb();
  app.listen(env.PORT, () => {
    logger.info({ msg: 'Server started', port: env.PORT, env: env.NODE_ENV });
  });
})();

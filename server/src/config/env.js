'use strict';

const env = {
  NODE_ENV:      process.env.NODE_ENV      || 'development',
  PORT:          Number(process.env.PORT)  || 4000,
  DB_PATH:       process.env.DB_PATH       || './data/crm.db',
  LOG_LEVEL:     process.env.LOG_LEVEL     || 'info',
  CORS_ORIGINS:  process.env.CORS_ORIGINS  || 'http://localhost:5173',
  ADMIN_API_KEY: process.env.ADMIN_API_KEY || '',

  get isProduction()  { return this.NODE_ENV === 'production'; },
  get isDevelopment() { return this.NODE_ENV === 'development'; },
  get isTest()        { return this.NODE_ENV === 'test'; },

  get allowedOrigins() {
    return this.CORS_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean);
  },
};

module.exports = env;

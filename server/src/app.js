'use strict';

require('dotenv').config();

const express  = require('express');
const cors     = require('cors');
const pinoHttp = require('pino-http');

const env          = require('./config/env');
const logger       = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const feedbackRoutes  = require('./routes/feedback.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const healthRoutes    = require('./routes/health.routes');

const app = express();

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || env.allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(pinoHttp({ logger }));
app.use(express.json());

app.use('/api/feedback',  feedbackRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/health',        healthRoutes);

app.use((_req, res) => res.status(404).json({ success: false, error: 'Not found' }));
app.use(errorHandler);

module.exports = app;

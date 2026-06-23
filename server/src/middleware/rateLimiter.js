'use strict';

const rateLimit = require('express-rate-limit');

const submitLimiter = rateLimit({
  windowMs:        15 * 60 * 1000,
  max:             10,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { success: false, error: 'Too many submissions from this IP, please try again later.' },
});

module.exports = { submitLimiter };

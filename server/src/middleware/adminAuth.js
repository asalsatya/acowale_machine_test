'use strict';

const env = require('../config/env');

const adminAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === env.ADMIN_API_KEY) return next();

  return res.status(401).json({ success: false, error: 'Unauthorized — invalid or missing API Key' });
};

module.exports = adminAuth;

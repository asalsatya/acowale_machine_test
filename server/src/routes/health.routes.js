'use strict';

const express = require('express');
const router  = express.Router();

router.get('/', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

module.exports = router;

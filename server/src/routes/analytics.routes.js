'use strict';

const express = require('express');
const router  = express.Router();

const adminAuth  = require('../middleware/adminAuth');
const { summary } = require('../controllers/analytics.controller');

router.get('/summary', adminAuth, summary);

module.exports = router;

'use strict';

const express = require('express');
const router  = express.Router();

const adminAuth = require('../middleware/adminAuth');
const { submitLimiter } = require('../middleware/rateLimiter');
const validate  = require('../middleware/validate');
const { feedbackBodySchema, feedbackQuerySchema } = require('../validators/feedback.validator');
const { submitFeedback, getFeedback } = require('../controllers/feedback.controller');

router.post('/', submitLimiter, validate(feedbackBodySchema, 'body'), submitFeedback);
router.get('/',  adminAuth,    validate(feedbackQuerySchema, 'query'), getFeedback);

module.exports = router;

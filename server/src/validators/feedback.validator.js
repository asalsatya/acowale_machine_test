'use strict';

const { z } = require('zod');
const { VALID_CATEGORIES } = require('../models/feedback.model');

const feedbackBodySchema = z.object({
  category: z.enum(VALID_CATEGORIES, {
    errorMap: () => ({ message: `Category must be one of: ${VALID_CATEGORIES.join(', ')}` }),
  }),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(2000),
  email:   z.string().email('Invalid email address').optional().or(z.literal('')),
});

const feedbackQuerySchema = z.object({
  category: z.enum(VALID_CATEGORIES).optional().or(z.literal('')),
  keyword:  z.string().max(100).optional().or(z.literal('')),
  from:     z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD format').optional().or(z.literal('')),
  to:       z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD format').optional().or(z.literal('')),
  page:     z.coerce.number().int().min(1).default(1),
  limit:    z.coerce.number().int().min(1).max(100).default(20),
});

module.exports = { feedbackBodySchema, feedbackQuerySchema };

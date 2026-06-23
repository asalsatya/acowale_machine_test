'use strict';

const { createFeedback, listFeedback } = require('../services/feedbackService');
const { success } = require('../utils/apiResponse');

const submitFeedback = async (req, res, next) => {
  try {
    const feedback = await createFeedback(req.body);
    return success(res, { message: 'Feedback submitted successfully', feedback }, 201);
  } catch (err) {
    return next(err);
  }
};

const getFeedback = async (req, res, next) => {
  try {
    const result = await listFeedback(req.query);
    return success(res, result);
  } catch (err) {
    return next(err);
  }
};

module.exports = { submitFeedback, getFeedback };

'use strict';

const { insertFeedback, findFeedback, VALID_CATEGORIES } = require('../models/feedback.model');

const createFeedback = (data) => insertFeedback(data);
const listFeedback   = (filters) => findFeedback(filters);

module.exports = { createFeedback, listFeedback, VALID_CATEGORIES };

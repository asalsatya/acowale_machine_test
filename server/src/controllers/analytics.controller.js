'use strict';

const { getSummary } = require('../services/analyticsService');
const { success }    = require('../utils/apiResponse');

const summary = async (_req, res, next) => {
  try {
    const data = await getSummary();
    return success(res, data);
  } catch (err) {
    return next(err);
  }
};

module.exports = { summary };

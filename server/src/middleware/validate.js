'use strict';

const { success, error } = require('../utils/apiResponse');

const validate = (schema, target = 'body') => (req, res, next) => {
  const parsed = schema.safeParse(req[target]);
  if (!parsed.success) {
    return error(
      res,
      target === 'body' ? 'Validation failed' : 'Invalid query parameters',
      400,
      parsed.error.flatten().fieldErrors
    );
  }
  req[target] = parsed.data;
  return next();
};

module.exports = validate;

'use strict';

const logger = require('./logger');

const errorHandler = (err, req, res, _next) => {
  const status  = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  logger.error({
    msg:    'Unhandled error',
    err:    { message: err.message, stack: err.stack },
    status,
    url:    req.url,
    method: req.method,
  });

  res.status(status).json({
    success: false,
    error:   message,
    ...(err.details  && { details:   err.details }),
    ...(req.id       && { requestId: req.id }),
  });
};

module.exports = errorHandler;

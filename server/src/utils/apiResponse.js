'use strict';

const success = (res, data, status = 200) =>
  res.status(status).json({ success: true, data });

const error = (res, message, status = 500, details) => {
  const body = { success: false, error: message };
  if (details !== undefined) body.details = details;
  return res.status(status).json(body);
};

module.exports = { success, error };

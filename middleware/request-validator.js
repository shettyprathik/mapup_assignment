const { validationResult } = require('express-validator');
const { RequestValidationError } = require('../errors/error');

const requestValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new RequestValidationError(errors.array()));
  }
  next();
};

module.exports = requestValidator;

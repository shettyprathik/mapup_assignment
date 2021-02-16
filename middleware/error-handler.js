const { CustomError } = require('../errors/error');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializeErrors());
  }
  res.status(500).json([{ message: 'Something went wrong' }]);
  next();
};

module.exports = errorHandler;

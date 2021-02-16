const { AuthenticationError } = require('../errors/error');

const authentication = (req, res, next) => {
  if (!req.currentUser) {
    return next(new AuthenticationError('User not logged in'));
  }
  next();
};

module.exports = authentication;

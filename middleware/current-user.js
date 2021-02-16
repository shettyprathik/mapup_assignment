const { verifyJwt } = require('../utils/jwt');
const users = require('../models/users');

const currentUser = async (req, res, next) => {
  const token = req.cookies ? req.cookies.jwt : undefined;
  try {
    const decode = verifyJwt(token);
    req.currentUser = users.filter((user) => user.id == decode.id);
  } catch (e) {
    req.currentUser = undefined;
  }
  next();
};

module.exports = currentUser;

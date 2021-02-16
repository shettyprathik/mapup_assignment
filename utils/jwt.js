const jwt = require("jsonwebtoken");

const secret = "testsecret";
const expiresIn = "24h";

const createJwt = (body) => {
  const token = jwt.sign(body, secret, {
    expiresIn,
  });
  return token;
};

const verifyJwt = (token) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

module.exports = {
  createJwt,
  verifyJwt,
};

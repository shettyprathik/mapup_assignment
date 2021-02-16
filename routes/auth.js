const express = require('express');
const { body } = require('express-validator');
const requestValidator = require('../middleware/request-validator');
const { createJwt } = require('../utils/jwt');
const { AuthenticationError, NotFoundError } = require('../errors/error');
const users = require('../models/users');
const router = express.Router();

router.post(
  '/signin',
  [body('id').isEmail().toLowerCase(), body('password').isString()],
  requestValidator,
  async (req, res, next) => {
    const { id, password } = req.body;
    const existingUser = users.filter((user) => user.id == id);

    if (!existingUser.length) {
      return next(new NotFoundError('User not found'));
    }

    if (password !== existingUser[0].password) {
      return next(new AuthenticationError('Invalid credentials'));
    }

    const token = createJwt({ id: existingUser[0].id });

    res.cookie('jwt', token, {
      maxAge: 86400000,
      httpOnly: true,
    });

    res.json({ id: existingUser[0].id, token });
  }
);

module.exports = router;

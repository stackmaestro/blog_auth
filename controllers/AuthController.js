/* eslint-disable no-unused-vars */
const passport = require('../middlewares/Passport');
const authSerivce = require('../services/AuthService');
const errorMessages = require('../util/error');
const successMessages = require('../util/success');
const statuses = require('../util/statuses');

require('dotenv');

const signup = async (req, res, next) => {
  passport.authenticate(
    'signup',
    { session: false },
    async (err, user, info) => {
      res.json({
        message: successMessages.sigunpSuccess,
        user: req.user,
      });
    }
  )(req, res, next);
};

const login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        res
          .status(statuses.BAD_REQUEST)
          .send(errorMessages.getError(info.message));
      } else {
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = { _id: user._id, name: user.name, email: user.email };
          const token = authSerivce.signToken(body);
          return res.json({
            token,
            user: { name: user.name, email: user.email },
          });
        });
      }
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const authenticate = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    if (!err && !user)
      res
        .status(statuses.UNAUTHENTICATED)
        .send(errorMessages.getError(errorMessages.unauthorized));
    else res.send({ name: user.name, email: user.email });
  })(req, res, next);
};

const checkAuth = async (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: process.env.SESSION },
    async (err, user) => {
      if (!err && !user)
        res
          .status(statuses.UNAUTHENTICATED)
          .send(errorMessages.getError(errorMessages.unauthorized));
      else {
        req.user = user;
        next();
      }
    }
  )(req, res, next);
};

module.exports.signup = signup;
module.exports.login = login;
module.exports.authenticate = authenticate;
module.exports.checkAuth = checkAuth;

/* eslint-disable new-cap */
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/User');
const errorMessages = require('../util/error');
const successMessages = require('../util/success');

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      try {
        const { name } = req.body;
        const user = await UserModel.create({ name, email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function (email, password, done) {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, {
            message: errorMessages.invalidCredentials,
          });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {
            message: errorMessages.invalidCredentials,
          });
        }

        return done(null, user, { message: successMessages.loginSuccess });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_KEY,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
    },
    async function (token, done) {
      try {
        const result = await UserModel.findById(token.user._id);
        if (!result) return done(null, null);
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;

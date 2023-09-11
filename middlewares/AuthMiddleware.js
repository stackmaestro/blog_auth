const { signupValidator } = require('../validators/AuthValidators');
const errorMessages = require('../util/error');
const statuses = require('../util/statuses');

const signupMiddleware = async (req, res, next) => {
  req.checkBody('name', errorMessages.nameEmpty).notEmpty().trim();
  req
    .checkBody('email', errorMessages.emailInvalid)
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail();
  req
    .checkBody('password', errorMessages.passwordEmpty)
    .notEmpty()
    .trim()
    .escape();

  const userExists = await signupValidator(req.body.email);
  let errors = req.validationErrors();
  if (userExists && !errors) {
    errors = [];
    errors.push({
      location: 'body',
      param: 'email',
      msg: errorMessages.emailRegistered,
      value: req.body.email,
    });
  }
  if (errors) {
    return res.status(statuses.UNPROCESSABLE_ENTITY).json({ errors });
  }
  next();
};

const signinMiddleware = async (req, res, next) => {
  req
    .checkBody('email', errorMessages.invalidCredentials)
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail();
  req
    .checkBody('password', errorMessages.invalidCredentials)
    .notEmpty()
    .trim()
    .escape();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(statuses.UNPROCESSABLE_ENTITY).json({ errors });
  }
  next();
};

module.exports.signupMiddleware = signupMiddleware;
module.exports.signinMiddleware = signinMiddleware;

const UserModel = require('../models/User');

const signupValidator = (value) => UserModel.exists({ email: value });

module.exports.signupValidator = signupValidator;

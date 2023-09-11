const jwt = require('jsonwebtoken');

const signToken = (data) => jwt.sign({ user: data }, process.env.JWT_KEY);

module.exports.signToken = signToken;

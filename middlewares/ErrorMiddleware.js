const errorMessages = require('../util/error');
const statuses = require('../util/statuses');

const errorHandler = (err, req, res, next) => {
  res.status(err?.status || statuses.SERVER_ERROR);
  res.send(errorMessages.getError(err.msg ?? errorMessages.serverError));
  next();
};

process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});

module.exports = errorHandler;

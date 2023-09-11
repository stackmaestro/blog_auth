/* eslint-disable no-console */
require('dotenv');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on('error', (error) => console.log(error));
mongoose.connection.on('connected', () => console.log('Database Connected!'));
mongoose.connection.on('disconnected', () =>
  console.log('Database Disconnected!')
);
mongoose.Promise = global.Promise;

module.exports = mongoose;

/* eslint-disable no-console */
require('dotenv').config({ path: './.env' });
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('./middlewares/CorsMiddleware');
const passport = require('./middlewares/Passport');
const routes = require('./routes/router');
const errorMiddleware = require('./middlewares/ErrorMiddleware');

const app = express();
app.use(passport.initialize());
app.use(passport.session(false));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(expressValidator());

app.use('/api', routes);
app.use(errorMiddleware);
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

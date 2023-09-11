const {
  signupMiddleware,
  signinMiddleware,
} = require('../middlewares/AuthMiddleware');

const authController = require('../controllers/AuthController');

const Signup = (router) => {
  router.post('/signup', signupMiddleware, authController.signup);
};

const Login = (router) => {
  router.post('/login', signinMiddleware, authController.login);
};

const Authenticate = (router) => {
  router.get('/authenticate', authController.authenticate);
};

module.exports.Signup = Signup;
module.exports.Login = Login;
module.exports.Authenticate = Authenticate;

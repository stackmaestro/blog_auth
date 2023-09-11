const postValidator = require('../validators/PostValidator');
const errorMessages = require('../util/error');
const statuses = require('../util/statuses');

const createPost = async (req, res, next) => {
  req
    .checkBody('title', errorMessages.postTitleEmpty)
    .notEmpty()
    .trim()
    .isLength({ min: 15 })
    .withMessage(errorMessages.postTitleMin);
  req
    .checkBody('content', errorMessages.postContentEmpty)
    .notEmpty()
    .trim()
    .isLength({ min: 50 })
    .withMessage(errorMessages.postContentMin);

  const errors = req.validationErrors();
  if (errors) {
    return res.status(statuses.UNPROCESSABLE_ENTITY).json({ errors });
  }
  next();
};

const existsPost = async (req, res, next) => {
  const errors = [];
  try {
    const postExists = await postValidator.postExists(req.params.id);
    if (!postExists) throw new Error();
    next();
  } catch (e) {
    errors.push({
      location: 'params',
      param: 'id',
      msg: errorMessages.postInvalid,
      value: req.params.id,
    });
    return res.status(statuses.UNPROCESSABLE_ENTITY).json({ errors });
  }
};

const updatePost = async (req, res, next) => {
  req
    .checkBody('title', errorMessages.postTitleEmpty)
    .notEmpty()
    .trim()
    .isLength({ min: 15 })
    .withMessage(errorMessages.postTitleMin);
  req
    .checkBody('content', errorMessages.postContentEmpty)
    .notEmpty()
    .trim()
    .isLength({ min: 50 })
    .withMessage(errorMessages.postContentMin);

  const errors = req.validationErrors();
  if (errors) {
    return res.status(statuses.UNPROCESSABLE_ENTITY).json({ errors });
  }
  existsPost(req, res, next);
};

module.exports.createPost = createPost;
module.exports.updatePost = updatePost;
module.exports.existsPost = existsPost;

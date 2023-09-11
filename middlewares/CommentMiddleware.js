const { existsPost } = require('./PostMiddleware');
const commentValidator = require('../validators/CommentValidator');
const errorMessages = require('../util/error');
const statuses = require('../util/statuses');

const commentExists = async (req, res, next) => {
  const errors = [];
  try {
    const comment = await commentValidator.commentExists(req.params.id);
    if (!comment) throw new Error();
    next();
  } catch (e) {
    errors.push({
      location: 'params',
      param: 'id',
      msg: errorMessages.commentNotFound,
      value: req.params.id,
    });
    return res.status(statuses.UNPROCESSABLE_ENTITY).json({ errors });
  }
};

const createComment = async (req, res, next) => {
  req.checkBody('text', errorMessages.commentEmpty).notEmpty().trim();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(statuses.UNPROCESSABLE_ENTITY).json({ errors });
  }
  existsPost(req, res, next);
};

const updateComment = async (req, res, next) => {
  req.checkBody('text', errorMessages.commentEmpty).notEmpty().trim();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(statuses.UNPROCESSABLE_ENTITY).json({ errors });
  }
  commentExists(req, res, next);
};

const deleteComment = async (req, res, next) => {
  const errors = req.validationErrors();
  if (errors) {
    return res.status(statuses.UNPROCESSABLE_ENTITY).json({ errors });
  }
  commentExists(req, res, next);
};

module.exports.createComment = createComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;
module.exports.commentExists = commentExists;

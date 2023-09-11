const CommentService = require('../services/CommentService');
const asyncCaller = require('../util/asyncCaller');
const statuses = require('../util/statuses');

const getComments = asyncCaller(async (req, res) => {
  const result = await CommentService.getComments(req.params.id);
  res.status(statuses.OK).send(result);
});

const createComment = asyncCaller(async (req, res) => {
  const result = await CommentService.createComment(
    req.params.id,
    req.body,
    req.user._id
  );
  res.status(statuses.CREATED).send(result);
});

const updateComment = asyncCaller(async (req, res) => {
  const result = await CommentService.updateComment(
    req.params.id,
    req.body,
    req.user._id
  );
  res.status(statuses.OK).send(result);
});

const deleteComment = asyncCaller(async (req, res) => {
  const result = await CommentService.deleteComment(
    req.params.id,
    req.user._id
  );
  res.status(statuses.OK).send(result);
});

module.exports.getComments = getComments;
module.exports.createComment = createComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;

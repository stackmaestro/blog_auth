const { ObjectId } = require('mongoose').Types;
const PostModel = require('../models/Post');
const { CommentModel } = require('../models/Comment');
const errorMessages = require('../util/error');
const statuses = require('../util/statuses');

const getComments = async (postid) => {
  const post = await PostModel.findById(postid);
  if (!post.published)
    throw { status: statuses.UNAUTHORIZED, msg: errorMessages.forbidComment };
  return CommentModel.find({
    postId: { $eq: ObjectId(postid).toString() },
  }).populate({ path: 'author', select: 'name email -_id' });
};

const createComment = async (postid, data, userId) => {
  const post = await PostModel.findById(postid);
  if (!post.published)
    throw { status: statuses.UNAUTHORIZED, msg: errorMessages.forbidComment };
  const comment = await CommentModel.create({
    text: data.text,
    author: userId,
    postId: postid,
  });
  return CommentModel.populate(comment, {
    path: 'author',
    select: 'name email -_id',
  });
};

const updateComment = async (cid, data, userId) => {
  const comment = await CommentModel.findById(cid);
  if (comment.author.toString() !== userId)
    throw { status: statuses.UNAUTHORIZED, msg: errorMessages.unauthorized };
  comment.text = data.text;
  comment.save();
  return CommentModel.populate(comment, {
    path: 'author',
    select: 'name email -_id',
  });
};

const deleteComment = async (cid, userId) => {
  const comment = await CommentModel.findById(cid);
  const post = await PostModel.findById(comment.postId);
  if (post.author.toString() !== userId && comment.author.toString() !== userId)
    throw { status: statuses.UNAUTHORIZED, msg: errorMessages.unauthorized };
  comment.remove();
  return CommentModel.populate(comment, {
    path: 'author',
    select: 'name email -_id',
  });
};

module.exports.getComments = getComments;
module.exports.createComment = createComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;

const { CommentModel } = require('../models/Comment');

const commentExists = async (commentId) =>
  CommentModel.countDocuments({ _id: commentId });

module.exports.commentExists = commentExists;

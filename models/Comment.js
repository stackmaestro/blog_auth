const { ObjectId } = require('../services/MongooseService');
const mongoose = require('../services/MongooseService');
const UserModel = require('./User');
const errorMessages = require('../util/error');

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, errorMessages.commentEmpty],
    },
    author: {
      type: ObjectId,
      required: true,
      ref: UserModel,
    },
    postId: {
      type: ObjectId,
      ref: 'Post',
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports.CommentSchema = CommentSchema;
module.exports.CommentModel = CommentModel;

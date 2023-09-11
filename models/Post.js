const { ObjectId } = require('../services/MongooseService');
const mongoose = require('../services/MongooseService');
const { CommentModel } = require('./Comment');
const UserModel = require('./User');
const errorMessages = require('../util/error');

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, errorMessages.postTitleEmpty],
    },
    content: {
      type: String,
      required: [true, errorMessages.postContentEmpty],
    },
    published: {
      type: Boolean,
      default: false,
    },
    author: {
      type: ObjectId,
      required: true,
      ref: UserModel,
    },
  },
  { timestamps: true }
);

PostSchema.post('remove', async (doc) => {
  await CommentModel.deleteMany({ postId: { $eq: doc._id } });
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;

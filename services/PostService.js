const PostModel = require('../models/Post');
const errorMessages = require('../util/error');
const statuses = require('../util/statuses');

const populatePost = (post) =>
  PostModel.populate(post, { path: 'author', select: 'name email -_id' });

const getAllPosts = async () =>
  PostModel.find({ published: { $not: { $eq: false } } })
    .sort({ updatedAt: -1 })
    .populate('author', 'name email -_id')
    .sort({ updated_At: -1 });

const getUserPosts = async (userId) =>
  PostModel.find({ author: { $eq: userId } })
    .sort({ updatedAt: -1 })
    .populate('author', 'name email -_id');

const createPost = async (data, userId) => {
  const post = await PostModel.create({
    title: data.title,
    content: data.content,
    author: userId,
  });
  return populatePost(post);
};

const getPost = async (postId) =>
  PostModel.findById(postId).populate('author', 'name email -_id');

const publishPost = async (postId, userId) => {
  const post = await PostModel.findById(postId);
  if (post.author.toString() !== userId)
    throw { status: statuses.UNAUTHORIZED, msg: errorMessages.unauthorized };
  post.published = true;
  post.save();
  return populatePost(post);
};

const updatePost = async (postId, data, userId) => {
  const post = await PostModel.findById(postId);
  if (post.author.toString() !== userId)
    throw { status: statuses.UNAUTHORIZED, msg: errorMessages.unauthorized };
  post.title = data.title;
  post.content = data.content;
  post.save();
  return populatePost(post);
};

const deletePost = async (postId, userId) => {
  const post = await PostModel.findById(postId);
  if (post.author.toString() !== userId)
    throw { status: statuses.UNAUTHORIZED, msg: errorMessages.unauthorized };
  post.remove();
  return populatePost(post);
};

module.exports.getAllPosts = getAllPosts;
module.exports.createPost = createPost;
module.exports.getUserPosts = getUserPosts;
module.exports.getPost = getPost;
module.exports.publishPost = publishPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
module.exports.populatePost = populatePost;

const PostService = require('../services/PostService');
const asyncCaller = require('../util/asyncCaller');
const statuses = require('../util/statuses');

const getPosts = asyncCaller(async (req, res) => {
  const result = await PostService.getAllPosts();
  const status = result.length > 0 ? statuses.OK : statuses.NOT_FOUND;
  res.status(status).send(result);
});

const getUserPosts = asyncCaller(async (req, res) => {
  const result = await PostService.getUserPosts(req.user._id);
  const status = result.length > 0 ? statuses.OK : statuses.NOT_FOUND;
  res.status(status).send(result);
});

const createPost = asyncCaller(async (req, res) => {
  const result = await PostService.createPost(req.body, req.user._id);
  res.status(statuses.CREATED).send(result);
});

const getPost = asyncCaller(async (req, res) => {
  const result = await PostService.getPost(req.params.id);
  res.status(statuses.OK).send(result);
});

const publishPost = asyncCaller(async (req, res) => {
  const result = await PostService.publishPost(req.params.id, req.user._id);
  res.status(statuses.OK).send(result);
});

const updatePost = asyncCaller(async (req, res) => {
  const result = await PostService.updatePost(
    req.params.id,
    req.body,
    req.user._id
  );
  res.status(statuses.OK).send(result);
});

const deletePost = asyncCaller(async (req, res) => {
  const result = await PostService.deletePost(req.params.id, req.user._id);
  res.status(statuses.OK).send(result);
});

module.exports.getPosts = getPosts;
module.exports.createPost = createPost;
module.exports.getUserPosts = getUserPosts;
module.exports.getPost = getPost;
module.exports.publishPost = publishPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;

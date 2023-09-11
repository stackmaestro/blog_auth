const PostModel = require('../models/Post');

const postExists = async (postId) => PostModel.countDocuments({ _id: postId });

module.exports.postExists = postExists;

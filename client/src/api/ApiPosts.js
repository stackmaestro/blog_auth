import {
  ApiGet,
  ApiPostSecure,
  ApiGetSecure,
  ApiPutSecure,
  ApiDeleteSecure,
  paths,
} from './ApiUtils';

const getAllPosts = async () => ApiGet(`${paths.posts}`);

const getUserPosts = async () => ApiGetSecure(`${paths.authorPosts}`);

const getPostDetails = async (data) => ApiGet(`${paths.posts}/${data.id}`);

const createPost = async (data) => ApiPostSecure(`${paths.posts}`, data);

const publishPost = async (data) =>
  ApiPostSecure(`${paths.posts}/${data.id}`, {});

const updatePost = async (data) =>
  ApiPutSecure(`${paths.posts}/${data.id}`, data);

const deletePost = async (data) =>
  ApiDeleteSecure(`${paths.posts}/${data.id}`, {});

export {
  getAllPosts,
  getUserPosts,
  getPostDetails,
  createPost,
  publishPost,
  updatePost,
  deletePost,
};

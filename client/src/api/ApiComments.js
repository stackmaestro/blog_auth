import {
  ApiGet,
  ApiPutSecure,
  ApiPostSecure,
  ApiDeleteSecure,
  paths,
} from './ApiUtils';

const getComments = async (data) => ApiGet(`${paths.comments}/${data.id}`);

const addComment = async (data) =>
  ApiPostSecure(`${paths.comments}/${data.postId}`, data);

const updateComment = async (data) =>
  ApiPutSecure(`${paths.comments}/${data.cid}`, data);

const deleteComment = async (data) =>
  ApiDeleteSecure(`${paths.comments}/${data.cid}`);

export { getComments, addComment, updateComment, deleteComment };

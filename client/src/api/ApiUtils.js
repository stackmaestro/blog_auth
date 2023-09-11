import axios from 'axios';
import Cookies from 'universal-cookie';
import errorMessages from '../utils/errors';

export const secretTokenKey = 'secret_token';

const ApiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const paths = {
  signup: '/signup',
  login: '/login',
  authenticate: '/authenticate',
  posts: '/posts',
  authorPosts: '/my-posts',
  comments: '/comments',
};

const getErrors = (error) =>
  error?.response?.data ?? { errors: [{ msg: errorMessages.unknown }] };

export const ApiGet = async (path, params = null) =>
  ApiClient.get(path, params)
    .then((response) => response.data)
    .catch((error) => getErrors(error));

export const ApiGetSecure = async (path) => {
  const secretToken = new Cookies().get(secretTokenKey);
  return ApiClient.get(path, { params: { secret_token: secretToken } })
    .then((response) => response.data)
    .catch((error) => getErrors(error));
};

export const ApiPost = async (path, data) =>
  ApiClient.post(path, data)
    .then((response) => response.data)
    .catch((error) => getErrors(error));

export const ApiPostSecure = async (path, data) => {
  const secretToken = new Cookies().get(secretTokenKey);
  return ApiClient.post(path, data, { params: { secret_token: secretToken } })
    .then((response) => response.data)
    .catch((error) => getErrors(error));
};

export const ApiPutSecure = async (path, data) => {
  const secretToken = new Cookies().get(secretTokenKey);
  return ApiClient.put(path, data, { params: { secret_token: secretToken } })
    .then((response) => response.data)
    .catch((error) => getErrors(error));
};

export const ApiDeleteSecure = async (path, data) => {
  const secretToken = new Cookies().get(secretTokenKey);
  return ApiClient.delete(path, { data, params: { secret_token: secretToken } })
    .then((response) => response.data)
    .catch((error) => getErrors(error));
};

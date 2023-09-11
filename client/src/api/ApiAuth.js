import Cookies from 'universal-cookie';
import { ApiPost, ApiGet, paths, secretTokenKey } from './ApiUtils';

const signUp = async (data) => ApiPost(`${paths.signup}`, data);

const signIn = async (data) => {
  const result = await ApiPost(`${paths.login}`, data);
  if (result.errors) return result;
  document.cookie = `${secretTokenKey}=${result.token}; path=/; Secure; SameSite=none`;
  return result;
};

const signOut = async () => {
  document.cookie = `${secretTokenKey}=; path=/;  Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

const isAuthenticated = async (data = null) => {
  const token = new Cookies().get(secretTokenKey);
  if (!token) return null;
  return ApiGet(
    `${paths.authenticate}`,
    { params: { secret_token: token } },
    data
  );
};

export { signIn, signUp, signOut, isAuthenticated };

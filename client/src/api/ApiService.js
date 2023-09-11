import * as Auth from './ApiAuth';
import * as Comments from './ApiComments';
import * as Posts from './ApiPosts';

const ApiService = {
  ...Auth,
  ...Comments,
  ...Posts,
};

export default ApiService;

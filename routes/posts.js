const PostController = require('../controllers/PostController');
const PostMiddleware = require('../middlewares/PostMiddleware');
const auth = require('../controllers/AuthController');

const Posts = (router) => {
  router
    .route('/posts')
    .get(PostController.getPosts)
    .post(auth.checkAuth, PostMiddleware.createPost, PostController.createPost);
};

const MyPosts = (router) => {
  router.get('/my-posts', auth.checkAuth, PostController.getUserPosts);
};

const SinglePost = (router) => {
  router
    .route('/posts/:id')
    .get(PostMiddleware.existsPost, PostController.getPost)
    .post(auth.checkAuth, PostMiddleware.existsPost, PostController.publishPost)
    .put(auth.checkAuth, PostMiddleware.updatePost, PostController.updatePost)
    .delete(
      auth.checkAuth,
      PostMiddleware.existsPost,
      PostController.deletePost
    );
};

module.exports.Posts = Posts;
module.exports.MyPosts = MyPosts;
module.exports.SinglePost = SinglePost;

const CommentController = require('../controllers/CommentController');
const CommentMiddleware = require('../middlewares/CommentMiddleware');
const PostMiddleware = require('../middlewares/PostMiddleware');
const auth = require('../controllers/AuthController');

const Comments = (router) => {
  router
    .route('/comments/:id')
    .get(PostMiddleware.existsPost, CommentController.getComments)
    .post(
      auth.checkAuth,
      CommentMiddleware.createComment,
      CommentController.createComment
    )
    .put(
      auth.checkAuth,
      CommentMiddleware.updateComment,
      CommentController.updateComment
    )
    .delete(
      auth.checkAuth,
      CommentMiddleware.deleteComment,
      CommentController.deleteComment
    );
};

module.exports.Comments = Comments;

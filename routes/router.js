const express = require('express');

const router = express.Router();
const authRoutes = require('./auth');
const postRoutes = require('./posts');
const commentsRoutes = require('./comments');

// Register Authentication Routes
authRoutes.Signup(router);
authRoutes.Login(router);
authRoutes.Authenticate(router);

// Register Post Routes
postRoutes.Posts(router);
postRoutes.MyPosts(router);
postRoutes.SinglePost(router);

// Register Comments Routes
commentsRoutes.Comments(router);
module.exports = router;

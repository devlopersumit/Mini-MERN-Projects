const express = require('express');
const userAuth = require('../middlewares/authMiddleware');
const { createPost, getPosts, getPostById, updatePost, deletedPost } = require('../controllers/postController');

const postRouter = express.Router();

//Create Post
postRouter.post('/posts', userAuth, createPost);

//Get all Post
postRouter.get('/posts', getPosts);

//Get post By Id
postRouter.get('/posts/:id', getPostById);

//Update Post
postRouter.put('/posts/:id', userAuth, updatePost);

//Delete Post
postRouter.delete('/posts/:id', userAuth, deletedPost);

module.exports = postRouter;
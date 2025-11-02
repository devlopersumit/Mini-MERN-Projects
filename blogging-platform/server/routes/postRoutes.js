const express = require('express');
const userAuth = require('../middlewares/authMiddleware');
const { createPost, getPosts, getPostById, updatePost, deletedPost } = require('../controllers/postController');
const upload = require('../configs/multer');

const postRouter = express.Router();

//Create Post with image upload
postRouter.post('/', userAuth, upload.single('image'), createPost);

//Get all Post
postRouter.get('/', getPosts);

//Get post By Id
postRouter.get('/:id', getPostById);

//Update Post
postRouter.put('/:id', userAuth, upload.single('image'), updatePost);

//Delete Post
postRouter.delete('/:id', userAuth, deletedPost);

module.exports = postRouter;
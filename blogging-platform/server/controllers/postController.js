const Post = require("../models/post");

//Create a Post
const createPost = async (req, res) => {
    try{
        const { title, content } = req.body;
        const imageUrl = req.file?.path; //cloudinary returns URL in req.file.path

        if(!req.user) {
            res.status(401).json({message:'Unauthorized'});
        }

        const newPost = await Post.create({
            title,
             content,
             image:imageUrl,
             author:req.user._id
        });

        res.status(201).json({
            message:'Post created succefully!',
            post:newPost,
        });

    }catch(error) {
        res.status(500).json({message:error.message});
    }
};

//Get all posts
const getPosts = async (req, res) => {
    try{
        const allPosts = await Post.find().populate('author', 'name email').sort({createdAt:-1});
        res.status(200).json(allPosts);
    }catch(err) {
        res.status(500).json({message:err.message});
    }
};

//Get Post By Id
const getPostById = async (req, res) => {
    try{
        const postId = req.params.id;

        const getPost = await Post.findById({postId}).populate('author, name email');

        if(!getPost) {
          return res.status(404).json({message:'Post not found!'})
        }

        res.status(201).json({getPost});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

//Update Post
const updatePost = async (req, res) => {
    try{
        const postId = req.params.id;
        const { title, content } = req.body;

        const post = await Post.findById({postId});

        if(!post) {
           return  res.status(404).json({message:'Post not found!'})
        }

        if(post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({message:'You cannot edit the post!'})
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, {title, content}, {new:true});

        res.status(200).json({message:'post updated succesfully!', post:updatedPost});

    }catch(err) {
        res.status(500).json({message:err.message});
    }
};

//Delete a Post

const deletedPost = async (req, res) => {
    try{
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if(!post) {
            return  res.status(404).json({message:'Post not found!'})
        }

        if(post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({message:'you cannot delete this post!'});
        }

        const deletedPost = await Post.findByIdAndDelete(postId);

        res.status(200).json({message:'Post Deleted succesfully!'});
    }catch(err) {
        res.status(500).json({message:err.message});
    }
};

module.exports = {createPost, getPosts, getPostById, updatePost, deletedPost};

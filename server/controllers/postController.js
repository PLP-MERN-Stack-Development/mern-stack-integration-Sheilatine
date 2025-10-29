const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.json(posts);
  } catch(err) { res.status(500).json({ message: 'Server error' }); }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if(!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch(err){ res.status(500).json({ message:'Server error' }); }
};

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const post = new Post({ title, body, image, author: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch(err){ console.error(err); res.status(500).json({ message:'Server error' }); }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ message:'Post not found' });

    if(post.author.toString() !== req.user.id) {
      return res.status(403).json({ message:'Not authorized' });
    }

    if(req.file) {
      // delete old image if exists
      if(post.image) {
        const oldPath = path.join(__dirname, '..', post.image);
        if(fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      post.image = `/uploads/${req.file.filename}`;
    }

    post.title = req.body.title || post.title;
    post.body = req.body.body || post.body;
    await post.save();
    res.json(post);
  } catch(err){ console.error(err); res.status(500).json({ message:'Server error' }); }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ message:'Post not found' });

    if(post.author.toString() !== req.user.id) return res.status(403).json({ message:'Not authorized'});

    if(post.image){
      const oldPath = path.join(__dirname, '..', post.image);
      if(fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await post.remove();
    res.json({ message: 'Post removed' });
  } catch(err){ console.error(err); res.status(500).json({ message:'Server error' }); }
};

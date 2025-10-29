const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// multer config - store in /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

// CREATE post
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, body } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const post = new Post({ title, body, imageUrl, author: req.user.id });
    await post.save();
    res.json(post);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// READ all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
  res.json(posts);
});

// READ single post
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'name email');
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
});

// UPDATE post (only author)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    post.title = req.body.title ?? post.title;
    post.body = req.body.body ?? post.body;
    if (req.file) post.imageUrl = `/uploads/${req.file.filename}`;
    await post.save();
    res.json(post);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// DELETE post
router.delete('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  await post.remove();
  res.json({ message: 'Deleted' });
});

// ADD comment
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    post.comments.push({ author: req.user.id, text: req.body.text });
    await post.save();
    res.json(post);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;

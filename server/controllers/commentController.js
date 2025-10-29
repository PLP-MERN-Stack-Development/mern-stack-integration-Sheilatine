const Comment = require('../models/Comment');

exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author', 'name').sort({ createdAt: 1 });
    res.json(comments);
  } catch(err){ res.status(500).json({ message:'Server error' }); }
};

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if(!text) return res.status(400).json({ message:'Comment text required' });

    const comment = new Comment({ post: req.params.postId, author: req.user.id, text });
    await comment.save();
    await comment.populate('author', 'name');
    res.status(201).json(comment);
  } catch(err){ res.status(500).json({ message:'Server error' }); }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if(!comment) return res.status(404).json({ message: 'Comment not found' });
    if(comment.author.toString() !== req.user.id) return res.status(403).json({ message:'Not authorized' });
    await comment.remove();
    res.json({ message:'Comment removed' });
  } catch(err){ res.status(500).json({ message:'Server error' }); }
};

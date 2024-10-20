const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware

// POST /api/posts - Create a new post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// GET /api/posts/recent - Get recent posts
router.get('/recent', authMiddleware, async (req, res) => {
  try {
    // Fetch recent posts, sorted by creation date in descending order
    const recentPosts = await Post.find().sort({ createdAt: -1 }).limit(10); // Limit to 10 recent posts, adjust as needed
    res.json(recentPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /api/posts - Get all posts
router.get('/', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/posts/:id - Get a post by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/posts/:id - Update a post by ID
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/posts/:id - Delete a post by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

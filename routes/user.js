const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/users (Create a new user)
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/users/:id (Get a user by ID, protected)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' }); // 404 for resource not found
    res.json(user); // Return the user data
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message }); // 500 for server errors
  }
});

// PUT /api/users/:id (Update user details, protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user); // Return updated user
  } catch (err) {
    res.status(400).json({ error: err.message }); // 400 for bad request or validation issues
  }
});

// DELETE /api/users/:id (Delete a user, protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' }); // Return success message
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

module.exports = router;

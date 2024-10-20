const express = require('express');
const router = express.Router();
const Network = require('../models/network');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware

// POST /api/networks
router.post('/', authMiddleware, async (req, res) => {
  try {
    const network = new Network(req.body);
    await network.save();
    res.status(201).json(network);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/networks/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const network = await Network.findById(req.params.id);
    if (!network) return res.status(404).json({ error: 'Network not found' });
    res.json(network);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/networks/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const network = await Network.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!network) return res.status(404).json({ error: 'Network not found' });
    res.json(network);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/networks/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const network = await Network.findByIdAndDelete(req.params.id);
    if (!network) return res.status(404).json({ error: 'Network not found' });
    res.json({ message: 'Network deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

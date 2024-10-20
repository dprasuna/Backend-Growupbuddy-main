const express = require('express');
const router = express.Router();
const Host = require('../models/host');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware

// POST /api/hosts
router.post('/', authMiddleware, async (req, res) => {
  try {
    const host = new Host(req.body);
    await host.save();
    res.status(201).json(host);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/hosts/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const host = await Host.findById(req.params.id);
    if (!host) return res.status(404).json({ error: 'Host not found' });
    res.json(host);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/hosts/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const host = await Host.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!host) return res.status(404).json({ error: 'Host not found' });
    res.json(host);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/hosts/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const host = await Host.findByIdAndDelete(req.params.id);
    if (!host) return res.status(404).json({ error: 'Host not found' });
    res.json({ message: 'Host deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

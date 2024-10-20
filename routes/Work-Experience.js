const express = require('express');
const router = express.Router();
const Work = require('../models/Work');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware

// POST /api/works
router.post('/', authMiddleware, async (req, res) => {
  try {
    const work = new Work(req.body);
    await work.save();
    res.status(201).json(work);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/works/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) return res.status(404).json({ error: 'Work not found' });
    res.json(work);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/works/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const work = await Work.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!work) return res.status(404).json({ error: 'Work not found' });
    res.json(work);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/works/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const work = await Work.findByIdAndDelete(req.params.id);
    if (!work) return res.status(404).json({ error: 'Work not found' });
    res.json({ message: 'Work deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
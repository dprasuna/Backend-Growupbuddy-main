const express = require('express');
const router = express.Router();
const Gig = require('../models/gig');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware

// POST /api/gigs
router.post('/', authMiddleware, async (req, res) => {
  try {
    const gig = new Gig(req.body);
    await gig.save();
    res.status(201).json(gig);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/gigs/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ error: 'Gig not found' });
    res.json(gig);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/gigs/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const gig = await Gig.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!gig) return res.status(404).json({ error: 'Gig not found' });
    res.json(gig);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/gigs/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const gig = await Gig.findByIdAndDelete(req.params.id);
    if (!gig) return res.status(404).json({ error: 'Gig not found' });
    res.json({ message: 'Gig deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

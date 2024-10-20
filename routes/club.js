const express = require('express');
const router = express.Router();
const Club = require('../models/club'); // Assuming you have the Club model
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const { validateClub } = require('../middleware/validateClub'); // Import validation middleware (if applicable)

// POST /api/clubs
router.post('/', authMiddleware, validateClub, async (req, res) => {
  try {
    const club = new Club(req.body);
    await club.save();
    res.status(201).json(club);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/clubs/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ error: 'Club not found' });
    res.json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/clubs/:id
router.put('/:id', authMiddleware, validateClub, async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!club) return res.status(404).json({ error: 'Club not found' });
    res.json(club);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/clubs/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ error: 'Club not found' });
    res.json({ message: 'Club deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

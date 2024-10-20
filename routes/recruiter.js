const express = require('express');
const router = express.Router();
const Recruiter = require('../models/recruiter');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware

// POST /api/recruiters
router.post('/', authMiddleware, async (req, res) => {
  try {
    const recruiter = new Recruiter(req.body);
    await recruiter.save();
    res.status(201).json(recruiter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/recruiters/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) return res.status(404).json({ error: 'Recruiter not found' });
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/recruiters/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recruiter) return res.status(404).json({ error: 'Recruiter not found' });
    res.json(recruiter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/recruiters/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndDelete(req.params.id);
    if (!recruiter) return res.status(404).json({ error: 'Recruiter not found' });
    res.json({ message: 'Recruiter deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

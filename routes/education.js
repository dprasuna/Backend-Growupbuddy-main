const express = require('express');
const router = express.Router();
const Education = require('../models/education');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const { validateEducation } = require('../middleware/validateEducation'); // Import validation middleware (if applicable)

// POST /api/education
router.post('/', authMiddleware, validateEducation, async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).json(education);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/education/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ error: 'Education not found' });
    res.json(education);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/education/:id
router.put('/:id', authMiddleware, validateEducation, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!education) return res.status(404).json({ error: 'Education not found' });
    res.json(education);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/education/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) return res.status(404).json({ error: 'Education not found' });
    res.json({ message: 'Education deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Page = require('../models/pages');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware     

// POST /api/pages
router.post('/', authMiddleware, async (req, res) => {
  try {
    const page = new Page(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/pages/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/pages/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/pages/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json({ message: 'Page deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

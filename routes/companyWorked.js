const express = require('express');
const router = express.Router();
const CompanyWorked = require('../models/companyWorked'); // Assuming you have the CompanyWorked model
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const { validateCompanyWorked } = require('../middleware/validateCompanyWorked'); // Import validation middleware (if applicable)

// POST /api/company-worked
router.post('/', authMiddleware, validateCompanyWorked, async (req, res) => {
  try {
    const companyWorked = new CompanyWorked(req.body);
    await companyWorked.save();
    res.status(201).json(companyWorked);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/company-worked/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const companyWorked = await CompanyWorked.findById(req.params.id);
    if (!companyWorked) return res.status(404).json({ error: 'Company Worked entry not found' });
    res.json(companyWorked);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/company-worked/:id
router.put('/:id', authMiddleware, validateCompanyWorked, async (req, res) => {
  try {
    const companyWorked = await CompanyWorked.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!companyWorked) return res.status(404).json({ error: 'Company Worked entry not found' });
    res.json(companyWorked);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/company-worked/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const companyWorked = await CompanyWorked.findByIdAndDelete(req.params.id);
    if (!companyWorked) return res.status(404).json({ error: 'Company Worked entry not found' });
    res.json({ message: 'Company Worked entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

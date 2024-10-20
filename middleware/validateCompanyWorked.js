// validateCompanyWorked.js
const { body, validationResult } = require('express-validator');

const validateCompanyWorked = [
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('startDate').isDate().withMessage('Valid start date is required'),
  body('endDate').optional().isDate().withMessage('Valid end date is required'),
  // Add more validations as needed

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateCompanyWorked };
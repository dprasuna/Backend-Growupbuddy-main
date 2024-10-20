// validateEducation.js
const { body, validationResult } = require('express-validator');

const validateEducation = [
  body('degree').notEmpty().withMessage('Degree is required'),
  body('fieldOfStudy').notEmpty().withMessage('Field of study is required'),
  body('institution').notEmpty().withMessage('Institution name is required'),
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

module.exports = { validateEducation };

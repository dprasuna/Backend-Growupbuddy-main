// validateClub.js
const { body, validationResult } = require('express-validator');

const validateClub = [
  body('name').notEmpty().withMessage('Club name is required'),
  // Add more validations as needed

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateClub };

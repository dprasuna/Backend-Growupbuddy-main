// validateComment.js
const { body, validationResult } = require('express-validator');

const validateComment = [
  body('text').notEmpty().withMessage('Comment text is required'),
  // Add more validations as needed

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateComment };

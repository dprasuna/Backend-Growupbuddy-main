// validateEvent.js
const { body, validationResult } = require('express-validator');

const validateEvent = [
  body('title').notEmpty().withMessage('Event title is required'),
  body('date').isISO8601().withMessage('Valid event date is required'),
  body('location').notEmpty().withMessage('Event location is required'),
  body('description').optional().isString().withMessage('Event description must be a string'),
  // Add more validations as needed

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateEvent };

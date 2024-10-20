const mongoose = require('mongoose');

// Define the Testimonial schema
const TestimonialSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user giving the testimonial
    required: true
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user receiving the testimonial
    required: true
  },
  content: {
    type: String,
    required: true,
    maxLength: 1000 // Limit the length of the testimonial content
  },
  rating: {
    type: Number,
    min: 1,
    max: 5, // A rating between 1 and 5
    default: 5
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);

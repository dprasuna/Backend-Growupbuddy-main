const mongoose = require('mongoose');

// Define the Skills schema
const SkillsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  name: {
    type: String,
    required: true
  },
  proficiency: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], // Predefined proficiency levels
    default: 'Beginner'
  },
  yearsOfExperience: {
    type: Number,
    default: 0 // Optional: To track how many years of experience the user has with this skill
  },
  endorsementCount: {
    type: Number,
    default: 0 // Optional: If you want to track endorsements like LinkedIn
  }
});

module.exports = mongoose.model('Skills', SkillsSchema);

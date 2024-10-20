const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  grade: { type: String },
  activities: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Education', EducationSchema);

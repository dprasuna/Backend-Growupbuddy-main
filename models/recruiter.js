const mongoose = require('mongoose');

const RecruiterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  jobListings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }] // Assuming there is a Job model
});

module.exports = mongoose.model('Recruiter', RecruiterSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tagline: { type: String },
  story: { type: String },
  skills: [{ type: String }],
  location: { type: String },
  socialHandles: { type: Map, of: String },
  profilePicture: { type: String },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  about: { type: String },
  portfolio: { type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio' },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  experience: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CompanyWorked' }],
  education: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

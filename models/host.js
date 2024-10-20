const mongoose = require('mongoose');

const HostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Host', HostSchema);

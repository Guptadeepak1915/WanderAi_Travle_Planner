const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  placeName: { type: String, required: true },
  placeId: { type: String },
  city: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  aiTip: { type: String },
  visitedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);
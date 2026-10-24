const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: [{ type: String, required: true }],
  duration: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  posterUrl: { type: String, required: true },
  bannerUrl: { type: String },
  language: { type: String, default: 'English' },
  rating: { type: Number, default: 0 },
  shows: [{
    theater: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true },
    totalSeats: { type: Number, default: 60 },
    bookedSeats: [{ type: Number }]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
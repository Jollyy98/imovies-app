const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');

// Create a new booking
router.post('/', auth, async (req, res) => {
  const { movieId, showtime, seats, totalAmount } = req.body;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    // Find the specific show inside the movie
    const show = movie.shows.find(s => s.time === showtime.time && s.theater === showtime.theater);
    if (!show) return res.status(404).json({ message: 'Showtime not found' });

    // Check if any selected seats are already booked
    const isAlreadyBooked = seats.some(seat => show.bookedSeats.includes(seat));
    if (isAlreadyBooked) {
      return res.status(400).json({ message: 'One or more selected seats are already booked' });
    }

    // Add selected seats to the movie's show record
    show.bookedSeats.push(...seats);
    await movie.save();

    // Save the new booking
    const booking = new Booking({
      user: req.user.id,
      movie: movieId,
      showtime,
      seats,
      totalAmount
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('movie', 'title posterUrl');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
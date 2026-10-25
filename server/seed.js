const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');

dotenv.config();

const sampleMovies = [
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
    genre: 'Sci-Fi',
    duration: 148,
    releaseDate: '2010-07-16',
    posterUrl: 'https://image.tmdb.org/t/p/w500/oYuLE1311o2RScI123R90R311o2.jpg',
    showtimes: [
      { theater: 'Cinema 1', time: '10:00 AM', price: 12 },
      { theater: 'Cinema 2', time: '02:30 PM', price: 15 }
    ]
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.',
    genre: 'Sci-Fi',
    duration: 169,
    releaseDate: '2014-11-07',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QrmL21338021.jpg',
    showtimes: [
      { theater: 'IMAX Theater', time: '06:00 PM', price: 18 }
    ]
  },
  {
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.',
    genre: 'Action',
    duration: 152,
    releaseDate: '2008-07-18',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WM3339002.jpg',
    showtimes: [
      { theater: 'Cinema 3', time: '09:00 PM', price: 14 }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Movie.deleteMany({});
    await Movie.insertMany(sampleMovies);
    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding Error:', err);
    process.exit(1);
  }
};

seedDB();
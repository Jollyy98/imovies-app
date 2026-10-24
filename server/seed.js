require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./models/Movie');

const dbURI = process.env.MONGO_URI || "mongodb+srv://admin:ivo2pyCQLRzsM1U@cluster0.9xmn17u.mongodb.net/imovies?retryWrites=true&w=majority";

const sampleMovies = [
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre: ["Sci-Fi", "Action"],
    duration: 148,
    releaseDate: "2010-07-16",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    language: "English",
    rating: 8.8,
    shows: [
      {
        theater: "IMAX Screen 1",
        time: "18:00",
        price: 15,
        totalSeats: 60,
        bookedSeats: []
      },
      {
        theater: "Screen 2",
        time: "21:00",
        price: 12,
        totalSeats: 60,
        bookedSeats: []
      }
    ]
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: ["Sci-Fi", "Drama"],
    duration: 169,
    releaseDate: "2014-11-07",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjhhNC00PC0LWEzgYmItYzcxJYmEyYzZhNGU3XkEyXkFqcGc@._V1_.jpg",
    language: "English",
    rating: 8.7,
    shows: [
      {
        theater: "IMAX Screen 1",
        time: "15:30",
        price: 15,
        totalSeats: 60,
        bookedSeats: []
      }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB for seeding...");
    
    await Movie.deleteMany({});
    await Movie.insertMany(sampleMovies);
    console.log("Database seeded successfully with sample movies!");
    
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDB();
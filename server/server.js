require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Auth & Movie Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/bookings', require('./routes/bookings'));
const dbURI = process.env.MONGO_URI || "mongodb+srv://admin:ivo2pyCQLRzsM1U@cluster0.9xmn17u.mongodb.net/imovies?retryWrites=true&w=majority";

mongoose.connect(dbURI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get('/', (req, res) => {
  res.send("IMovies API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
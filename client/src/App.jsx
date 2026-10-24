import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';
import Login from './Login';
import Register from './Register';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import API from './api';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: '1rem 2rem', background: '#1a1a1a', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>🎬 IMovies</Link>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={logout} style={{ padding: '0.4rem 0.8rem', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/movies')
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Now Showing</h2>
      {loading ? (
        <p>Loading catalog...</p>
      ) : movies.length === 0 ? (
        <p>No movies available. Add sample movies to your database via POST request or MongoDB Atlas GUI.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
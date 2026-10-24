import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', width: '220px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <img src={movie.posterUrl} alt={movie.title} style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '4px' }} />
      <h3 style={{ margin: '0.5rem 0 0.2rem' }}>{movie.title}</h3>
      <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{movie.genre?.join(', ')}</p>
      <p style={{ margin: 0, fontSize: '0.85rem' }}>⏱ {movie.duration} mins | ⭐ {movie.rating || 'N/A'}</p>
      <Link to={`/movie/${movie._id}`} style={{ marginTop: 'auto', textAlign: 'center', background: '#007bff', color: '#fff', padding: '0.5rem', borderRadius: '4px', textDecoration: 'none' }}>
        Book Tickets
      </Link>
    </div>
  );
}

export default MovieCard;
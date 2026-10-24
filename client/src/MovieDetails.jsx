import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from './api';
import { AuthContext } from './AuthContext';
import SeatSelection from './SeatSelection';

function MovieDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    API.get(`/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie:', err);
        setLoading(false);
      });
  }, [id]);

  const handleSelectShow = (show) => {
    if (!user) {
      alert('Please log in to book seats');
      navigate('/login');
      return;
    }
    setSelectedShow(show);
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading movie details...</p>;
  if (!movie) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Movie not found.</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <img src={movie.posterUrl} alt={movie.title} style={{ width: '250px', borderRadius: '8px' }} />
        <div>
          <h2>{movie.title}</h2>
          <p><strong>Genre:</strong> {movie.genre?.join(', ')}</p>
          <p><strong>Duration:</strong> {movie.duration} mins</p>
          <p><strong>Language:</strong> {movie.language}</p>
          <p>{movie.description}</p>
          
          <h3>Showtimes & Theaters</h3>
          {movie.shows && movie.shows.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {movie.shows.map((show, idx) => (
                <div key={idx} style={{ border: '1px solid #ccc', padding: '0.75rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{show.theater}</strong>
                    <div>Time: {show.time} | Price: ${show.price}</div>
                  </div>
                  <button onClick={() => handleSelectShow(show)} style={{ padding: '0.5rem 1rem', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Select Seats
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No shows currently available.</p>
          )}
        </div>
      </div>

      {selectedShow && (
        <SeatSelection movie={movie} show={selectedShow} onClose={() => setSelectedShow(null)} />
      )}
    </div>
  );
}

export default MovieDetails;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api';

const ROWS = ['A', 'B', 'C', 'D', 'E'];
const SEATS_PER_ROW = 8;

function SeatSelection({ movie, show, onClose }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const bookedSeats = show.bookedSeats || [];

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) return;
    setLoading(true);
    setError('');

    try {
      await API.post('/bookings', {
        movieId: movie._id,
        showtime: show,
        seats: selectedSeats,
        totalAmount: selectedSeats.length * show.price,
      });
      alert('Booking successful!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Select Seats for {show.theater} ({show.time})</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', margin: '1.5rem 0' }}>
        <div style={{ width: '80%', height: '10px', background: '#aaa', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.75rem', color: '#fff' }}>
          SCREEN
        </div>
        {ROWS.map((row) => (
          <div key={row} style={{ display: 'flex', gap: '0.5rem' }}>
            {Array.from({ length: SEATS_PER_ROW }).map((_, idx) => {
              const seatId = `${row}${idx + 1}`;
              const isBooked = bookedSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);

              let bgColor = '#e0e0e0';
              if (isBooked) bgColor = '#d9534f';
              else if (isSelected) bgColor = '#5cb85c';

              return (
                <button
                  key={seatId}
                  onClick={() => toggleSeat(seatId)}
                  disabled={isBooked}
                  style={{
                    width: '35px',
                    height: '35px',
                    backgroundColor: bgColor,
                    color: isSelected || isBooked ? '#fff' : '#000',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isBooked ? 'not-allowed' : 'pointer',
                  }}
                >
                  {seatId}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p>Selected Seats: <strong>{selectedSeats.join(', ') || 'None'}</strong></p>
          <p>Total Price: <strong>${selectedSeats.length * show.price}</strong></p>
        </div>
        <div>
          <button onClick={onClose} style={{ marginRight: '0.5rem', padding: '0.5rem 1rem' }}>Cancel</button>
          <button onClick={handleBooking} disabled={selectedSeats.length === 0 || loading} style={{ padding: '0.5rem 1rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;
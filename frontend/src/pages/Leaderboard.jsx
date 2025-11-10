import { useState, useEffect } from 'react';
import { usersAPI } from '../utils/api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await usersAPI.getLeaderboard();
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <h2>Loading leaderboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>🏆 Eco Leaderboard</h2>
        <p style={{ marginBottom: '2rem' }}>Top eco-warriors making a difference!</p>

        {leaderboard.length > 0 ? (
          <div>
            {leaderboard.map((user, index) => (
              <div key={user._id} className="leaderboard-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {getRankIcon(index)}
                  </span>
                  <div>
                    <h4 style={{ margin: 0 }}>{user.username}</h4>
                    <small>Streak: {user.streak} days</small>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {user.ecoPoints} pts
                  </div>
                  <small>{user.treesPlanted} trees</small>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No users found. Be the first to join the leaderboard!</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
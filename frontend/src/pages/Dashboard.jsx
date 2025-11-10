import { useState, useEffect } from 'react';
import { challengesAPI, usersAPI } from '../utils/api';
import { getUser, setUser } from '../utils/auth';

const Dashboard = () => {
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [userStats, setUserStats] = useState(getUser());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDailyChallenge();
    fetchUserProfile();
  }, []);

  const fetchDailyChallenge = async () => {
    try {
      const response = await challengesAPI.getDaily();
      setDailyChallenge(response.data);
    } catch (error) {
      console.error('Error fetching challenge:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await usersAPI.getProfile();
      setUserStats(response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const completeChallenge = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await challengesAPI.complete(dailyChallenge._id);
      setMessage(response.data.message);
      fetchUserProfile(); // Refresh user stats
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error completing challenge');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Welcome back, {userStats?.username}! 🌟</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          margin: '2rem 0'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3>🌿 Eco Points</h3>
            <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{userStats?.ecoPoints || 0}</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3>🌳 Trees Planted</h3>
            <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{userStats?.treesPlanted || 0}</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3>🔥 Streak</h3>
            <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{userStats?.streak || 0} days</p>
          </div>
        </div>

        {dailyChallenge && (
          <div style={{
            background: '#e8f5e8',
            padding: '2rem',
            borderRadius: '10px',
            margin: '2rem 0'
          }}>
            <h3>🌍 Today's Eco Challenge</h3>
            <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>{dailyChallenge.description}</p>
            <p><strong>Points:</strong> {dailyChallenge.points}</p>
            <p><strong>Category:</strong> {dailyChallenge.category}</p>
            
            <button 
              onClick={completeChallenge}
              className="btn"
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? 'Completing...' : 'Mark as Completed'}
            </button>
          </div>
        )}

        {message && (
          <div style={{
            background: message.includes('Error') ? '#f8d7da' : '#d4edda',
            color: message.includes('Error') ? '#721c24' : '#155724',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1rem'
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
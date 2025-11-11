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
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome back, {userStats?.username}!
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Ready to make a difference today? 🌟
          </p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>🌿 Eco Points</h3>
            <p>{userStats?.ecoPoints || 0}</p>
            <small>Total environmental impact</small>
          </div>

          <div className="stat-card">
            <h3>🌳 Trees Planted</h3>
            <p>{userStats?.treesPlanted || 0}</p>
            <small>Virtual forest growth</small>
          </div>

          <div className="stat-card">
            <h3>🔥 Current Streak</h3>
            <p>{userStats?.streak || 0} days</p>
            <small>Keep going!</small>
          </div>
        </div>

        {dailyChallenge && (
          <div className="challenge-card">
            <h3>🌍 Today's Eco Challenge</h3>
            <p style={{ fontSize: '1.2rem', margin: '1rem 0', lineHeight: '1.6' }}>
              {dailyChallenge.description}
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '1.5rem'
            }}>
              <div>
                <span style={{
                  background: '#e0e7ff',
                  color: '#3730a3',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '15px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  {dailyChallenge.category}
                </span>
                <span style={{
                  background: '#fef3c7',
                  color: '#92400e',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '15px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  marginLeft: '0.5rem'
                }}>
                  {dailyChallenge.points} points
                </span>
              </div>
              
              <button 
                onClick={completeChallenge}
                className="btn"
                disabled={loading}
                style={{ minWidth: '160px' }}
              >
                {loading ? (
                  <>
                    <span className="loading" style={{ marginRight: '0.5rem' }}></span>
                    Completing...
                  </>
                ) : (
                  '✅ Mark Completed'
                )}
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className={message.includes('Error') ? 'alert alert-error' : 'alert alert-success'}>
            {message}
          </div>
        )}

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
          borderRadius: 'var(--radius)',
          border: '1px solid #dcfce7'
        }}>
          <h4 style={{ color: '#065f46', marginBottom: '1rem' }}>💡 Quick Tip</h4>
          <p style={{ color: '#047857', margin: 0 }}>
            Complete challenges daily to maintain your streak and watch your virtual forest grow! 
            Each tree represents real environmental impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
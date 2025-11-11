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
      setMessage(`🎉 ${response.data.message} +${response.data.pointsEarned} points!`);
      fetchUserProfile();
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || 'Error completing challenge'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in-up">
      {/* Welcome Section */}
      <div className="glass-card" style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #10b981, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '800'
        }}>
          Welcome back, {userStats?.username}! 🌟
        </h1>
        <p style={{ 
          color: 'var(--text-light)', 
          fontSize: '1.3rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Ready to make today more sustainable? Every small step counts!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>🌿 Eco Points</h3>
          <span className="stat-number">{userStats?.ecoPoints || 0}</span>
          <div className="stat-desc">Total Environmental Impact</div>
        </div>

        <div className="stat-card">
          <h3>🌳 Trees Planted</h3>
          <span className="stat-number">{userStats?.treesPlanted || 0}</span>
          <div className="stat-desc">Virtual Forest Growth</div>
        </div>

        <div className="stat-card">
          <h3>🔥 Current Streak</h3>
          <span className="stat-number">{userStats?.streak || 0}</span>
          <div className="stat-desc">Consecutive Days</div>
        </div>
      </div>

      {/* Daily Challenge */}
      {dailyChallenge && (
        <div className="challenge-card">
          <div className="challenge-title">
            <span style={{ fontSize: '2rem' }}>🎯</span>
            Daily Eco Challenge
          </div>
          
          <div className="challenge-desc">
            "{dailyChallenge.description}"
          </div>

          <div className="challenge-meta">
            <span className="challenge-tag">
              📁 {dailyChallenge.category}
            </span>
            <span className="challenge-points">
              ⭐ {dailyChallenge.points} points
            </span>
            <span className="challenge-tag">
              🏷️ {dailyChallenge.difficulty}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button 
              onClick={completeChallenge}
              className="btn btn-large"
              disabled={loading}
              style={{ 
                minWidth: '200px',
                background: 'var(--gradient-secondary)'
              }}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Completing...
                </>
              ) : (
                <>
                  ✅ Complete Challenge
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Message Alert */}
      {message && (
        <div className={message.includes('❌') ? 'alert alert-error' : 'alert alert-success'}>
          {message}
        </div>
      )}

      {/* Progress Tips */}
      <div className="glass-card">
        <h3 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          marginBottom: '1.5rem',
          color: 'var(--secondary)'
        }}>
          💡 Your Progress Tips
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            padding: '1.5rem',
            background: 'rgba(16, 185, 129, 0.05)',
            borderRadius: 'var(--radius)',
            border: '1px solid rgba(16, 185, 129, 0.1)'
          }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>🌱 Keep Your Streak</h4>
            <p style={{ color: 'var(--text-light)', margin: 0, fontSize: '0.9rem' }}>
              Complete challenges daily to maintain your {userStats?.streak || 0}-day streak and earn bonus points!
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'rgba(139, 92, 246, 0.05)',
            borderRadius: 'var(--radius)',
            border: '1px solid rgba(139, 92, 246, 0.1)'
          }}>
            <h4 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>🏆 Climb Leaderboard</h4>
            <p style={{ color: 'var(--text-light)', margin: 0, fontSize: '0.9rem' }}>
              You're making great progress! Check the leaderboard to see how you compare with other eco-warriors.
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'rgba(245, 158, 11, 0.05)',
            borderRadius: 'var(--radius)',
            border: '1px solid rgba(245, 158, 11, 0.1)'
          }}>
            <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>🌳 Grow Your Forest</h4>
            <p style={{ color: 'var(--text-light)', margin: 0, fontSize: '0.9rem' }}>
              Every completed challenge plants a tree in your virtual forest. Watch your environmental impact grow!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import { useState, useEffect } from 'react';
import { challengesAPI, usersAPI } from '../utils/api';
import { getUser, setUser } from '../utils/auth';

const Dashboard = () => {
  const [dailyChallenges, setDailyChallenges] = useState([]);
  const [completedToday, setCompletedToday] = useState([]);
  const [userStats, setUserStats] = useState(getUser());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDailyChallenges();
    fetchUserProfile();
    fetchCompletedToday();
  }, []);

  const fetchDailyChallenges = async () => {
    try {
      const response = await challengesAPI.getDailyMultiple();
      setDailyChallenges(response.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
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

  const fetchCompletedToday = async () => {
    try {
      const response = await challengesAPI.getCompletedToday();
      setCompletedToday(response.data);
    } catch (error) {
      console.error('Error fetching completed challenges:', error);
    }
  };

  const completeChallenge = async (challengeId) => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await challengesAPI.complete(challengeId);
      setMessage(`${response.data.message} +${response.data.pointsEarned} points!`);
      
      // Refresh all data
      fetchUserProfile();
      fetchCompletedToday();
      fetchDailyChallenges();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error completing challenge');
    } finally {
      setLoading(false);
    }
  };

  const isChallengeCompleted = (challengeId) => {
    return completedToday.some(comp => 
      comp.challengeId._id === challengeId
    );
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

          <div style={{
            background: 'linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3>✅ Completed Today</h3>
            <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{completedToday.length}/3</p>
          </div>
        </div>

        <div style={{
          background: '#e8f5e8',
          padding: '2rem',
          borderRadius: '10px',
          margin: '2rem 0'
        }}>
          <h3>🌍 Today's Eco Challenges</h3>
          <p style={{ marginBottom: '1rem' }}>
            Complete multiple challenges today! Each challenge gives you points and plants a tree.
          </p>

          {dailyChallenges.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {dailyChallenges.map((challenge, index) => {
                const completed = isChallengeCompleted(challenge._id);
                
                return (
                  <div key={challenge._id} style={{
                    padding: '1.5rem',
                    background: completed ? '#d4edda' : 'white',
                    border: `2px solid ${completed ? '#28a745' : '#e1e5e9'}`,
                    borderRadius: '10px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: completed ? '#28a745' : '#6c757d',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {completed ? '✅ Completed' : `${challenge.points} pts`}
                    </div>

                    <h4 style={{ 
                      margin: '0 0 0.5rem 0',
                      color: completed ? '#155724' : '#333'
                    }}>
                      {challenge.title}
                    </h4>
                    
                    <p style={{ 
                      margin: '0 0 1rem 0',
                      color: completed ? '#155724' : '#666'
                    }}>
                      {challenge.description}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        background: '#f8f9fa',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        Category: {challenge.category}
                      </span>
                      
                      <button 
                        onClick={() => completeChallenge(challenge._id)}
                        className="btn"
                        disabled={loading || completed}
                        style={{
                          opacity: completed ? 0.6 : 1,
                          cursor: completed ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {completed ? 'Completed' : 'Mark as Done'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Loading challenges...</p>
          )}
        </div>

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

        {completedToday.length > 0 && (
          <div style={{
            background: '#d1ecf1',
            padding: '1.5rem',
            borderRadius: '10px',
            marginTop: '2rem'
          }}>
            <h4>🎉 Today's Progress</h4>
            <p>You've completed {completedToday.length} challenge(s) today! Keep going! 🚀</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
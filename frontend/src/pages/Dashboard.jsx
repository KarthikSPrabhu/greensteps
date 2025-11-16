import { useState, useEffect } from 'react';
import { challengesAPI, usersAPI } from '../utils/api';
import { getUser, setUser } from '../utils/auth';

const Dashboard = () => {
  const [dailyChallenges, setDailyChallenges] = useState([]);
  const [completedToday, setCompletedToday] = useState([]);
  const [userStats, setUserStats] = useState(getUser());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  // Filter challenges by category
  const filteredChallenges = selectedCategory === 'all' 
    ? dailyChallenges 
    : dailyChallenges.filter(challenge => challenge.category === selectedCategory);

  // Get unique categories for filter
  const categories = ['all', ...new Set(dailyChallenges.map(challenge => challenge.category))];

  // Category icons mapping
  const categoryIcons = {
    transport: '🚗',
    energy: '💡',
    food: '🍎',
    waste: '🗑️',
    water: '💧',
    nature: '🌳',
    home: '🏠'
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
            <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{completedToday.length}/5</p>
          </div>
        </div>

        {/* Category Filter */}
        <div style={{ margin: '2rem 0' }}>
          <h4>Filter by Category:</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.5rem 1rem',
                  background: selectedCategory === category ? '#667eea' : '#f8f9fa',
                  color: selectedCategory === category ? 'white' : '#333',
                  border: '1px solid #dee2e6',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              >
                {category === 'all' ? '🌍 All Categories' : 
                 `${categoryIcons[category]} ${category.charAt(0).toUpperCase() + category.slice(1)}`}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          background: '#e8f5e8',
          padding: '2rem',
          borderRadius: '10px',
          margin: '2rem 0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>🌍 Today's Eco Challenges</h3>
            <span style={{
              background: '#28a745',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '15px',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              {filteredChallenges.length} challenges
            </span>
          </div>
          
          <p style={{ marginBottom: '1rem' }}>
            Complete up to 5 challenges today! Each challenge gives you points and plants a tree.
          </p>

          {filteredChallenges.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredChallenges.map((challenge, index) => {
                const completed = isChallengeCompleted(challenge._id);
                
                return (
                  <div key={challenge._id} style={{
                    padding: '1.5rem',
                    background: completed ? '#d4edda' : 'white',
                    border: `2px solid ${completed ? '#28a745' : '#e1e5e9'}`,
                    borderRadius: '10px',
                    position: 'relative',
                    transition: 'all 0.3s ease'
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

                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: '#e9ecef',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {challenge.difficulty}
                    </div>

                    <h4 style={{ 
                      margin: '0 0 0.5rem 0',
                      color: completed ? '#155724' : '#333',
                      paddingRight: '80px',
                      paddingLeft: '70px'
                    }}>
                      {categoryIcons[challenge.category]} {challenge.title}
                    </h4>
                    
                    <p style={{ 
                      margin: '0 0 1rem 0',
                      color: completed ? '#155724' : '#666',
                      lineHeight: '1.5'
                    }}>
                      {challenge.description}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{
                          background: '#f8f9fa',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          border: '1px solid #dee2e6'
                        }}>
                          {categoryIcons[challenge.category]} {challenge.category}
                        </span>
                        <span style={{
                          background: challenge.difficulty === 'easy' ? '#d4edda' : 
                                    challenge.difficulty === 'medium' ? '#fff3cd' : '#f8d7da',
                          color: challenge.difficulty === 'easy' ? '#155724' : 
                                 challenge.difficulty === 'medium' ? '#856404' : '#721c24',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {challenge.difficulty}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => completeChallenge(challenge._id)}
                        className="btn"
                        disabled={loading || completed}
                        style={{
                          opacity: completed ? 0.6 : 1,
                          cursor: completed ? 'not-allowed' : 'pointer',
                          minWidth: '120px'
                        }}
                      >
                        {completed ? 'Completed' : loading ? 'Completing...' : 'Mark as Done'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem',
              background: 'white',
              borderRadius: '10px'
            }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                {selectedCategory === 'all' 
                  ? 'Loading challenges...' 
                  : `No challenges found in ${selectedCategory} category. Try another filter!`}
              </p>
              {selectedCategory !== 'all' && (
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="btn"
                  style={{ marginTop: '0.5rem' }}
                >
                  Show All Categories
                </button>
              )}
            </div>
          )}
        </div>

        {message && (
          <div style={{
            background: message.includes('Error') ? '#f8d7da' : '#d4edda',
            color: message.includes('Error') ? '#721c24' : '#155724',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1rem',
            border: `1px solid ${message.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`
          }}>
            {message}
          </div>
        )}

        {completedToday.length > 0 && (
          <div style={{
            background: completedToday.length >= 3 ? '#d4edda' : '#d1ecf1',
            padding: '1.5rem',
            borderRadius: '10px',
            marginTop: '2rem',
            border: `2px solid ${completedToday.length >= 3 ? '#28a745' : '#17a2b8'}`
          }}>
            <h4>🎉 Today's Progress</h4>
            <p>
              You've completed {completedToday.length} out of 5 challenges today!{' '}
              {completedToday.length >= 5 ? "Amazing! You've completed all challenges! 🏆" :
               completedToday.length >= 3 ? "Great job! You're doing awesome! 🌟" : 
               "Keep going! Every challenge makes a difference! 🚀"}
            </p>
            <div style={{
              background: '#f8f9fa',
              padding: '0.75rem',
              borderRadius: '8px',
              marginTop: '0.5rem'
            }}>
              <div style={{
                width: '100%',
                background: '#e9ecef',
                borderRadius: '10px',
                height: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(completedToday.length / 5) * 100}%`,
                  background: completedToday.length >= 3 ? '#28a745' : '#17a2b8',
                  height: '100%',
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.5rem',
                fontSize: '0.9rem',
                color: '#6c757d'
              }}>
                <span>{completedToday.length}/5 completed</span>
                <span>{Math.round((completedToday.length / 5) * 100)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
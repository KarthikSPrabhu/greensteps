import { useState, useEffect } from 'react';
import { challengesAPI, usersAPI } from '../utils/api';
import { getUser, setUser } from '../utils/auth';

const Dashboard = () => {
  const [challengesData, setChallengesData] = useState({
    completed: [],
    remaining: []
  });
  const [userStats, setUserStats] = useState(getUser());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchDailyChallenges();
    fetchUserProfile();
  }, []);

  const fetchDailyChallenges = async () => {
    try {
      const response = await challengesAPI.getDailyMultiple();
      setChallengesData(response.data);
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

  const completeChallenge = async (challengeId) => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await challengesAPI.complete(challengeId);
      setMessage(`${response.data.message} +${response.data.pointsEarned} points!`);
      
      // Refresh all data
      fetchUserProfile();
      fetchDailyChallenges();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error completing challenge');
    } finally {
      setLoading(false);
    }
  };

  // Combine and filter challenges
  const allChallenges = [...challengesData.completed, ...challengesData.remaining];
  const filteredChallenges = selectedCategory === 'all' 
    ? allChallenges 
    : allChallenges.filter(challenge => challenge.category === selectedCategory);

  // Get unique categories for filter
  const categories = ['all', ...new Set(allChallenges.map(challenge => challenge.category))];

  return (
    <div className="container">
      <div className="card">
        <h2>Welcome back, {userStats?.username}! 🌟</h2>
        
        {/* Stats Grid */}
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
            <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
              {challengesData.completed.length}/5
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ margin: '2rem 0' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <span>Today's Progress</span>
            <span>{challengesData.completed.length}/5 challenges completed</span>
          </div>
          <div style={{
            width: '100%',
            height: '10px',
            background: '#e9ecef',
            borderRadius: '5px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(challengesData.completed.length / 5) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #28a745, #20c997)',
              transition: 'width 0.3s ease'
            }}></div>
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
                  fontSize: '0.9rem'
                }}
              >
                {category === 'all' ? '🌍 All' : 
                 category === 'transport' ? '🚗 Transport' :
                 category === 'energy' ? '💡 Energy' :
                 category === 'food' ? '🍎 Food' :
                 category === 'waste' ? '🗑️ Waste' :
                 category === 'water' ? '💧 Water' :
                 category === 'nature' ? '🌳 Nature' :
                 category === 'home' ? '🏠 Home' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges Section */}
        <div style={{
          background: '#e8f5e8',
          padding: '2rem',
          borderRadius: '10px',
          margin: '2rem 0'
        }}>
          <h3>🌍 Today's Eco Challenges</h3>
          <p style={{ marginBottom: '1rem' }}>
            Your completed challenges stay with you all day. New challenges appear as you complete them!
          </p>

          {/* Completed Challenges - STATIC */}
          {challengesData.completed.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: '#28a745', marginBottom: '1rem' }}>
                ✅ Completed Challenges ({challengesData.completed.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredChallenges
                  .filter(challenge => challenge.completed)
                  .map((challenge) => (
                  <div key={challenge._id} style={{
                    padding: '1.5rem',
                    background: '#d4edda',
                    border: '2px solid #28a745',
                    borderRadius: '10px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#28a745',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      ✅ Completed
                    </div>

                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#155724' }}>
                      {challenge.title}
                    </h4>
                    
                    <p style={{ margin: '0 0 1rem 0', color: '#155724' }}>
                      {challenge.description}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        background: '#c3e6cb',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        color: '#155724'
                      }}>
                        {challenge.category} • +{challenge.points} pts
                      </span>
                      
                      <span style={{
                        color: '#155724',
                        fontSize: '0.8rem',
                        fontStyle: 'italic'
                      }}>
                        Completed today
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Remaining Challenges - DYNAMIC */}
          {challengesData.remaining.length > 0 && (
            <div>
              <h4 style={{ color: '#856404', marginBottom: '1rem' }}>
                🎯 Available Challenges ({challengesData.remaining.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredChallenges
                  .filter(challenge => !challenge.completed)
                  .map((challenge) => (
                  <div key={challenge._id} style={{
                    padding: '1.5rem',
                    background: 'white',
                    border: '2px solid #ffeaa7',
                    borderRadius: '10px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#ffc107',
                      color: '#856404',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {challenge.points} pts
                    </div>

                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                      {challenge.title}
                    </h4>
                    
                    <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
                      {challenge.description}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        background: '#fff3cd',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        color: '#856404'
                      }}>
                        {challenge.category} • {challenge.difficulty}
                      </span>
                      
                      <button 
                        onClick={() => completeChallenge(challenge._id)}
                        className="btn"
                        disabled={loading}
                        style={{
                          background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                        }}
                      >
                        {loading ? 'Completing...' : 'Mark as Done'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredChallenges.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <h4>🎉 Amazing Work!</h4>
              <p>You've completed all available challenges in this category today!</p>
            </div>
          )}
        </div>

        {/* Messages */}
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

        {/* Daily Goal Message */}
        {challengesData.completed.length >= 3 && (
          <div style={{
            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
            padding: '1.5rem',
            borderRadius: '10px',
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <h4>🏆 Daily Goal Achieved!</h4>
            <p>You've completed {challengesData.completed.length} challenges today! You're making a real impact! 🌍</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
import { useEffect, useState } from 'react';
import { usersAPI } from '../utils/api';
import { getUser } from '../utils/auth';

const MyForest = () => {
  const [userStats, setUserStats] = useState(getUser());

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await usersAPI.getProfile();
      setUserStats(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const renderTrees = () => {
    const trees = [];
    const treeCount = userStats?.treesPlanted || 0;
    
    for (let i = 0; i < treeCount; i++) {
      trees.push(
        <div key={i} className="tree">
          {i % 3 === 0 ? '🌲' : i % 3 === 1 ? '🌴' : '🎄'}
        </div>
      );
    }
    
    return trees;
  };

  return (
    <div className="container">
      <div className="card">
        <h2>My Virtual Forest 🌳</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Every completed challenge plants a tree in your forest! 
          You've planted <strong>{userStats?.treesPlanted || 0}</strong> trees so far.
        </p>

        {userStats?.treesPlanted > 0 ? (
          <div className="forest">
            {renderTrees()}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: '#f8f9fa',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌱</div>
            <h3>No trees planted yet!</h3>
            <p>Complete your first eco-challenge to plant a tree in your forest.</p>
          </div>
        )}

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#e8f5e8',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h4>🌍 Environmental Impact</h4>
          <p>Each tree in your forest represents real environmental impact:</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            <div>
              <strong>{(userStats?.treesPlanted || 0) * 48} lbs</strong>
              <br />CO₂ absorbed per year
            </div>
            <div>
              <strong>{(userStats?.treesPlanted || 0) * 260} gallons</strong>
              <br />Water filtered per year
            </div>
            <div>
              <strong>{(userStats?.treesPlanted || 0) * 13} lbs</strong>
              <br />Air pollutants removed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyForest;
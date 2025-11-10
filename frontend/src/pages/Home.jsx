import { Link } from 'react-router-dom';
import { getUser } from '../utils/auth';

const Home = () => {
  const user = getUser();

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#28a745' }}>
          🌱 GreenSteps
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#666' }}>
          Track your eco-impact, complete daily challenges, and grow your virtual forest!
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem', 
          margin: '3rem 0' 
        }}>
          <div style={{ padding: '2rem', background: '#f8f9fa', borderRadius: '10px' }}>
            <h3>🌍 Daily Challenges</h3>
            <p>Complete simple eco-tasks and earn points</p>
          </div>
          <div style={{ padding: '2rem', background: '#f8f9fa', borderRadius: '10px' }}>
            <h3>🌳 Virtual Forest</h3>
            <p>Watch your forest grow with each completed challenge</p>
          </div>
          <div style={{ padding: '2rem', background: '#f8f9fa', borderRadius: '10px' }}>
            <h3>🏆 Leaderboard</h3>
            <p>Compete with friends and track your progress</p>
          </div>
        </div>

        {user ? (
          <Link to="/dashboard" className="btn" style={{ fontSize: '1.2rem', padding: '15px 40px' }}>
            Go to Dashboard
          </Link>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register" className="btn" style={{ fontSize: '1.2rem', padding: '15px 40px' }}>
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '15px 40px' }}>
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
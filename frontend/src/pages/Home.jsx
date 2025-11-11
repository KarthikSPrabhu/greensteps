import { Link } from 'react-router-dom';
import { getUser } from '../utils/auth';

const Home = () => {
  const user = getUser();

  return (
    <div className="container">
      <div className="card" style={{ 
        textAlign: 'center', 
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🌱</div>
        <h1 style={{ 
          fontSize: '3.5rem', 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #10b981, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '800'
        }}>
          GreenSteps
        </h1>
        <p style={{ 
          fontSize: '1.3rem', 
          marginBottom: '3rem', 
          color: '#6b7280',
          maxWidth: '600px',
          margin: '0 auto 3rem auto',
          lineHeight: '1.7'
        }}>
          Track your eco-impact, complete daily challenges, and grow your virtual forest! 
          Join the movement towards a sustainable future, one step at a time.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem', 
          margin: '4rem 0' 
        }}>
          <div style={{ 
            padding: '2.5rem 2rem', 
            background: 'rgba(255,255,255,0.6)', 
            borderRadius: 'var(--radius)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            transition: 'all 0.3s ease'
          }} className="card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
            <h3>Daily Challenges</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Complete simple eco-tasks and earn points to track your environmental impact
            </p>
          </div>
          <div style={{ 
            padding: '2.5rem 2rem', 
            background: 'rgba(255,255,255,0.6)', 
            borderRadius: 'var(--radius)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            transition: 'all 0.3s ease'
          }} className="card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌳</div>
            <h3>Virtual Forest</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Watch your forest grow with each completed challenge - see your impact visualized
            </p>
          </div>
          <div style={{ 
            padding: '2.5rem 2rem', 
            background: 'rgba(255,255,255,0.6)', 
            borderRadius: 'var(--radius)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            transition: 'all 0.3s ease'
          }} className="card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
            <h3>Leaderboard</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Compete with friends and track your progress on the sustainability leaderboard
            </p>
          </div>
        </div>

        {user ? (
          <Link to="/dashboard" className="btn" style={{ 
            fontSize: '1.3rem', 
            padding: '18px 50px',
            marginTop: '2rem'
          }}>
            Continue Your Journey →
          </Link>
        ) : (
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
            <Link to="/register" className="btn" style={{ fontSize: '1.2rem', padding: '16px 40px' }}>
              Start Your Eco Journey
            </Link>
            <Link to="/login" className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '16px 40px' }}>
              Sign In
            </Link>
          </div>
        )}

        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))',
          borderRadius: 'var(--radius)',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <p style={{ color: '#065f46', fontSize: '1.1rem', margin: 0 }}>
            🌟 <strong>Join thousands</strong> of eco-warriors making a difference every day!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
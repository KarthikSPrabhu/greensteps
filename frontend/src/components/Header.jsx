import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser } from '../utils/auth';

const Header = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '1rem 0',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{
            textDecoration: 'none',
            color: '#10b981',
            fontSize: '1.75rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '2rem' }}>🌱</span>
            GreenSteps
          </Link>

          <nav className="header-nav">
            {user ? (
              <>
                <span style={{ 
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  🌟 {user.username}
                </span>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/forest">My Forest</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/tips">Green Tips</Link>
                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 20px' }}>
                  Logout
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to="/about">About</Link>
                <Link to="/tips">Tips</Link>
                <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 20px' }}>Login</Link>
                <Link to="/register" className="btn" style={{ padding: '8px 20px' }}>Get Started</Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
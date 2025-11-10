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
      background: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{
            textDecoration: 'none',
            color: '#333',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            🌱 GreenSteps
          </Link>

          <nav>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <span>Hello, {user.username}!</span>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/forest">My Forest</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/tips">Green Tips</Link>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/register" className="btn">Register</Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
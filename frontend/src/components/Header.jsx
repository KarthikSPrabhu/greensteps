import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getUser, removeToken, removeUser } from '../utils/auth';
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      padding: '1rem 0',
      boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
      marginBottom: '2rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--gradient-primary)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: 'white',
              boxShadow: 'var(--shadow)'
            }}>
              🌱
            </div>
            <div>
              <div style={{
                color: 'var(--text-dark)',
                fontSize: '1.5rem',
                fontWeight: '800',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                GreenSteps
              </div>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--text-light)',
                fontWeight: '600',
                letterSpacing: '1px'
              }}>
                ECO TRACKER
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  style={{
                    textDecoration: 'none',
                    color: isActive('/dashboard') ? 'var(--primary)' : 'var(--text-dark)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    fontWeight: '600',
                    background: isActive('/dashboard') ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                    border: isActive('/dashboard') ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  📊 Dashboard
                </Link>
                
                <Link 
                  to="/forest" 
                  style={{
                    textDecoration: 'none',
                    color: isActive('/forest') ? 'var(--primary)' : 'var(--text-dark)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    fontWeight: '600',
                    background: isActive('/forest') ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                    border: isActive('/forest') ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  🌳 My Forest
                </Link>
                
                <Link 
                  to="/leaderboard" 
                  style={{
                    textDecoration: 'none',
                    color: isActive('/leaderboard') ? 'var(--primary)' : 'var(--text-dark)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    fontWeight: '600',
                    background: isActive('/leaderboard') ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                    border: isActive('/leaderboard') ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  🏆 Leaderboard
                </Link>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginLeft: '1rem',
                  paddingLeft: '1rem',
                  borderLeft: '2px solid var(--border-light)'
                }}>
                  <div style={{
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '50px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: 'var(--shadow)'
                  }}>
                    ⭐ {user.username}
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="btn-secondary"
                    style={{ 
                      padding: '8px 20px',
                      fontSize: '0.9rem'
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link 
                  to="/about"
                  style={{
                    textDecoration: 'none',
                    color: 'var(--text-dark)',
                    fontWeight: '600',
                    padding: '0.5rem 1rem',
                    borderRadius: '25px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  About
                </Link>
                
                <Link 
                  to="/tips"
                  style={{
                    textDecoration: 'none',
                    color: 'var(--text-dark)',
                    fontWeight: '600',
                    padding: '0.5rem 1rem',
                    borderRadius: '25px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Tips
                </Link>
                
                <Link 
                  to="/login" 
                  className="btn-secondary"
                  style={{ padding: '10px 24px' }}
                >
                  Sign In
                </Link>
                
                <Link 
                  to="/register" 
                  className="btn"
                  style={{ padding: '10px 24px' }}
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
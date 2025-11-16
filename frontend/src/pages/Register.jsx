import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { setToken, setUser } from '../utils/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register(formData);
      setToken(response.data.token);
      setUser(response.data);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #e1e5e9',
    borderRadius: '10px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#2c5530',
    fontSize: '1rem'
  };

  return (
    <div className="container">
      <div className="card" style={{ 
        maxWidth: '450px', 
        margin: '2rem auto',
        padding: '2.5rem'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          color: '#2c5530',
          fontSize: '2rem'
        }}>
          Join GreenSteps 🌍
        </h2>
        
        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)';
              }}
              placeholder="Choose a username"
            />
          </div>

          <div className="form-group">
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)';
              }}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)';
              }}
              placeholder="Create a password (min 6 characters)"
            />
          </div>

          <div className="form-group">
            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)';
              }}
              placeholder="Confirm your password"
            />
          </div>

          <button 
            type="submit" 
            className="btn" 
            style={{ 
              width: '100%',
              padding: '14px',
              fontSize: '1.1rem',
              fontWeight: '600',
              marginTop: '1rem'
            }}
            disabled={loading}
          >
            {loading ? (
              <span>
                <span style={{ marginRight: '8px' }}>⏳</span>
                Creating Account...
              </span>
            ) : (
              'Start Your Eco Journey'
            )}
          </button>
        </form>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          color: '#666'
        }}>
          Already have an account?{' '}
          <Link 
            to="/login" 
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
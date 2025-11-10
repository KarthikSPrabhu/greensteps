import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Feedback submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  if (submitted) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h2>Thank You! 💚</h2>
          <p style={{ fontSize: '1.2rem' }}>
            Your feedback has been received. We appreciate you helping us make GreenSteps better!
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn"
            style={{ marginTop: '1rem' }}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Contact Us & Feedback</h2>
        <p style={{ marginBottom: '2rem' }}>
          We'd love to hear your thoughts, suggestions, or questions about GreenSteps!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                minHeight: '150px',
                resize: 'vertical'
              }}
            />
          </div>

          <button type="submit" className="btn" style={{ width: '100%' }}>
            Send Message
          </button>
        </form>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e1e5e9' }}>
          <h3>Other Ways to Reach Us</h3>
          <p>Email: support@greensteps.app</p>
          <p>Follow us for updates and eco-tips!</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
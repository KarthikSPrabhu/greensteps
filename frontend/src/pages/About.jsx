const About = () => {
  return (
    <div className="container">
      <div className="card">
        <h2>About GreenSteps 🌱</h2>
        
        <div style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            GreenSteps is a personal eco-impact tracker designed to make sustainable living 
            engaging, measurable, and rewarding. Our mission is to empower individuals to 
            make small, consistent changes that collectively create a significant positive 
            impact on our planet.
          </p>

          <h3 style={{ color: '#28a745', marginBottom: '1rem' }}>How It Works</h3>
          <ul style={{ marginBottom: '2rem', paddingLeft: '2rem' }}>
            <li>Complete daily eco-challenges to earn points</li>
            <li>Watch your virtual forest grow with each completed task</li>
            <li>Track your progress and compete with friends</li>
            <li>Learn practical tips for sustainable living</li>
          </ul>

          <h3 style={{ color: '#28a745', marginBottom: '1rem' }}>Our Impact</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Every completed challenge represents real environmental benefits. From reducing 
            carbon emissions to conserving water and reducing waste, your small steps 
            contribute to a healthier planet.
          </p>

          <div style={{
            background: '#e8f5e8',
            padding: '2rem',
            borderRadius: '10px',
            textAlign: 'center',
            marginTop: '2rem'
          }}>
            <h3>Join the Movement!</h3>
            <p>
              Together, we can create a more sustainable future, one green step at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
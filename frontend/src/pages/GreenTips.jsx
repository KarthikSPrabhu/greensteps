const GreenTips = () => {
  const tips = [
    {
      category: '🚗 Transportation',
      tips: [
        'Use public transport or carpool at least once a week',
        'Walk or bike for short distances instead of driving',
        'Combine errands to make fewer trips',
        'Keep your tires properly inflated for better fuel efficiency'
      ]
    },
    {
      category: '💡 Energy',
      tips: [
        'Turn off lights when leaving a room',
        'Unplug electronics when not in use',
        'Use LED bulbs instead of incandescent',
        'Lower your thermostat by 1-2 degrees in winter'
      ]
    },
    {
      category: '🍎 Food',
      tips: [
        'Reduce food waste by planning meals',
        'Choose local and seasonal produce',
        'Reduce meat consumption by one meal per week',
        'Compost food scraps instead of throwing away'
      ]
    },
    {
      category: '🗑️ Waste',
      tips: [
        'Carry a reusable water bottle and coffee cup',
        'Use cloth bags instead of plastic',
        'Recycle paper, plastic, glass, and metal',
        'Avoid single-use plastics when possible'
      ]
    },
    {
      category: '💧 Water',
      tips: [
        'Take shorter showers (5 minutes or less)',
        'Fix leaky faucets promptly',
        'Turn off tap while brushing teeth',
        'Collect rainwater for plants'
      ]
    }
  ];

  return (
    <div className="container">
      <div className="card">
        <h2>🌿 Green Living Tips</h2>
        <p style={{ marginBottom: '2rem' }}>
          Small changes make a big difference! Here are practical tips to reduce your environmental impact.
        </p>

        {tips.map((category, index) => (
          <div key={index} style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#28a745', marginBottom: '1rem' }}>{category.category}</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {category.tips.map((tip, tipIndex) => (
                <li key={tipIndex} style={{
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  borderLeft: '4px solid #28a745'
                }}>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreenTips;
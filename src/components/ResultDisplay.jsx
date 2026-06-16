import React from 'react';

const ResultDisplay = ({ data }) => {
  // If no data is passed, show nothing or a placeholder
  if (!data) {
    return <div className="result-placeholder">Start searching for a word!</div>;
  }

  return (
    <div className="result-card">
      <h3>Translation Result</h3>
      
      {/* Conditional Rendering: Show definition if available */}
      {data.definition && (
        <div className="section">
          <strong>Definition:</strong>
          <p>{data.definition}</p>
        </div>
      )}

      {/* Show translated word */}
      <div className="section">
        <strong>Meaning:</strong>
        <p style={{ fontSize: '1.5rem', color: '#2c3e50' }}>{data.translatedText}</p>
      </div>

      {/* Example of showing secondary data */}
      {data.example && (
        <div className="section">
          <em>Example: "{data.example}"</em>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Fetching translation...</p>
    </div>
  );
};

export default LoadingSpinner;
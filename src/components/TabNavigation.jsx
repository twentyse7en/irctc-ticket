import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      <button 
        className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
        onClick={() => onTabChange('upcoming')}
      >
        Upcoming
      </button>
      <button 
        className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
        onClick={() => onTabChange('past')}
      >
        Past Trips
      </button>
    </div>
  );
};

export default TabNavigation;
import React from 'react';

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const Settings = ({ onClose }) => {
  const handleClearData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="px-4 py-2 w-full flex flex-col h-screen">
        <header className="my-3 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 transition-colors"
          >
            <BackIcon />
          </button>
          <h1 className="text-xl font-semibold text-slate-800">Settings</h1>
          <div className="w-6" /> {/* Spacer for alignment */}
        </header>
        
        <main className="flex-1">
          <div className="mt-4 bg-white rounded-xl shadow-sm border border-slate-200">
            <button
              onClick={handleClearData}
              className="w-full px-4 py-3 text-left text-red-600 font-medium hover:bg-slate-50 transition-colors"
            >
              Clear All Data
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
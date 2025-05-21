import React from 'react';
import { Link } from 'react-router-dom';

const DebugPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">AquaGrow Debug Page</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h2 className="font-semibold text-blue-700 mb-2">Navigation</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><Link to="/admin" className="text-blue-600 hover:underline">Admin Dashboard</Link></li>
              <li><Link to="/login" className="text-blue-600 hover:underline">Login Page</Link></li>
              <li><Link to="/" className="text-blue-600 hover:underline">Home Page</Link></li>
            </ul>
          </div>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <h2 className="font-semibold text-yellow-700 mb-2">Troubleshooting</h2>
            <p className="text-sm text-gray-600">
              If certain pages aren't loading correctly:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-600">
              <li>Check browser console for errors</li>
              <li>Verify routing configuration in App.js</li>
              <li>Ensure all required components are imported</li>
              <li>Check if any required props are missing</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Reset Local Storage & Reload
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;

import React from 'react';

const Sidebar = ({ setActiveSection }) => (
  <div className="bg-gray-800 text-white h-full p-4 space-y-4 w-60">
    <button onClick={() => setActiveSection('maintenance')} className="w-full text-left p-2 hover:bg-gray-700 rounded">Maintenance</button>
    <button onClick={() => setActiveSection('complaints')} className="w-full text-left p-2 hover:bg-gray-700 rounded">Complaints</button>
    <button onClick={() => setActiveSection('flatDetails')} className="w-full text-left p-2 hover:bg-gray-700 rounded">Flat Details</button>
    <button onClick={() => setActiveSection('manageTenants')} className="w-full text-left p-2 hover:bg-gray-700 rounded">Manage Tenants</button>
  </div>
);

export default Sidebar;

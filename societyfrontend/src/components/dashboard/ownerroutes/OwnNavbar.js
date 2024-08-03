import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const OwnNavbar = ({ owner, toggleProfileModal, handleLogout, isProfileModalOpen }) => (
  <nav className="bg-blue-600 p-4 flex justify-between items-center">
    <h1 className="text-white text-2xl">Owner Dashboard</h1>
    <div className="flex items-center space-x-4">
      <div className="relative">
        <button onClick={toggleProfileModal} className="text-white flex items-center">
          <FontAwesomeIcon icon={faUserCircle} size="lg" className="mr-2" />
          Profile
        </button>
        {isProfileModalOpen && (
          <div className="absolute top-full mt-2 right-0 bg-white p-4 rounded-lg shadow-lg w-48 z-50">
            <h3 className="text-lg font-bold mb-2">Profile </h3>
            <p><strong>ID:</strong> {owner?.id}</p>
            <p><strong>Name:</strong> {owner?.name}</p>
            <button
              onClick={toggleProfileModal}
              className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
      <button className="text-white flex items-center" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-2" />
        Logout
      </button>
    </div>
  </nav>
);

export default OwnNavbar;

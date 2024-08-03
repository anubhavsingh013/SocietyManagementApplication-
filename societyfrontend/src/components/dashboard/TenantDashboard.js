import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAuthenticated, setEmail } from '../../redux/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const TenantDashboard = () => {
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tenant, setTenant] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [complaintText, setComplaintText] = useState('');
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/findtenant', { email });
        setTenant(response.data);
      } catch (error) {
        console.error('Error fetching tenant data:', error);
      }
    };

    fetchTenantData();
  }, [email]);

  const handleRaiseComplaint = async () => {
    if (complaintText.trim() !== '') {
      try {
        await axios.post('http://localhost:8080/api/submit-complaint', { email, complaint: complaintText });
        setComplaintText('');
        fetchComplaints(); 
      } catch (error) {
        console.error('Error submitting complaint:', error);
      }
    } else {
      alert('Complaint cannot be empty');
    }
  };

  const fetchComplaints = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/get-complaints', { email });
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleLogout = () => {
    dispatch(setAuthenticated({ isAuthenticated: false, email: null, role: null }));
    dispatch(setEmail(''));
    navigate('/');
  };

  const toggleProfileModal = () => {
    setProfileModalOpen(!isProfileModalOpen);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Tenant Dashboard</h2>
          <div className="relative flex items-center">
            <button
              onClick={handleLogout}
              className="text-indigo-600 hover:text-indigo-800 flex items-center mr-4"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
            <button
              onClick={toggleProfileModal}
              className="flex items-center"
            >
              <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-gray-700" />
            </button>
            {isProfileModalOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white p-4 rounded-lg shadow-lg w-48 z-50">
                <h3 className="text-lg font-bold mb-2">Profile Info</h3>
                <p><strong>ID:</strong> {tenant?.id}</p>
                <p><strong>Name:</strong> {tenant?.name}</p>
                <button
                  onClick={toggleProfileModal}
                  className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-bold mb-4">Tenant Details</h3>
          {tenant ? (
            <table className="min-w-full bg-white">
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">ID</td>
                  <td className="py-2 px-4 border-b border-gray-200">{tenant.id}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">Email</td>
                  <td className="py-2 px-4 border-b border-gray-200">{tenant.email}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">Flat No</td>
                  <td className="py-2 px-4 border-b border-gray-200">{tenant.flatNo}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">Name</td>
                  <td className="py-2 px-4 border-b border-gray-200">{tenant.name}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">Password</td>
                  <td className="py-2 px-4 border-b border-gray-200">********</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">Role</td>
                  <td className="py-2 px-4 border-b border-gray-200">{tenant.role}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Loading tenant details...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-bold mb-4">Raise Complaint</h3>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            rows="4"
            placeholder="Enter your complaint here..."
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
          />
          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            onClick={handleRaiseComplaint}
          >
            Submit Complaint
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">View Complaints</h3>
          {complaints.length > 0 ? (
            <ul>
              {complaints.map((complaint) => (
                <li key={complaint.id} className="py-2 border-b border-gray-200">{complaint.text}</li>
              ))}
            </ul>
          ) : (
            <p>No complaints found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashBoard = () => {
  const [activeTab, setActiveTab] = useState('owners');
  const [owners, setOwners] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [maintenance, setMaintenance] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/owner');
        setOwners(response.data);
      } catch (error) {
        console.error('Error fetching owners:', error);
      }
    };

    const fetchTenants = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tenants');
        setTenants(response.data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchOwners();
    fetchTenants();
  }, []);

  const handleMaintenanceInputChange = (ownerId, value) => {
    const newMaintenance = { ...maintenance };
    newMaintenance[ownerId] = value;
    setMaintenance(newMaintenance);
  };

  const handleAssignMaintenance = (ownerId) => {

    setSuccessMessage(`Maintenance assigned to owner ID: ${ownerId}`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  const handleResolveComplaint = (complaintId) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint.id === complaintId ? { ...complaint, status: 'resolved' } : complaint
      )
    );
  };

  return (
    <div className="flex h-screen">
      <div className="w-50 bg-gray-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <nav>
          <ul>
            <li className={`mb-4 cursor-pointer ${activeTab === 'owners' ? 'font-semibold' : ''}`} onClick={() => setActiveTab('owners')}>
              Owners
            </li>
            <li className={`mb-4 cursor-pointer ${activeTab === 'tenants' ? 'font-semibold' : ''}`} onClick={() => setActiveTab('tenants')}>
              Tenants
            </li>
            <li className={`mb-4 cursor-pointer ${activeTab === 'complaints' ? 'font-semibold' : ''}`} onClick={() => setActiveTab('complaints')}>
              Complaints
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-3/4 p-6 bg-gray-100">
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">{successMessage}</strong>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setSuccessMessage('')}>
              <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M14.348 14.849a1 1 0 001.415 0l.707-.707a1 1 0 000-1.415l-5-5a1 1 0 00-1.415 0l-5 5a1 1 0 000 1.415l.707.707a1 1 0 001.415 0L10 10.414l4.348 4.435z" />
              </svg>
            </span>
          </div>
        )}

        {activeTab === 'owners' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Owners</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Flat No</th>
                  <th className="py-2">Assign Maintenance</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner) => (
                  <tr key={owner.id}>
                    <td className="border px-4 py-2">{owner.name}</td>
                    <td className="border px-4 py-2">{owner.email}</td>
                    <td className="border px-4 py-2">{owner.flatNo}</td>
                    <td className="border px-4 py-2">
                      <div className="flex items-center">
                        <input
                          type="number"
                          placeholder="Maintenance"
                          value={maintenance[owner.id] || ''}
                          onChange={(e) => handleMaintenanceInputChange(owner.id, e.target.value)}
                          className="border p-2 rounded mr-2"
                        />
                        <button
                          onClick={() => handleAssignMaintenance(owner.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          disabled={!maintenance[owner.id] || maintenance[owner.id] <= 0}
                        >
                          Assign
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === 'tenants' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Tenants</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Flat No</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant.id}>
                    <td className="border px-4 py-2">{tenant.name}</td>
                    <td className="border px-4 py-2">{tenant.email}</td>
                    <td className="border px-4 py-2">{tenant.flatNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === 'complaints' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Complaints</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Description</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td className="border px-4 py-2">{complaint.description}</td>
                    <td className="border px-4 py-2">{complaint.status}</td>
                    <td className="border px-4 py-2">
                      {complaint.status !== 'resolved' && (
                        <button
                          onClick={() => handleResolveComplaint(complaint.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminDashBoard;

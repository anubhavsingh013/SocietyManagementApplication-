import React, { useState } from 'react';
import axios from 'axios';

const Maintenance = () => {
  const [maintenanceData, setMaintenanceData] = useState([
    { id: 1, month: 'January', amount: 100, status: 'Unpaid' },
    { id: 2, month: 'February', amount: 100, status: 'Paid' },
    { id: 3, month: 'March', amount: 100, status: 'Unpaid' },
  ]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
    const maintenance = maintenanceData.find(item => item.month === month);
    setSelectedMaintenance(maintenance || null);
    setReceiptData(null); // Clear the receipt data when month changes
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handlePayMaintenance = async (id) => {
    try {
      // const response = await axios.post(`http://localhost:8080/api/paymaintenance/${id}`);

      setMaintenanceData((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, status: 'Paid' } : item))
      );
      setSuccessMessage('Maintenance paid successfully. Receipt generated.');
      setSelectedMaintenance((prev) => (prev ? { ...prev, status: 'Paid' } : null));
    } catch (error) {
      console.error('Error paying maintenance:', error);
      setErrorMessage('Error paying maintenance');
    }
  };

  const handleViewReceipt = (maintenance) => {
    
    const receipt = {
      id: maintenance.id,
      month: maintenance.month,
      amount: maintenance.amount,
      date: '2024-07-01', 
      receiptNumber: 'REC123456' 
    };
    setReceiptData(receipt);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Monthly Maintenance</h2>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">{successMessage}</strong>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setSuccessMessage('')}>
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M14.348 14.849a1 1 0 001.415 0l.707-.707a1 1 0 000-1.415l-5-5a1 1 0 00-1.415 0l-5 5a1 1 0 000 1.415l.707.707a1 1 0 001.415 0L10 10.414l4.348 4.435z" />
            </svg>
          </span>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">{errorMessage}</strong>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setErrorMessage('')}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M14.348 14.849a1 1 0 001.415 0l.707-.707a1 1 0 000-1.415l-5-5a1 1 0 00-1.415 0l-5 5a1 1 0 000 1.415l.707.707a1 1 0 001.415 0L10 10.414l4.348 4.435z" />
            </svg>
          </span>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="month" className="block text-lg font-medium mb-2">Select Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border p-2 rounded w-full"
        >
          <option value="" disabled>Select a month</option>
          {maintenanceData.map((item) => (
            <option key={item.id} value={item.month}>{item.month}</option>
          ))}
        </select>
      </div>

      {selectedMaintenance && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-xl font-semibold mb-4">{selectedMaintenance.month} Maintenance</h3>
          <p className="mb-4">Amount: ${selectedMaintenance.amount}</p>
          <p className="mb-4">Status: <span className={selectedMaintenance.status === 'Paid' ? 'text-green-600' : 'text-red-600'}>{selectedMaintenance.status}</span></p>
          
          {selectedMaintenance.status === 'Unpaid' && (
            <button
              onClick={() => handlePayMaintenance(selectedMaintenance.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Pay Maintenance
            </button>
          )}
          {selectedMaintenance.status === 'Paid' && (
            <button
              onClick={() => handleViewReceipt(selectedMaintenance)}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              View Receipt
            </button>
          )}
        </div>
      )}

      {receiptData && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-xl font-semibold mb-4">Receipt Details</h3>
          <p className="mb-4">Receipt Number: {receiptData.receiptNumber}</p>
          <p className="mb-4">Month: {receiptData.month}</p>
          <p className="mb-4">Amount: ${receiptData.amount}</p>
          <p className="mb-4">Date: {receiptData.date}</p>
        </div>
      )}
    </div>
  );
};

export default Maintenance;

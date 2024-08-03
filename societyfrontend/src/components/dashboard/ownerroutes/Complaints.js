import React, { useState, useEffect } from "react";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState("");

  useEffect(() => {}, []);

  const handleRaiseComplaint = () => {};

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Complaints</h2>
      <div className="space-y-4 mb-4">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="p-4 border rounded">
            <p>{complaint.description}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newComplaint}
        onChange={(e) => setNewComplaint(e.target.value)}
        placeholder="Raise a new complaint"
        className="border p-2 rounded w-full mb-2"
      />
      <button
        onClick={handleRaiseComplaint}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Raise Complaint
      </button>
    </div>
  );
};

export default Complaints;

import React, { useState } from "react";
import axios from "axios";

const ManageTenants = ({ tenants }) => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [flatInput, setFlatInput] = useState("");
  const [roleInput, setRoleInput] = useState("tenant");
  const [ownerIdinput, setOwnerIdInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (/^\d+$/.test(nameInput)) {
      setErrorMessage("Name contains numbers only");
      return false;
    }
    if (!emailRegex.test(emailInput)) {
      setErrorMessage("Invalid email format");
      return false;
    }
    if (passwordInput.length < 4) {
      setErrorMessage("Password must be greater than 3 characters");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleAddTenant = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axios.post("http://localhost:8080/api/addtenant", {
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        flatNo: flatInput,
        role: roleInput,
        ownerid: ownerIdinput,
      });
      setSuccessMessage("Tenant added successfully");
      setNameInput("");
      setEmailInput("");
      setPasswordInput("");
      setFlatInput("");
      setRoleInput("tenant");
      setOwnerIdInput("");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleRemoveTenant = async (email) => {
    await axios.post("http://localhost:8080/api/deletetenant", { email });
    setSuccessMessage("Tenant Deleted successfully");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Tenants</h2>

      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">{successMessage}</strong>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setSuccessMessage("")}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M14.348 14.849a1 1 0 001.415 0l.707-.707a1 1 0 000-1.415l-5-5a1 1 0 00-1.415 0l-5 5a1 1 0 000 1.415l.707.707a1 1 0 001.415 0L10 10.414l4.348 4.435z" />
            </svg>
          </span>
        </div>
      )}

      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">{errorMessage}</strong>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setErrorMessage("")}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M14.348 14.849a1 1 0 001.415 0l.707-.707a1 1 0 000-1.415l-5-5a1 1 0 00-1.415 0l-5 5a1 1 0 000 1.415l.707.707a1 1 0 001.415 0L10 10.414l4.348 4.435z" />
            </svg>
          </span>
        </div>
      )}

      <div className="space-y-4 mb-4">
        {tenants &&
          tenants.map((tenant) => (
            <div
              key={tenant.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <p>Name: {tenant.name}</p>
                <p>Email: {tenant.email}</p>
              </div>
              <button
                onClick={() => handleRemoveTenant(tenant.email)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Name"
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Tenant Email"
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="text"
          value={flatInput}
          onChange={(e) => setFlatInput(e.target.value)}
          placeholder="Flat No"
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="text"
          value={ownerIdinput}
          onChange={(e) => setOwnerIdInput(e.target.value)}
          placeholder="Owner ID"
          className="border p-2 rounded w-full mb-2"
        />

        <button
          onClick={handleAddTenant}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Tenant
        </button>
      </div>
    </div>
  );
};

export default ManageTenants;

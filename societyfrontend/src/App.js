
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import OwnerDashboard from "./components/dashboard/OwnerDashboard";
import TenantDashboard from "./components/dashboard/TenantDashboard";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

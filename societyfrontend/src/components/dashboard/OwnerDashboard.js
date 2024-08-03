import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthenticated, setEmail } from "../../redux/authSlice";

import OwnNavbar from "./ownerroutes/OwnNavbar";
import Sidebar from "./ownerroutes/Sidebar";
import Complaints from "./ownerroutes/Complaints";
import Maintenance from "./ownerroutes/Maintenance";
import ManageTenants from "./ownerroutes/ManageTenants";
import FlatDetails from "./ownerroutes/FlatDetails";

const OwnerDashboard = () => {
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [newTenant, setNewTenant] = useState({
    name: "",
    email: "",
    password: "",
    flatNo: "",
    role: "tenant",
  });
  const [activeSection, setActiveSection] = useState("maintenance");
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const toggleProfileModal = () => setProfileModalOpen(!isProfileModalOpen);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/findowner",
          { email }
        );
        setOwner(response.data);
        setTenants(response.data.tenantlist);
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };

    fetchOwnerData();
  }, [email]);

  const handleLogout = () => {
    dispatch(
      setAuthenticated({ isAuthenticated: false, email: null, role: null })
    );
    dispatch(setEmail(""));
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col">
      <OwnNavbar
        owner={owner}
        toggleProfileModal={toggleProfileModal}
        handleLogout={handleLogout}
        isProfileModalOpen={isProfileModalOpen}
      />
      <div className="flex flex-1">
        <Sidebar setActiveSection={setActiveSection} />
        <div className="flex-1 p-4">
          {activeSection === "maintenance" && <Maintenance />}
          {activeSection === "complaints" && <Complaints />}
          {activeSection === "flatDetails" && owner && (
            <FlatDetails owner={owner} />
          )}
          {activeSection === "manageTenants" && (
            <ManageTenants tenants={tenants} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;

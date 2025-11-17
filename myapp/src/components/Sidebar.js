import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="sidebar">
      <img src="/jmtc.png" alt="Company logo" className="sidebar-logo" />
      <div
        className={`sidebar-item ${isActive("/reservations")}`}
        onClick={() => navigate("/reservations")}
      >
        📋 Reservations
      </div>

      <div
        className={`sidebar-item ${isActive("/vehicles")}`}
        onClick={() => navigate("/vehicles")}
      >
        🚗 Vehicles
      </div>
    </div>
  );
}

export default Sidebar;

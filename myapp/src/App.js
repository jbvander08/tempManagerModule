import React, { useState } from "react";
import "./App.css";

// Dummy data for reservations and vehicles
const initialReservations = [
  {
    id: 1,
    name: "Manny Villarico",
    contact: "09485687535",
    destination: "Baguio",
    date: "July 25, 2025",
    time: "10:00 AM",
    status: "Upcoming",
  },
  {
    id: 2,
    name: "Jayson Tatum",
    contact: "09993214212",
    destination: "Pampanga",
    date: "October 2, 2025",
    time: "10:00 AM",
    status: "Upcoming",
  },
  {
    id: 3,
    name: "Channing Tatum",
    contact: "09423280707",
    destination: "Manila",
    date: "March 26, 2025",
    time: "6:00 AM",
    status: "Ongoing",
  },
];

const initialVehicles = [
  {
    id: 1,
    name: "PW-1",
    type: "SUV",
    status: "In Shop",
    group: "Company",
    meter: "12,231",
    archived: false,
  },
  {
    id: 2,
    name: "LE-4",
    type: "SUV",
    status: "Inactive",
    group: "Public works",
    meter: "12,231",
    archived: false,
  },
  {
    id: 3,
    name: "PW-5",
    type: "SUV",
    status: "In Shop",
    group: "Public works",
    meter: "12,231",
    archived: false,
  },
  {
    id: 4,
    name: "PW-7",
    type: "Van",
    status: "In Shop",
    group: "Company",
    meter: "12,231",
    archived: false,
  },
];

function HeaderBar() {
  return (
    <header
      className="driver-header"
      style={{
        position: "fixed",
        top: 0,
        left: 250,
        right: 0,
        height: 70,
        background: "#2FA6DB",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "2rem",
        zIndex: 100,
      }}
    >
      <div
        className="driver-avatar"
        style={{
          width: 48,
          height: 48,
          background: "#e6e6e6",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          color: "#666",
          cursor: "pointer",
        }}
      >
        <span role="img" aria-label="avatar">
          👤
        </span>
      </div>
    </header>
  );
}

function App() {
  const [tab, setTab] = useState("reservations");

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif" }}>
      <Sidebar tab={tab} setTab={setTab} />
      <HeaderBar />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          minHeight: "100vh",
          marginLeft: 250,
          marginTop: 70,
          background: "#d3d3d3",
          zIndex: 1,
        }}
      >
        {tab === "reservations" ? <Reservations /> : <Vehicles />}
      </div>
    </div>
  );
}


function Sidebar({ tab, setTab }) {

  const rootDiv = document.getElementById('root');

  return (
    
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: 250,
        background: "#0E2A47",
        color: "#fff",
        fontFamily: "Montserrat, sans-serif",
        zIndex: 200,
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          padding: "20px 16px",
          fontWeight: "bold",
          letterSpacing: "2px",
        }}
      >
        <img src="jmtc.png" alt="company logo"/>
      
      </div>
      <div
        style={{
          padding: "18px 16px",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          background: tab === "reservations" ? "#FF9E0C" : "transparent",
        }}
        onClick={() => setTab("reservations")}
      >
        <span style={{ marginRight: 12, fontSize: "1.3rem" }}>🗂️</span>
        Reservations
      </div>
      <div
        style={{
          padding: "18px 16px",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          background: tab === "vehicles" ? "#FF9E0C" : "transparent",
        }}
        onClick={() => setTab("vehicles")}
      >
        <span style={{ marginRight: 12, fontSize: "1.3rem" }}>🚗</span>
        Vehicles
      </div>
      <div
        style={{
          padding: "18px 16px",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <span style={{ marginRight: 12, fontSize: "1.3rem" }}>🔒</span>
        Logout
      </div>
    </div>
  );
}

// Reservations main component
function Reservations() {
  const [reservations, setReservations] = useState(initialReservations);
  const [filters, setFilters] = useState({
    name: "",
    contact: "",
    destination: "",
    status: "",
  });
  const [searchFilters, setSearchFilters] = useState(filters);
  const [tab, setTab] = useState("list");
  const [formData, setFormData] = useState({});

  // Filter logic
  const filtered = reservations.filter(
    (r) =>
      (!searchFilters.name ||
        r.name.toLowerCase().includes(searchFilters.name.toLowerCase())) &&
      (!searchFilters.contact || r.contact.includes(searchFilters.contact)) &&
      (!searchFilters.destination ||
        r.destination.toLowerCase() === searchFilters.destination.toLowerCase()) &&
      (!searchFilters.status || r.status === searchFilters.status)
  );

  // Add reservation
  const handleAddReservation = (data) => {
    setReservations([
      ...reservations,
      { ...data, id: reservations.length + 1, status: "Upcoming" },
    ]);
    setTab("list");
  };

  return (
    <div className="page-container">
      {/* Tabs */}
      <div className="reservations-tabs">
        <button
          className={`reservations-tab ${tab === "list" ? "active" : ""}`}
          onClick={() => setTab("list")}
        >
          Reservation List
        </button>
        <button
          className={`reservations-tab ${tab === "create" ? "active" : ""}`}
          onClick={() => setTab("create")}
        >
          Create Reservation
        </button>
      </div>

      {/* Content */}
      {tab === "list" ? (
        <div className="module-card">
          <h2 className="module-title">Reservation List</h2>
          <div className="filter-row">
            <input
              placeholder="Customer name"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            <input
              placeholder="Contact number"
              value={filters.contact}
              onChange={(e) => setFilters({ ...filters, contact: e.target.value })}
            />
            <select
              value={filters.destination}
              onChange={(e) =>
                setFilters({ ...filters, destination: e.target.value })
              }
            >
              <option value="">Destination</option>
              <option value="Baguio">Baguio</option>
              <option value="Pampanga">Pampanga</option>
              <option value="Manila">Manila</option>
            </select>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="btn-primary" onClick={() => setSearchFilters(filters)}>
              Search
            </button>
          </div>

          <table className="styled-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Contact</th>
                <th>Destination</th>
                <th>Date/Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.contact}</td>
                  <td>{r.destination}</td>
                  <td>
                    {r.date} <br />
                    {r.time}
                  </td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="module-card">
          <h2 className="module-title">Create Reservation</h2>
          <ReservationForm onSubmit={handleAddReservation} onClose={() => setTab("list")} />
        </div>
      )}
    </div>
  );
}


// Updated Reservation creation form
function ReservationForm({ onSubmit, onClose }) {
  const [data, setData] = useState({
    name: "",
    contact: "",
    destination: "",
    startDate: "",
    finishDate: "",
    time: "9:00 AM",
    plateNumber: "",
    type: "SUV",
  });

  const handleSubmit = () => {
    if (!data.name || !data.contact || !data.destination || !data.startDate) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(data);
  };

  return (
    <div className="form-grid">
      <div>
        <div className="form-group">
          <label>Customer Name</label>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            value={data.contact}
            onChange={(e) => setData({ ...data, contact: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Destination</label>
          <select
            value={data.destination}
            onChange={(e) => setData({ ...data, destination: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Baguio">Baguio</option>
            <option value="Pampanga">Pampanga</option>
            <option value="Manila">Manila</option>
          </select>
        </div>
      </div>

      <div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={data.startDate}
            onChange={(e) => setData({ ...data, startDate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Finish Date</label>
          <input
            type="date"
            value={data.finishDate}
            onChange={(e) => setData({ ...data, finishDate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Vehicle Type</label>
          <select
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
          >
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            <option value="Sedan">Sedan</option>
          </select>
        </div>
      </div>

      <div style={{ gridColumn: "1 / -1", textAlign: "right" }}>
        <button className="btn-primary" onClick={handleSubmit}>
          Save Reservation
        </button>
        <button
          style={{ marginLeft: "10px", background: "#aaa", color: "#fff" }}
          className="btn-primary"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}


// Reservation summary modal
function ReservationSummary({ data, onClose, onConfirm }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 8,
          minWidth: 400,
          maxWidth: 500,
          position: "relative",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <button
          style={{
            position: "absolute",
            top: 12,
            right: 16,
            fontSize: 28,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#000",
          }}
          onClick={onClose}
        >
          ×
        </button>

        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Vehicle information
        </h3>
        <div style={{ marginBottom: "8px", fontSize: "14px" }}>
          <strong>Plate :</strong> {data.plateNumber}
        </div>
        <div style={{ marginBottom: "24px", fontSize: "14px" }}>
          <strong>Type :</strong> {data.type}
        </div>

        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Customer information
        </h3>
        <div style={{ marginBottom: "8px", fontSize: "14px" }}>
          <strong>Name :</strong> {data.name}
        </div>
        <div style={{ marginBottom: "8px", fontSize: "14px" }}>
          <strong>Contact :</strong> {data.contact}
        </div>
        <div style={{ marginBottom: "8px", fontSize: "14px" }}>
          <strong>Destination :</strong> {data.destination}
        </div>
        <div style={{ marginBottom: "8px", fontSize: "14px" }}>
          <strong>Start Date:</strong>{" "}
          {data.startDate
            ? new Date(data.startDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : data.startDate}
        </div>
        <div style={{ marginBottom: "8px", fontSize: "14px" }}>
          <strong>Finish Date:</strong>{" "}
          {data.finishDate
            ? new Date(data.finishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : data.finishDate}
        </div>
        <div style={{ marginBottom: "24px", fontSize: "14px" }}>
          <strong>Time:</strong> {data.time}
        </div>

        <button
          style={{
            background: "#355a43",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: 6,
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            float: "right",
            fontFamily: "Montserrat, sans-serif",
          }}
          onClick={onConfirm}
        >
          Confirm Reservation
        </button>
        <div style={{ clear: "both" }}></div>
      </div>
    </div>
  );
}

// Reservation added confirmation
function ReservationAdded({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fdf2c2",
          padding: 32,
          borderRadius: 8,
          minWidth: 340,
          position: "relative",
          textAlign: "center",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <button
          style={{
            position: "absolute",
            top: 12,
            right: 16,
            fontSize: 28,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          ×
        </button>
        <div style={{ fontSize: 64, color: "#355a43" }}>✔️</div>
        <div style={{ fontSize: 36, color: "#355a43", marginTop: 16 }}>
          Reservation Added
        </div>
      </div>
    </div>
  );
}

// Vehicles main component with Archive functionality
function Vehicles() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    group: "",
    status: "",
    archived: "",
  });

  // Filter logic
  const filtered = vehicles.filter(
    (v) =>
      (!filters.type || v.type === filters.type) &&
      (!filters.group || v.group === filters.group) &&
      (!filters.status || v.status === filters.status) &&
      (filters.archived === "" || v.archived === (filters.archived === "true"))
  );

  // Archive / Unarchive
  const handleArchiveVehicles = (archive = true) => {
    if (selectedVehicles.length === 0) {
      alert(`Please select vehicles to ${archive ? "archive" : "unarchive"}`);
      return;
    }

    const updated = vehicles.map((v) =>
      selectedVehicles.includes(v.id) ? { ...v, archived: archive } : v
    );
    setVehicles(updated);
    setSelectedVehicles([]);
    alert(
      `${selectedVehicles.length} vehicle(s) ${
        archive ? "archived" : "unarchived"
      } successfully`
    );
  };

  // Toggle selection
  const toggleSelect = (id) => {
    setSelectedVehicles((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  // Status color indicator
  const statusColor = (status) =>
    ({
      "Inactive": "#b71c1c",
      "In Shop": "#e6b800", 
      "Active": "#2e7d32", 
    }[status] || "#888");

  return (
    <div className="page-container">
      {/* Filter Module */}
      <div className="module-card">
        <h2 className="module-title">Vehicle Filters</h2>
        <div className="filter-row">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
          </select>

          <select
            value={filters.group}
            onChange={(e) => setFilters({ ...filters, group: e.target.value })}
          >
            <option value="">All Groups</option>
            <option value="Company">Company</option>
            <option value="Public works">Public works</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Statuses</option>
            <option value="Inactive">Inactive</option>
            <option value="In Shop">In Shop</option>
            <option value="Active">Active</option>
          </select>

          <select
            value={filters.archived}
            onChange={(e) =>
              setFilters({ ...filters, archived: e.target.value })
            }
          >
            <option value="">All</option>
            <option value="false">Active</option>
            <option value="true">Archived</option>
          </select>

          <button
            className={`btn-danger ${
              selectedVehicles.length === 0 ? "disabled" : ""
            }`}
            onClick={() => handleArchiveVehicles(true)}
            disabled={selectedVehicles.length === 0}
          >
            📦 Archive ({selectedVehicles.length})
          </button>

          <button
            className={`btn-success ${
              selectedVehicles.length === 0 ? "disabled" : ""
            }`}
            onClick={() => handleArchiveVehicles(false)}
            disabled={selectedVehicles.length === 0}
          >
            📂 Unarchive ({selectedVehicles.length})
          </button>
        </div>
      </div>

      {/* Vehicle List Module */}
      <div className="module-card">
        <h2 className="module-title">Vehicle List</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th></th>
              <th>Vehicle Name</th>
              <th>Status</th>
              <th>Type</th>
              <th>Group</th>
              <th>Meter Reading</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr
                key={v.id}
                className={v.archived ? "archived-row" : ""}
                onClick={() => toggleSelect(v.id)}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedVehicles.includes(v.id)}
                    onChange={() => toggleSelect(v.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td>
                  {v.name}{" "}
                  {v.archived && (
                    <span className="archived-label">(Archived)</span>
                  )}
                </td>
                <td>
                  <span
                    className="status-circle"
                    style={{ background: statusColor(v.status) }}
                  ></span>
                  {v.status}
                </td>
                <td>{v.type}</td>
                <td>{v.group}</td>
                <td>{v.meter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default App;

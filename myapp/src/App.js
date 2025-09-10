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
    type: "Suv",
    status: "In Shop",
    group: "Company",
    meter: "12,231",
    archived: false,
  },
  {
    id: 2,
    name: "LE-4",
    type: "Suv",
    status: "Inactive",
    group: "Public works",
    meter: "12,231",
    archived: false,
  },
  {
    id: 3,
    name: "PW-5",
    type: "Suv",
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
    <header className="driver-header">
      <div className="driver-avatar">
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
    <div>
      <Sidebar tab={tab} setTab={setTab} />
      <HeaderBar /> {}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          minHeight: "100vh",
          marginLeft: 250,
          marginTop: 40,
          background: "#d3d3d3",
          zIndex: 1,
        }}
      >
        {tab === "reservations" ? <Reservations /> : <Vehicles />}
      </div>
    </div>
  );
}

// Sidebar navigation
// ...existing code...

function Sidebar({ tab, setTab }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">JMTC</div>
      <div
        className={`sidebar-item${tab === "reservations" ? " active" : ""}`}
        onClick={() => setTab("reservations")}
      >
        <span className="icon">🗂️</span>
        Reservations
      </div>
      <div
        className={`sidebar-item${tab === "vehicles" ? " active" : ""}`}
        onClick={() => setTab("vehicles")}
      >
        <span className="icon">🚗</span>
        Vehicles
      </div>
      <div className="sidebar-item">
        <span className="icon">🔒</span>
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
  const [selected, setSelected] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [showAdded, setShowAdded] = useState(false);

  // Filtering only happens after clicking "Search"
  const filtered = reservations.filter(
    (r) =>
      (!searchFilters.name ||
        r.name.toLowerCase().includes(searchFilters.name.toLowerCase())) &&
      (!searchFilters.contact || r.contact.includes(searchFilters.contact)) &&
      (!searchFilters.destination ||
        r.destination.toLowerCase() ===
          searchFilters.destination.toLowerCase()) &&
      (!searchFilters.status || r.status === searchFilters.status)
  );

  // Status color
  const statusColor = (status) =>
    ({
      Upcoming: "#1976d2",
      Ongoing: "#e6b800",
      Completed: "#2e7d32",
    }[status] || "#888");

  return (
    <div style={{ padding: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h2>Reservation List</h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: "#355a43",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 4,
            fontWeight: 600,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          + Add Reservation
        </button>
      </div>
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <input
          placeholder="Filter customer name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          style={{ flex: 1 }}
        />
        <input
          placeholder="Filter contact number"
          value={filters.contact}
          onChange={(e) => setFilters({ ...filters, contact: e.target.value })}
          style={{ flex: 1 }}
        />
        <select
          value={filters.destination}
          onChange={(e) =>
            setFilters({ ...filters, destination: e.target.value })
          }
          style={{ flex: 1 }}
        >
          <option value="">Filter destination</option>
          <option value="Baguio">Baguio</option>
          <option value="Pampanga">Pampanga</option>
          <option value="Manila">Manila</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          style={{ flex: 1 }}
        >
          <option value="">All Statuses</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          onClick={() => setSearchFilters(filters)}
          style={{
            background: "#355a43",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 4,
            fontWeight: 600,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Search
        </button>
      </div>
      <table
        style={{
          width: "100%",
          background: "#fff",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th></th>
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
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(r.id)}
                  onChange={(e) => {
                    setSelected(
                      e.target.checked
                        ? [...selected, r.id]
                        : selected.filter((id) => id !== r.id)
                    );
                  }}
                />
              </td>
              <td>{r.name}</td>
              <td>{r.contact}</td>
              <td>{r.destination}</td>
              <td>
                {r.date} <br /> {r.time}
              </td>
              <td>
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: statusColor(r.status),
                    marginRight: 8,
                    verticalAlign: "middle",
                  }}
                ></span>
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <ReservationForm
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            setFormData(data);
            setShowForm(false);
            setShowSummary(true);
          }}
        />
      )}
      {showSummary && (
        <ReservationSummary
          data={formData}
          onClose={() => setShowSummary(false)}
          onConfirm={() => {
            setReservations([
              ...reservations,
              { ...formData, id: reservations.length + 1 },
            ]);
            setShowSummary(false);
            setShowAdded(true);
          }}
        />
      )}
      {showAdded && <ReservationAdded onClose={() => setShowAdded(false)} />}
    </div>
  );
}

// Reservation creation form
function ReservationForm({ onClose, onSubmit }) {
  const [data, setData] = useState({
    name: "",
    contact: "",
    destination: "",
    date: "",
    time: "",
    plate: "",
    type: "",
  });

  return (
    <div style={modalStyle}>
      <div style={modalBoxStyle}>
        <button style={modalCloseStyle} onClick={onClose}>
          ×
        </button>
        <h3>Create Reservation</h3>
        <div>
          <input
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Contact Number"
            value={data.contact}
            onChange={(e) => setData({ ...data, contact: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Destination"
            value={data.destination}
            onChange={(e) => setData({ ...data, destination: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Start Date"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Time"
            value={data.time}
            onChange={(e) => setData({ ...data, time: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Plate Number"
            value={data.plate}
            onChange={(e) => setData({ ...data, plate: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Type"
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button
          style={{ ...inputStyle, background: "#355a43", color: "#fff" }}
          onClick={() => onSubmit(data)}
        >
          Add Reservation
        </button>
      </div>
    </div>
  );
}

// Reservation summary modal
function ReservationSummary({ data, onClose, onConfirm }) {
  return (
    <div style={modalStyle}>
      <div style={modalBoxStyle}>
        <button style={modalCloseStyle} onClick={onClose}>
          ×
        </button>
        <h3>Vehicle information</h3>
        <div>Plate: {data.plate}</div>
        <div>Type: {data.type}</div>
        <h3 style={{ marginTop: 16 }}>Customer information</h3>
        <div>Name: {data.name}</div>
        <div>Contact: {data.contact}</div>
        <div>Destination: {data.destination}</div>
        <div>Start Date: {data.date}</div>
        <div>Time: {data.time}</div>
        <button
          style={{
            ...inputStyle,
            background: "#355a43",
            color: "#fff",
            marginTop: 16,
          }}
          onClick={onConfirm}
        >
          Confirm Reservation
        </button>
      </div>
    </div>
  );
}

// Reservation added confirmation
function ReservationAdded({ onClose }) {
  return (
    <div style={modalStyle}>
      <div
        style={{ ...modalBoxStyle, background: "#fdf2c2", textAlign: "center" }}
      >
        <button style={modalCloseStyle} onClick={onClose}>
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

// Vehicles main component
function Vehicles() {
  const [vehicles, setVehicles] = useState(initialVehicles);
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

  return (
    <div style={{ padding: 32 }}>
      <h2>Vehicle List</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Search names, VINs, an..."
          style={{ marginRight: 8 }}
        />
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          style={{ marginRight: 8 }}
        >
          <option value="">All Types</option>
          <option value="Suv">Suv</option>
          <option value="Van">Van</option>
        </select>
        <select
          value={filters.group}
          onChange={(e) => setFilters({ ...filters, group: e.target.value })}
          style={{ marginRight: 8 }}
        >
          <option value="">All Groups</option>
          <option value="Company">Company</option>
          <option value="Public works">Public works</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          style={{ marginRight: 8 }}
        >
          <option value="">All Statuses</option>
          <option value="Inactive">Inactive</option>
          <option value="In Shop">In Shop</option>
        </select>
        <select
          value={filters.archived}
          onChange={(e) => setFilters({ ...filters, archived: e.target.value })}
          style={{ marginRight: 8 }}
        >
          <option value="">All</option>
          <option value="false">Active</option>
          <option value="true">Archived</option>
        </select>
      </div>
      <table
        style={{
          width: "100%",
          background: "#fff",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th></th>
            <th>Name</th>
            <th>Status</th>
            <th>Type</th>
            <th>Group</th>
            <th>Current Meter</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((v) => (
            <tr key={v.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{v.name}</td>
              <td>{v.status}</td>
              <td>{v.type}</td>
              <td>{v.group}</td>
              <td>{v.meter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styles
const modalStyle = {
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
};
const modalBoxStyle = {
  background: "#fff",
  padding: 32,
  borderRadius: 8,
  minWidth: 340,
  position: "relative",
};
const modalCloseStyle = {
  position: "absolute",
  top: 12,
  right: 16,
  fontSize: 28,
  background: "none",
  border: "none",
  cursor: "pointer",
};
const inputStyle = {
  display: "block",
  width: "100%",
  margin: "8px 0",
  padding: "8px",
  fontSize: 16,
  borderRadius: 4,
  border: "1px solid #ccc",
};

export default App;

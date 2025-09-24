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
        background: "#222",
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
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: 250,
        background: "#25472f",
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
        JMTC
      </div>
      <div
        style={{
          padding: "18px 16px",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          background: tab === "reservations" ? "#3b5d3a" : "transparent",
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
          background: tab === "vehicles" ? "#3b5d3a" : "transparent",
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
            border: "none",
            fontWeight: 600,
            fontFamily: "Montserrat, sans-serif",
            cursor: "pointer",
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
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: 4,
            border: "1px solid #ccc",
            fontFamily: "Montserrat, sans-serif",
          }}
        />
        <input
          placeholder="Filter contact number"
          value={filters.contact}
          onChange={(e) => setFilters({ ...filters, contact: e.target.value })}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: 4,
            border: "1px solid #ccc",
            fontFamily: "Montserrat, sans-serif",
          }}
        />
        <select
          value={filters.destination}
          onChange={(e) =>
            setFilters({ ...filters, destination: e.target.value })
          }
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: 4,
            border: "1px solid #ccc",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          <option value="">Filter destination</option>
          <option value="Baguio">Baguio</option>
          <option value="Pampanga">Pampanga</option>
          <option value="Manila">Manila</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: 4,
            border: "1px solid #ccc",
            fontFamily: "Montserrat, sans-serif",
          }}
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
            border: "none",
            fontWeight: 600,
            fontFamily: "Montserrat, sans-serif",
            cursor: "pointer",
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
          borderCollapse: "collapse",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ padding: "12px", textAlign: "left" }}></th>
            <th style={{ padding: "12px", textAlign: "left" }}>
              Customer Name
            </th>
            <th style={{ padding: "12px", textAlign: "left" }}>Contact</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Destination</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Date/Time</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r.id} style={{ borderTop: "1px solid #eee" }}>
              <td style={{ padding: "12px" }}>
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
              <td style={{ padding: "12px" }}>{r.name}</td>
              <td style={{ padding: "12px" }}>{r.contact}</td>
              <td style={{ padding: "12px" }}>{r.destination}</td>
              <td style={{ padding: "12px" }}>
                {r.date} <br /> {r.time}
              </td>
              <td style={{ padding: "12px" }}>
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
              { ...formData, id: reservations.length + 1, status: "Upcoming" },
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

// Updated Reservation creation form
function ReservationForm({ onClose, onSubmit }) {
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
    if (
      data.name &&
      data.contact &&
      data.destination &&
      data.startDate &&
      data.plateNumber
    ) {
      onSubmit({
        ...data,
        date: data.startDate,
        plate: data.plateNumber,
      });
    } else {
      alert("Please fill in all required fields");
    }
  };

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
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          width: "800px",
          maxWidth: "95vw",
          maxHeight: "95vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#f8f9fa",
            padding: "16px 24px",
            borderBottom: "1px solid #e9ecef",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Create Reservation
            </h3>
            <button
              onClick={handleSubmit}
              style={{
                background: "#28a745",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: 4,
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              + Add Reservation
            </button>
          </div>
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666",
            }}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Form Content */}
        <div
          style={{
            padding: "24px",
            display: "flex",
            gap: "24px",
          }}
        >
          {/* Customer Information */}
          <div style={{ flex: 1 }}>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "#333",
              }}
            >
              Customer Information
            </h4>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "6px",
                  color: "#333",
                }}
              >
                Name
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  fontSize: "14px",
                  fontFamily: "Montserrat, sans-serif",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "6px",
                  color: "#333",
                }}
              >
                Contact Number
              </label>
              <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
                {Array.from({ length: 11 }, (_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    value={data.contact[i] || ""}
                    onChange={(e) => {
                      const newContact = data.contact.split("");
                      newContact[i] = e.target.value;
                      setData({ ...data, contact: newContact.join("") });
                    }}
                    style={{
                      width: "28px",
                      height: "35px",
                      padding: "6px",
                      border: "1px solid #ddd",
                      borderRadius: 4,
                      textAlign: "center",
                      fontSize: "13px",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "6px",
                  color: "#333",
                }}
              >
                Destination
              </label>
              <select
                value={data.destination}
                onChange={(e) =>
                  setData({ ...data, destination: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  fontSize: "14px",
                  fontFamily: "Montserrat, sans-serif",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <option value="">Select destination</option>
                <option value="Baguio">Baguio</option>
                <option value="Pampanga">Pampanga</option>
                <option value="Manila">Manila</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "6px",
                    color: "#333",
                  }}
                >
                  Start Date
                </label>
                <input
                  type="text"
                  placeholder="07/25/25"
                  value={data.startDate}
                  onChange={(e) =>
                    setData({ ...data, startDate: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    fontSize: "14px",
                    fontFamily: "Montserrat, sans-serif",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "6px",
                    color: "#333",
                  }}
                >
                  Finish Date
                </label>
                <input
                  type="text"
                  placeholder="07/26/25"
                  value={data.finishDate}
                  onChange={(e) =>
                    setData({ ...data, finishDate: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    fontSize: "14px",
                    fontFamily: "Montserrat, sans-serif",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "6px",
                  color: "#333",
                }}
              >
                Time
              </label>
              <select
                value={data.time}
                onChange={(e) => setData({ ...data, time: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  fontSize: "14px",
                  fontFamily: "Montserrat, sans-serif",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="5:00 PM">5:00 PM</option>
              </select>
            </div>
          </div>

          {/* Vehicle Information */}
          <div style={{ flex: 1 }}>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "#333",
              }}
            >
              Vehicle Information
            </h4>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "6px",
                  color: "#333",
                }}
              >
                Plate Number
              </label>
              <div style={{ display: "flex", gap: "3px" }}>
                {Array.from({ length: 7 }, (_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    value={data.plateNumber[i] || ""}
                    onChange={(e) => {
                      const newPlate = data.plateNumber.split("");
                      newPlate[i] = e.target.value.toUpperCase();
                      setData({ ...data, plateNumber: newPlate.join("") });
                    }}
                    style={{
                      width: "35px",
                      height: "35px",
                      padding: "6px",
                      border: "1px solid #ddd",
                      borderRadius: 4,
                      textAlign: "center",
                      fontSize: "13px",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "6px",
                  color: "#333",
                }}
              >
                Type
              </label>
              <select
                value={data.type}
                onChange={(e) => setData({ ...data, type: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  fontSize: "14px",
                  fontFamily: "Montserrat, sans-serif",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <option value="SUV">SUV</option>
                <option value="Van">Van</option>
                <option value="Sedan">Sedan</option>
                <option value="Truck">Truck</option>
              </select>
            </div>
          </div>
        </div>
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

  // Archive selected vehicles
  const handleArchiveVehicles = () => {
    if (selectedVehicles.length === 0) {
      alert("Please select vehicles to archive");
      return;
    }

    const updatedVehicles = vehicles.map((vehicle) =>
      selectedVehicles.includes(vehicle.id)
        ? { ...vehicle, archived: true }
        : vehicle
    );

    setVehicles(updatedVehicles);
    setSelectedVehicles([]);
    alert(`${selectedVehicles.length} vehicle(s) archived successfully`);
  };

  // Unarchive selected vehicles
  const handleUnarchiveVehicles = () => {
    if (selectedVehicles.length === 0) {
      alert("Please select vehicles to unarchive");
      return;
    }

    const updatedVehicles = vehicles.map((vehicle) =>
      selectedVehicles.includes(vehicle.id)
        ? { ...vehicle, archived: false }
        : vehicle
    );

    setVehicles(updatedVehicles);
    setSelectedVehicles([]);
    alert(`${selectedVehicles.length} vehicle(s) unarchived successfully`);
  };

  return (
    <div style={{ padding: 32, fontFamily: "Montserrat, sans-serif" }}>
      <h2 style={{ marginBottom: 24 }}>Vehicle List</h2>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <input
          placeholder="Search names, VINs, an..."
          style={{
            padding: "8px",
            borderRadius: 4,
            border: "1px solid #ccc",
            fontFamily: "Montserrat, sans-serif",
          }}
        />
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          style={{
            padding: "8px",
            borderRadius: 4,
            border: "1px solid #ccc",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          <option value="">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
        </select>
        <select
          value={filters.group}
          onChange={(e) => setFilters({ ...filters, group: e.target.value })}
          style={{
            padding: "8px",
            borderRadius: 4,
            border: "1px solid #ccc",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          <option value="">All Groups</option>
          <option value="Company">Company</option>
          <option value="Public works">Public works</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          style={{
            padding: "8px",
            borderRadius: 4,
            border: "1px solid #ccc",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          <option value="">All Statuses</option>
          <option value="Inactive">Inactive</option>
          <option value="In Shop">In Shop</option>
        </select>
        <select
          value={filters.archived}
          onChange={(e) => setFilters({ ...filters, archived: e.target.value })}
          style={{
            padding: "8px",
            borderRadius: 4,
            border: "1px solid #ccc",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          <option value="">All</option>
          <option value="false">Active</option>
          <option value="true">Archived</option>
        </select>
        <button
          onClick={handleArchiveVehicles}
          disabled={selectedVehicles.length === 0}
          className={`px-4 py-2 rounded-md text-sm font-medium transition 
    ${
      selectedVehicles.length === 0
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-red-600 text-white hover:bg-red-700"
    }`}
        >
          📦 Archive ({selectedVehicles.length})
        </button>

        <button
          onClick={handleUnarchiveVehicles}
          disabled={selectedVehicles.length === 0}
          className={`px-4 py-2 rounded-md text-sm font-medium transition 
    ${
      selectedVehicles.length === 0
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-green-600 text-white hover:bg-green-700"
    }`}
        >
          📂 Unarchive ({selectedVehicles.length})
        </button>
      </div>
      <table
        style={{
          width: "100%",
          background: "#fff",
          borderRadius: 8,
          overflow: "hidden",
          borderCollapse: "collapse",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ padding: "12px", textAlign: "left" }}></th>
            <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Type</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Group</th>
            <th style={{ padding: "12px", textAlign: "left" }}>
              Current Meter
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((v) => (
            <tr
              key={v.id}
              style={{
                borderTop: "1px solid #eee",
                backgroundColor: v.archived ? "#f8f9fa" : "transparent",
                opacity: v.archived ? 0.7 : 1,
              }}
            >
              <td style={{ padding: "12px" }}>
                <input
                  type="checkbox"
                  checked={selectedVehicles.includes(v.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedVehicles([...selectedVehicles, v.id]);
                    } else {
                      setSelectedVehicles(
                        selectedVehicles.filter((id) => id !== v.id)
                      );
                    }
                  }}
                />
              </td>
              <td style={{ padding: "12px" }}>
                {v.name}{" "}
                {v.archived && (
                  <span style={{ color: "#6c757d", fontSize: "12px" }}>
                    (Archived)
                  </span>
                )}
              </td>
              <td style={{ padding: "12px" }}>{v.status}</td>
              <td style={{ padding: "12px" }}>{v.type}</td>
              <td style={{ padding: "12px" }}>{v.group}</td>
              <td style={{ padding: "12px" }}>{v.meter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

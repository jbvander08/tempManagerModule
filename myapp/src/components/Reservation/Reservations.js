import React, { useState, useEffect } from "react";
import { initialReservations } from "../../data";
import ReservationForm from "./ReservationForm";
import ReservationAdded from "./ReservationAdded";
import SummaryCard from "../Dashboard/SummaryCard";
import "./Reservations.css";

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
  const [showAdded, setShowAdded] = useState(false);
  const [editData, setEditData] = useState(null);

  // Helper function to get current status based on date range
  const getReservationStatus = (startDate, endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    
    if (today >= start && today <= end) {
      return "Ongoing";
    } else if (today > end) {
      return "Completed";
    } else {
      return "Upcoming";
    }
  };

  // Filter entries
  const filtered = reservations.filter(
    (r) =>
      (!searchFilters.name ||
        r.name.toLowerCase().includes(searchFilters.name.toLowerCase())) &&
      (!searchFilters.contact || r.contact.includes(searchFilters.contact)) &&
      (!searchFilters.destination ||
        r.destination.toLowerCase() === searchFilters.destination.toLowerCase()) &&
      (!searchFilters.status || getReservationStatus(r.startDate, r.endDate) === searchFilters.status)
  );

  // Save new or edited reservation
  const handleAddOrEdit = (data, isEdit = false) => {
    if (isEdit) {
      setReservations((prev) =>
        prev.map((r) => (r.id === data.id ? data : r))
      );
    } else {
      setReservations((prev) => [
        ...prev,
        { ...data, id: prev.length + 1, status: "Upcoming" },
      ]);
    }

    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
    setEditData(null);
    setTab("list");
  };

  // Delete reservation
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      setReservations(reservations.filter((r) => r.id !== id));
    }
  };

  // Begin editing
  const handleEdit = (res) => {
    setEditData(res);
    setTab("create");
  };

  return (
    <div className="page-container">

      {/* SUMMARY CARDS */}
      <div className="summary-area">
        <SummaryCard label="Total" value={reservations.length} color="#0d6efd" />
        <SummaryCard label="Upcoming" value={reservations.filter(r => getReservationStatus(r.startDate, r.endDate) === "Upcoming").length} color="#2e7d32" />
        <SummaryCard label="Ongoing" value={reservations.filter(r => getReservationStatus(r.startDate, r.endDate) === "Ongoing").length} color="#e6b800" />
        <SummaryCard label="Completed" value={reservations.filter(r => getReservationStatus(r.startDate, r.endDate) === "Completed").length} color="#2788deff" />
      </div>

      {/* TABS */}
      <div className="reservations-tabs">
        <button
          className={`reservations-tab ${tab === "list" ? "active" : ""}`}
          onClick={() => { setTab("list"); setEditData(null); }}
        >
          Reservation List
        </button>

        <button
          className={`reservations-tab ${tab === "create" ? "active" : ""}`}
          onClick={() => { setTab("create"); setEditData(null); }}
        >
          {editData ? "Edit Reservation" : "Create Reservation"}
        </button>
      </div>

      {showAdded && <ReservationAdded />}

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
              onChange={(e) =>
                setFilters({ ...filters, contact: e.target.value })
              }
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
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              className="btn-primary"
              onClick={() => setSearchFilters(filters)}
            >
              Search
            </button>
          </div>

          <table className="styled-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Contact</th>
                <th>Destination</th>
                <th>Date / Time</th>
                <th>Status</th>
                <th width="125px">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.contact}</td>
                  <td>{r.destination}</td>
                  <td>
                    {r.date} <br /> {r.time}
                  </td>
                  <td>{getReservationStatus(r.startDate, r.endDate)}</td>
                  <td>
                    <button className="btn-small" onClick={() => handleEdit(r)}>✏ Edit</button>
                    <button className="btn-small btn-danger-small" onClick={() => handleDelete(r.id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="module-card">
          <h2 className="module-title">{editData ? "Edit Reservation" : "Create Reservation"}</h2>
          <ReservationForm
            onSubmit={handleAddOrEdit}
            onClose={() => setTab("list")}
            editData={editData}
          />
        </div>
      )}
    </div>
  );
}

export default Reservations;

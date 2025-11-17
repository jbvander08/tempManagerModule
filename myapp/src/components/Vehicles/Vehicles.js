import React, { useState } from "react";
import { initialVehicles } from "../../data";
import SummaryCard from "../Dashboard/SummaryCard";
import VehicleForm from "./VehicleForm";
import "./Vehicles.css";

function Vehicles() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [filters, setFilters] = useState({
    type: "",
    status: "",
    archived: "",
  });

  const filtered = vehicles.filter(
    (v) =>
      (!filters.type || v.type === filters.type) &&
      (!filters.status || v.status === filters.status) &&
      (filters.archived === ""
        ? true
        : v.archived === (filters.archived === "true"))
  );

  const startEdit = (vehicle) => {
    setEditData(vehicle);
    setShowForm(true);
  };

  const deleteVehicle = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleSaveVehicle = (data, isEdit) => {
    if (isEdit) {
      setVehicles((prev) => prev.map((v) => (v.id === data.id ? data : v)));
    } else {
      setVehicles((prev) => [
        ...prev,
        { ...data, id: prev.length + 1, archived: false },
      ]);
    }
    setShowForm(false);
    setEditData(null);
  };

  const statusColors = {
    Active: "#2e7d32",
    "In Shop": "#ffb300",
    Inactive: "#c62828",
  };

  return (
    <div className="page-container">
      {/* Summary */}
      <div className="summary-area">
        <SummaryCard label="Total Vehicles" value={vehicles.length} color="#0d6efd" />
        <SummaryCard label="Active" value={vehicles.filter(v => v.status === "Active").length} color="#2e7d32" />
        <SummaryCard label="In Shop" value={vehicles.filter(v => v.status === "In Shop").length} color="#ffb300" />
        <SummaryCard label="Archived" value={vehicles.filter(v => v.archived).length} color="#6c757d" />
      </div>

      {!showForm ? (
        <div className="module-card">
          <h2 className="module-title">Vehicle List</h2>

          {/* Filter Row */}
          <div className="filter-row">
            <select
              value={filters.type}
              onChange={(e) =>
                setFilters({ ...filters, type: e.target.value })
              }
            >
              <option value="">All Types</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
              <option value="Sedan">Sedan</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="In Shop">In Shop</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={filters.archived}
              onChange={(e) =>
                setFilters({ ...filters, archived: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="false">Not Archived</option>
              <option value="true">Archived</option>
            </select>
          </div>

          {/* Table */}
          <table className="styled-table">
            <thead>
              <tr>
                <th>Vehicle Name</th>
                <th>Status</th>
                <th>Type</th>
                <th>Group</th>
                <th>Odometer</th>
                <th width="130px">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((v) => (
                <tr key={v.id}>
                  <td>{v.name}</td>
                  <td style={{ fontWeight: "600", color: statusColors[v.status] }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: statusColors[v.status],
                        marginRight: "6px",
                      }}
                    ></span>
                    {v.status}
                  </td>
                  <td>{v.type}</td>
                  <td>{v.group}</td>
                  <td>{v.meter}</td>
                  <td>
                    <button className="btn-edit" onClick={() => startEdit(v)}>
                      ✏ Edit
                    </button>
                    <button
                      className="btn-edit btn-delete"
                      onClick={() => deleteVehicle(v.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: "right", marginTop: "15px" }}>
            <button className="btn-primary" onClick={() => setShowForm(true)}>
              + Add Vehicle
            </button>
          </div>
        </div>
      ) : (
        <div className="module-card">
          <h2 className="module-title">{editData ? "Edit Vehicle" : "Add Vehicle"}</h2>
          <VehicleForm
            onSubmit={handleSaveVehicle}
            editData={editData}
            onClose={() => {
              setShowForm(false);
              setEditData(null);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Vehicles;
